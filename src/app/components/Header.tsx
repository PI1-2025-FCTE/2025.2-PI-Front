"use client";

import { SlMenu } from "react-icons/sl";

type HeaderProps = {
    onClick: () => void;
}

export default function Header({onClick}: HeaderProps) {
    return(
        <header className="h-[10vh] min-h-[60px] max-h-[70px] w-full bg-[#446784] flex items-center px-2 sm:px-4 flex-shrink-0">
            <button onClick={onClick} className="px-2 sm:px-7 transition hover:scale-110 flex-shrink-0">
                <SlMenu className="text-[#D9D9D9] text-[20px] sm:text-[25px]"/>
            </button>
            <div className="h-10 flex-1 max-w-full bg-[#F6F7FA] flex rounded-lg items-center ml-2 sm:ml-0">
                <img
                    src="/image.png"
                    alt="Conector"
                    className="pl-2 sm:pl-4 h-7 sm:h-9"
                />
                <h1 className="font-bold text-xs sm:text-sm truncate">Conector do Carrinho</h1>
            </div>
        </header>
    );
}