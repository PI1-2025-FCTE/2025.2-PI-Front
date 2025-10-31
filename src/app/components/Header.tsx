"use client";

import { SlMenu } from "react-icons/sl";

type HeaderProps = {
    onClick: () => void;
}

export default function Header({onClick}: HeaderProps) {
    return(
        <header className="h-[60px] w-full bg-[#446784] flex items-center px-2 sm:px-4">
            <button onClick={onClick} className="px-2 sm:px-7 transition hover:scale-110 flex-shrink-0">
                <SlMenu className="text-[#D9D9D9] text-[25px] sm:text-[35px]"/>
            </button>
            <div className="h-11 flex-1 max-w-full bg-[#F6F7FA] flex rounded-xl items-center ml-2 sm:ml-0">
                <img
                    src="/image.png"
                    alt="Conector"
                    className="pl-2 sm:pl-5 h-8 sm:h-10"
                />
                <h1 className="font-bold text-sm sm:text-base truncate">Conector do Carrinho</h1>
            </div>
        </header>
    );
}