"use client";


import { SlArrowLeft, SlMenu } from "react-icons/sl";
import { useState } from "react";
import Link from "next/link";
import { RouteBox } from "@/components/RouteBox";

export default function Routes() {
        const [sideBar, setSideBar] = useState(false);
    
        const handleClick = () => {
            setSideBar(!sideBar);
        }
    
        const size = 10  ;
        const routes = Array(size);
        for(let i = 0; i < size; i++) {
            routes[i] = i+1;
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
                                <Link href={"/instruction"}>
                                    <button className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                                        <h1 className="text-white font-bold text-[25px]">INSTRUÇÕES</h1>
                                    </button>
                                </Link>
                                <button onClick={handleClick} className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                                    <h1 className="text-white font-bold text-[25px]">PERCURSOS</h1>
                                </button>
                            </div>
                                
                        </div>) 
                        : 
                        (<div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
                            <header className="h-[60px] w-full bg-[#446784] flex items-center">
                                <button onClick={handleClick} className="px-7 transition hover:scale-110">
                                    <SlMenu className="text-[#D9D9D9] text-[35px]"/>
                                </button>
                                <div className="h-11 w-[1435px] bg-[#F6F7FA] flex rounded-xl items-center">
                                    <img
                                        src="/image.png"
                                        alt="Conector"
                                        className="pl-5 h-10"
                                    />
                                    <h1 className="font-bold">Conector do Carrinho</h1>
                                </div>
                            </header>
                            <div className="h-5"/>
                            <div className="h-[630px] w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
                                <h1 className="text-white text-center pt-2.5 font-bold">PERCURSOS</h1>
                                <div className=" h-[580px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#7398B7] scrollbar-track-transparent">
                                    {routes.map((value, index) => (
                                        <div key={index} className="py-1.5 px-3">
                                            <RouteBox  index={value}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>)}
        </div>
    );
}