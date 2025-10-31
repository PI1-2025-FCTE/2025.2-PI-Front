type ButtonProps = {
    onClick?: () => void,
    text: string;
}

export default function Button({onClick, text}: ButtonProps ) {
    return(
        <button onClick={onClick} className="h-[8vh] min-h-[60px] max-h-[70px] w-full max-w-[280px] bg-[#7398B7] rounded-lg flex items-center justify-center transition hover:scale-[1.02] flex-shrink-0">
            <h1 className="text-white font-bold text-sm sm:text-base">{text}</h1>
        </button>
    );
}