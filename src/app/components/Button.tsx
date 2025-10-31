type ButtonProps = {
    onClick?: () => void,
    text: string;
}

export default function Button({onClick, text}: ButtonProps ) {
    return(
        <button onClick={onClick} className="h-[100px] w-full max-w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
            <h1 className="text-white font-bold text-lg sm:text-[25px]">{text}</h1>
        </button>
    );
}