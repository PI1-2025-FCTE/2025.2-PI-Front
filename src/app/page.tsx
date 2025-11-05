"use client";

import { useState, useRef, useEffect } from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import {ConnectionStatus, DisponibilityStatus} from "@/app/components/StatusSection";
import {ConnectingModal} from "@/app/components/ConnectingModal";
import Button from "@/app/components/Button";

const DEFAULT_IP = "127.0.0.1";
const DEFAULT_PORTA = "8080";

export default function Home() {
    const [sideBar, setSideBar] = useState(false);

    const handleClick = () => {
        setSideBar(!sideBar);
    }

    const [connection, setConnection] = useState(false);

    const connect = () => {
        setConnection(true);
        setDisponibility(true);
    }

    const sendInstruction = async () => {
    if (!connection || !disponibility) return;

    setDisponibility(false);

    // Capturando o valor do textarea
    const comando = (document.querySelector('textarea') as HTMLTextAreaElement).value;

    try {
        const response = await fetch("http://localhost:8000/trajetos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comandosEnviados: comando })
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar: ${response.statusText}`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        setDisponibility(true);
    }
}

    const stopRoute = () => {
        setDisponibility(true);
    } 

    const changeConection = () => {
        if(connection) {
            setConnection(false);
            setDisponibility(false);
        } else {
            setConnection(true);
        };
    }

    const [disponibility, setDisponibility] = useState(false);
    
    const changeDisponiblity = () => {
        if(connection) {
            setDisponibility(!disponibility);
        }
    }
    const [ip, setIp] = useState(DEFAULT_IP);
    const [porta, setPorta] = useState(DEFAULT_PORTA);
    const [conectado, setConectado] = useState(false); // Prop 'evaluate'
    const [isConnecting, setIsConnecting] = useState(false); // Controla o modal
    
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        return () => {
            if (ws.current) {
                console.log("Componente desmontado, fechando WebSocket.");
                ws.current.close(1000, "Componente desmontado");
            }
        };
    }, []); 

    const conectar = () => {
        if (isConnecting || conectado) return;

        console.log(`Tentando conectar em: ws://${ip}:${porta}`);
        setIsConnecting(true); 

        try {
            const socket = new WebSocket(`ws://${ip}:${porta}`);
            ws.current = socket; 

            

          
            socket.onopen = () => {
                console.log("WebSocket Conectado!");
                setIsConnecting(false); 
                setConectado(true);  
            };

           
            socket.onclose = (event) => {
                console.log("WebSocket Fechado.", event.code, event.reason);
                setIsConnecting(false); 
                setConectado(false); 
                ws.current = null;  
            };

            
            socket.onerror = (error) => {
                console.error("Erro no WebSocket:", error);
            };

            
            socket.onmessage = (event) => {
                console.log("Mensagem recebida do servidor:", event.data);
            };

        } catch (error) {
           
            console.error("Erro ao criar WebSocket:", error);
            setIsConnecting(false);
        }
    };

    
    const desconectar = () => {
        if (ws.current) {
            console.log("Desconectando manualmente...");
            ws.current.close(1000, "Usuário desconectou");
        }
    };

    const handleToggleConexao = () => {
        if (conectado) {
            desconectar();
        } else {
            conectar();
        }
    };

    const handleCancelConnection = () => {
        console.log("Tentativa de conexão cancelada pelo usuário.");
        if (ws.current) {
            ws.current.close(1000, "Conexão cancelada pelo usuário");
        } else {
            setIsConnecting(false);
        }
    };
    return(
        <div>
            {sideBar ? 
            (<SideBar onClick={handleClick}/>) 
            : 
            (<div className="min-h-screen w-full bg-[#1E1E1E] ">
                <Header onClick={handleClick}/>
          <ConnectingModal 
                isOpen={isConnecting}
                onCancel={handleCancelConnection}
            />
                <div className="flex my-10 mx-10 h-full flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch lg:justify-normal ">
                    <div className="flex flex-col justify-center items-center mt-3 gap-3 lg:justify-normal lg:mt-0 lg:gap-10">
                            <ConnectionStatus 
              evaluate={conectado}
                isConnecting={isConnecting}
                onClickToggle={handleToggleConexao}
                ip={ip}
                porta={porta}
                onIpChange={setIp}
                onPortaChange={setPorta} 
              />
                            <DisponibilityStatus onClick={changeDisponiblity} evaluate={disponibility}/>
                        {!connection &&
                        (<div className="lg:mt-[50px] 2xl:mt-[220px]">
                            <Button onClick={connect} text={"CONECTAR"}/>
                        </div>)}
                        {connection && !disponibility && (
                        <div className="lg:mt-[50px] 2xl:mt-[220px]">
                            <Button onClick={stopRoute} text={"PARAR TRAJETO"}/>
                        </div>)}
                    </div>
                    <div className="
                        h-[300px] w-[300px] pb-3
                        lg:h-[440px] lg:w-[600px] lg:ml-14 lg:pb-0
                        xl:h-[440px] xl:w-[700px] 
                        2xl:h-[600px] 2xl:w-[1000px] 
                        bg-[#7398B7] rounded-xl flex flex-col justify-center items-center">
                        <textarea className="mt-5 
                        h-[280px] w-[280px]
                        lg:h-[300px] lg:w-[465px]

                        xl:h-[330px] xl:w-[680px] 
                        2xl:h-[460px] 2xl:w-[900px] p-5
                        bg-[#434343] text-white rounded-xl" />
                        <div className="h-5"/>
                        {(connection && disponibility) ? 
                        (<button onClick={sendInstruction} className="h-10 w-[100px] bg-blue-600 rounded-xl text-white transition hover:scale-110">Enviar</button>) : (<div className="h-10 w-[100px]"/>)}
                    </div>
                </div>
            </div>)}
        </div>
    );
}
