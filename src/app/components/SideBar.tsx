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
        <div className="h-screen w-[280px] sm:w-[320px] lg:w-[360px] bg-[#446784] flex flex-col items-center px-4 shadow-lg pb-6">
            <div className="flex h-[10vh] min-h-[60px] max-h-[70px] w-full justify-end items-center flex-shrink-0">
                <button onClick={onClick} className="p-2">
                    <SlArrowLeft className="text-[#D9D9D9] text-[20px] sm:text-[25px] font-bold transition hover:scale-110"/>
                </button>
            </div>
            {instruction ? (    
            <div className="flex-1 min-h-0 w-full overflow-auto scrollbar scrollbar-thumb-[#7398B7] scrollbar-track-[#446784] py-2">
                {routes.map((value, index) => (
                    <div key={index} className="mb-2">
                        <RouteBox index={value}/>
                    </div>
                ))}
            </div>) : 
            (<div className="flex-1 min-h-0 w-full overflow-auto scrollbar scrollbar-thumb-[#7398B7] scrollbar-track-[#446784] py-2">
                {routes.map((value, index) => (
                    <div key={index} className="mb-2">
                        <RouteBox index={value}/>
                    </div>
                ))}
            </div>)}
        
            
        
            {instruction && (
            <div className="pt-4 flex-shrink-0">
                <Link href={"/"}>
                    <Button text="INSTRUÇÃO"/>
                </Link>
            </div>
            )}
        </div>
    );
}