"use client";

import { useState } from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import {ConnectionStatus, DisponibilityStatus} from "@/app/components/StatusSection";
import Button from "@/app/components/Button";


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
        setDisponibility(false);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setDisponibility(true);
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

    return(
        <div className="h-screen w-full bg-[#1E1E1E] flex flex-col overflow-hidden">
            <Header onClick={handleClick}/>
            <div className="flex flex-1 min-h-0">
                {sideBar ? (
                    <SideBar onClick={handleClick}/>
                ) : (
                    <div className="flex-1 flex flex-col lg:flex-row gap-3 lg:gap-6 p-3 lg:p-6 min-h-0 items-center justify-center">
                        <div className="flex flex-col gap-3 w-full sm:w-auto lg:self-start lg:mt-12">
                            <ConnectionStatus onClick={changeConection} evaluate={connection}/>
                            <DisponibilityStatus onClick={changeDisponiblity} evaluate={disponibility}/>
                            {!connection &&
                            (<div>
                                <Button onClick={connect} text={"CONECTAR"}/>
                            </div>)}
                            {connection && !disponibility && (
                            <div>
                                <Button onClick={stopRoute} text={"PARAR TRAJETO"}/>
                            </div>)}
                        </div>
                        <div className="w-full sm:w-[400px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-[#7398B7] rounded-lg flex flex-col justify-center items-center p-3 lg:p-4 gap-3 flex-shrink-0">
                            <textarea className="w-full flex-1 min-h-0 bg-[#434343] text-white p-3 lg:p-4 rounded-lg resize-none" />
                            {(connection && disponibility) ? 
                            (<button onClick={sendInstruction} className="h-9 w-[90px] bg-blue-600 rounded-lg text-white text-sm transition hover:scale-110 flex-shrink-0">Enviar</button>) : (<div className="h-9 w-[90px] flex-shrink-0"/>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}