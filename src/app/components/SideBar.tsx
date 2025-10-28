"use client";

import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import Button from "./Button";

type SideBarProps = {
    onClick: () => void,
    instruction?: boolean,
    routes?: boolean,
    route?: boolean;
}

export default function SideBar({onClick, instruction, routes, route}: SideBarProps) {
    return(
        <div className="min-h-screen w-full bg-[#7398B7]">
                            <div className="min-h-screen w-[450px] bg-[#446784] flex flex-col items-center gap-10">
                                <div className="flex w-[400] justify-end py-10">
                                    <button>
                                        <SlArrowLeft onClick={onClick} className=" text-[#D9D9D9] text-[35px] font-bold transition hover:scale-110"/>
                                    </button>
                                </div>
                                {instruction && (<Button onClick={onClick} text={"INSTRUÇÕES"}/>)}
                                {(routes || route) &&( 
                                <Link href={"/instruction"}>
                                    <Button text={"INSTRUÇÕES"}/>
                                </Link>)}
                                {routes && (<Button onClick={onClick} text={"PERCURSOS"}/>)}
                                {(instruction || route) &&( 
                                <Link href={"/route"}>
                                    <Button text={"PERCURSOS"}/>
                                </Link>)}
                            </div>
                                
                        </div>
    );
}