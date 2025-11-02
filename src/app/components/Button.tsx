type ButtonProps = {
    onClick?: () => void,
    text: string;
}

export default function Button({onClick, text}: ButtonProps ) {
    return(
        <button onClick={onClick} className="h-[60px] w-[140px] lg:h-[100px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
            <h1 className="text-white font-bold lg:text-[25px]">{text}</h1>
        </button>
    );
}