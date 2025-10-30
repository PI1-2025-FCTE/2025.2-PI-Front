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
                <div className="flex my-10 mx-10 h-[600px]">
                    <div className="flex flex-col gap-10">
                        <ConnectionStatus onClick={changeConection} evaluate={connection}/>
                        <DisponibilityStatus onClick={changeDisponiblity} evaluate={disponibility}/>
                        {!connection &&
                        (<div className="mt-[220px]">
                            <Button onClick={connect} text={"CONECTAR"}/>
                        </div>)}
                        {connection && !disponibility && (
                        <div className="mt-[220px]">
                            <Button onClick={stopRoute} text={"PARAR TRAJETO"}/>
                        </div>)}
                    </div>
                    <div className="ml-14 h-[600px] w-[1000px] bg-[#7398B7] rounded-xl flex flex-col justify-center items-center">
                        <textarea className="mt-5 h-[460px] w-[900px] bg-[#434343] text-white p-5 rounded-xl" />
                        <div className="h-5"/>
                        {(connection && disponibility) ? 
                        (<button onClick={sendInstruction} className="h-10 w-[100px] bg-blue-600 rounded-xl text-white transition hover:scale-110">Enviar</button>) : (<div className="h-10 w-[100px]"/>)}
                    </div>
                </div>
            </div>)}
        </div>
    );
}