"use client";

import { SlMenu } from "react-icons/sl";

type HeaderProps = {
    onClick: () => void;
}

export default function Header({onClick}: HeaderProps) {
    return(
        <header className="h-[60px] w-full bg-[#446784] flex items-center">
            <button onClick={onClick} className="px-7 transition hover:scale-110">
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
    );
}