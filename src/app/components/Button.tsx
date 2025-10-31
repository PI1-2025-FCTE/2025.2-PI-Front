type ButtonProps = {
    onClick?: () => void,
    text: string;
}

export default function Button({onClick, text}: ButtonProps ) {
    return(
        <button onClick={onClick} className="h-[70px] w-full max-w-[280px] bg-[#7398B7] rounded-lg flex items-center justify-center transition hover:scale-[1.02]">
            <h1 className="text-white font-bold text-base sm:text-lg">{text}</h1>
        </button>
    );
}