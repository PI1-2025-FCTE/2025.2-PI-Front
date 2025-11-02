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
        <div>
            {sideBar ? 
            (<SideBar onClick={handleClick}/>) 
            : 
            (<div className="min-h-screen w-full bg-[#1E1E1E] ">
                <Header onClick={handleClick}/>
                <div className="flex my-10 mx-10 h-full flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch lg:justify-normal ">
                    <div className="flex flex-col justify-center items-center mt-3 gap-3 lg:justify-normal lg:mt-0 lg:gap-10">
                            <ConnectionStatus onClick={changeConection} evaluate={connection}/>
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
