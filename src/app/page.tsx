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
            (<div className="min-h-screen w-full bg-[#1E1E1E]">
                <Header onClick={handleClick}/>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 my-6 lg:my-10 mx-4 lg:mx-10">
                    <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-auto">
                        <ConnectionStatus onClick={changeConection} evaluate={connection}/>
                        <DisponibilityStatus onClick={changeDisponiblity} evaluate={disponibility}/>
                        {!connection &&
                        (<div className="lg:mt-[220px]">
                            <Button onClick={connect} text={"CONECTAR"}/>
                        </div>)}
                        {connection && !disponibility && (
                        <div className="lg:mt-[220px]">
                            <Button onClick={stopRoute} text={"PARAR TRAJETO"}/>
                        </div>)}
                    </div>
                    <div className="w-full lg:flex-1 min-h-[400px] lg:h-[600px] bg-[#7398B7] rounded-xl flex flex-col justify-center items-center p-4 lg:p-6">
                        <textarea className="w-full max-w-full h-[300px] lg:h-[460px] bg-[#434343] text-white p-4 lg:p-5 rounded-xl resize-none" />
                        <div className="h-5"/>
                        {(connection && disponibility) ? 
                        (<button onClick={sendInstruction} className="h-10 w-[100px] bg-blue-600 rounded-xl text-white transition hover:scale-110">Enviar</button>) : (<div className="h-10 w-[100px]"/>)}
                    </div>
                </div>
            </div>)}
        </div>
    );
}