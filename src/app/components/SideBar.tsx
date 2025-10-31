"use client";

import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import Button from "./Button";
import { RouteBox } from "./RouteBox";

type SideBarProps = {
    onClick: () => void,
    instruction?: boolean;
}

export default function SideBar({onClick, instruction}: SideBarProps) {
    
    const size = 10;
    const routes = Array(size);
    for(let i = 0; i < size; i++) {
        routes[i] = i+1;
    }
    
    return(
        <div className="min-h-screen w-[280px] sm:w-[320px] lg:w-[360px] bg-[#446784] flex flex-col items-center px-4 shadow-lg">
            <div className="flex h-[100px] w-full justify-end items-center">
                <button onClick={onClick}>
                    <SlArrowLeft className="text-[#D9D9D9] text-[25px] sm:text-[30px] font-bold transition hover:scale-110"/>
                </button>
            </div>
            {instruction ? (    
            <div className="mt-8 h-[355px] w-full overflow-auto scrollbar scrollbar-thumb-[#7398B7] scrollbar-track-[#446784]">
                {routes.map((value, index) => (
                    <div key={index} className="mb-2">
                        <RouteBox index={value}/>
                    </div>
                ))}
            </div>) : 
            (<div className="mt-6 h-[525px] w-full overflow-auto scrollbar scrollbar-thumb-[#7398B7] scrollbar-track-[#446784]">
                {routes.map((value, index) => (
                    <div key={index} className="mb-2">
                        <RouteBox index={value}/>
                    </div>
                ))}
            </div>)}
        
            
        
            {instruction && (
            <div className="mt-16">
                <Link href={"/"}>
                    <Button text="INSTRUÇÃO"/>
                </Link>
            </div>
            )}
        </div>
    );
}