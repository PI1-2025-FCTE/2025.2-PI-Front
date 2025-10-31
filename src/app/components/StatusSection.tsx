type StatusSectionProps = {
    onClick: () => void,
    evaluate: boolean;
}

export function ConnectionStatus({onClick, evaluate}: StatusSectionProps) {
    return(
        <div onClick={onClick}  className="h-[70px] w-full max-w-[280px] bg-[#7398B7] rounded-lg flex items-center justify-between px-4 cursor-pointer">
            <h1 className="text-white font-bold text-base sm:text-lg">CONEXÃO</h1>
            {evaluate ? 
            (<div className="h-8 w-16 bg-green-500 rounded-full flex items-center pr-0.5 justify-end flex-shrink-0">
                <div className="h-6 w-10 bg-white rounded-full"/>
            </div>) : 
            (<div className="h-8 w-16 bg-red-600 rounded-full flex items-center pl-0.5 flex-shrink-0">
                <div className="h-6 w-10 bg-white rounded-full"/>
            </div>)}
        </div>
    );
}

export function DisponibilityStatus({onClick, evaluate}: StatusSectionProps) {
    return(
        <div onClick={onClick}  className="h-[70px] w-full max-w-[280px] bg-[#7398B7] rounded-lg flex items-center justify-between px-4 cursor-pointer">
            <h1 className="text-white font-bold text-base sm:text-lg">DISPONIBILIDADE</h1>
            {evaluate ? 
            (<div className="h-8 w-16 bg-green-500 rounded-full flex items-center pr-0.5 justify-end flex-shrink-0">
                <div className="h-6 w-10 bg-white rounded-full"/>
            </div>) : 
            (<div className="h-8 w-16 bg-red-600 rounded-full flex items-center pl-0.5 flex-shrink-0">
                <div className="h-6 w-10 bg-white rounded-full"/>
            </div>)}
        </div>
    );
}