"use client";

import { useState } from "react";
import { SlArrowLeft, SlMenu } from "react-icons/sl";
import styles from "../page.module.css";
import Link from "next/link";

export default function Home() {
    const [sideBar, setSideBar] = useState(false);

    const handleClick = () => {
        setSideBar(!sideBar);
    }

    const [conection, setConection] = useState(false);

    const changeConection = () => {
        setConection(!conection);
    }

    const [disponibility, setDisponibility] = useState(false);
    
    const changeDisponiblity = () => {
        setDisponibility(!disponibility);
    }

    return(
        <div>
            {sideBar ? 
            (<div className="min-h-screen w-full bg-[#7398B7]">
                <div className="min-h-screen w-[450px] bg-[#446784] flex flex-col items-center gap-10">
                    <div className="flex w-[400] justify-end py-10">
                        <button>
                            <SlArrowLeft onClick={handleClick} className=" text-[#D9D9D9] text-[35px] font-bold transition hover:scale-110"/>
                        </button>
                    </div> 
                        <button onClick={handleClick} className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                            <h1 className="text-white font-bold text-[25px]">INSTRUÇÕES</h1>
                        </button>
                    <button className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                        <h1 className="text-white font-bold text-[25px]">PERCURSOS</h1>
                    </button>
                </div>
                    
            </div>) 
            : 
            (<div className="min-h-screen w-full bg-[#1E1E1E]">
                <header className="h-[60px] w-full bg-[#446784] flex items-center">
                    <button onClick={handleClick} className="px-7 transition hover:scale-110">
                        <SlMenu className="text-[#D9D9D9] text-[35px]"/>
                    </button>
                    <div className="h-11 w-[1435px] bg-[#F6F7FA] flex rounded-xl items-center">
                        <img
                            src="/image.png"
                            alt="Conector"
                            className="pl-5 h-10" // você pode manter a mesma classe
                        />
                        <h1 className="font-bold">Conector do Carrinho</h1>
                    </div>
                </header>
                <div className="flex my-10 mx-10 h-[600px]">
                    <div className="flex flex-col gap-10">
                        <div onClick={changeConection} className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center gap-40">
                            <h1 className="pl-5 text-white font-bold text-[25px]">CONEXÃO</h1>
                            {conection ? 
                            (<div className=" h-10 w-20 bg-green-500 rounded-full flex items-center pr-1 justify-end">
                                <div className=" h-8 w-12 bg-white rounded-full"/>
                            </div>) : 
                            (<div className=" h-10 w-20 bg-red-600 rounded-full flex items-center pl-1">
                                <div className=" h-8 w-12 bg-white rounded-full"/>
                            </div>)}
                        </div>
                        <div onClick={changeDisponiblity} className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center gap-16">
                            <h1 className="pl-5 text-white font-bold text-[25px]">DISPONIBILIDADE</h1>
                            {disponibility ? 
                            (<div className=" h-10 w-20 bg-green-500 rounded-full flex items-center pr-1 justify-end">
                                <div className=" h-8 w-12 bg-white rounded-full"/>
                            </div>) : 
                            (<div className=" h-10 w-20 bg-red-600 rounded-full flex items-center pl-1">
                                <div className=" h-8 w-12 bg-white rounded-full"/>
                            </div>)}
                        </div>
                    </div>
                    <div className="ml-14 h-[600px] w-[1000px] bg-[#7398B7] rounded-xl flex flex-col justify-center items-center">
                        <textarea className="mt-5 h-[460px] w-[900px] bg-[#434343] text-white p-5 rounded-xl" />
                        <div className="h-5"/>
                        <button className="h-10 w-[100px] bg-blue-600 rounded-xl text-white transition hover:scale-110">Enviar</button>
                    </div>
                </div>
            </div>)}
        </div>
    );
}