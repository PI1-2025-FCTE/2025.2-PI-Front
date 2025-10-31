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
        <div className="min-h-screen w-full bg-[#7398B7]">
            <div className="min-h-screen w-full max-w-[450px] bg-[#446784] flex flex-col items-center px-4">
                <div className="flex h-[100px] w-full max-w-[400px] justify-end">
                    <button>
                        <SlArrowLeft onClick={onClick} className="text-[#D9D9D9] text-[25px] sm:text-[35px] font-bold transition hover:scale-110"/>
                    </button>
                </div>
                {instruction ? (    
                <div className="mt-16 h-[355px] w-full max-w-[440px] overflow-auto bg-[#446784] rounded-xl">
                    {routes.map((value, index) => (
                        <div key={index} className="pl-5 py-1">
                            <RouteBox index={value}/>
                        </div>
                    ))}
                </div>) : 
                (<div className="mt-10 h-[525px] w-full max-w-[440px] overflow-auto bg-[#446784] rounded-xl">
                    {routes.map((value, index) => (
                        <div key={index} className="pl-5 py-1">
                            <RouteBox index={value}/>
                        </div>
                    ))}
                </div>)}
            
                
            
                {instruction && (
                <div className="mt-16">
                    <Link href={"/"} className="">
                        <Button text="INSTRUÇÃO"/>
                    </Link>
                </div>
                )}
            </div>
        </div>
    );
}