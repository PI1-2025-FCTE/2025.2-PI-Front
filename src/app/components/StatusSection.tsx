type StatusSectionProps = {
    onClick: () => void,
    evaluate: boolean;
}

export function ConnectionStatus({onClick, evaluate}: StatusSectionProps) {
    return(
        <div onClick={onClick}  className="h-[8vh] min-h-[60px] max-h-[70px] w-full max-w-[280px] bg-[#7398B7] rounded-lg flex items-center justify-between px-4 cursor-pointer flex-shrink-0">
            <h1 className="text-white font-bold text-sm sm:text-base">CONEXÃO</h1>
            {evaluate ? 
            (<div className="h-7 w-14 bg-green-500 rounded-full flex items-center pr-0.5 justify-end flex-shrink-0">
                <div className="h-5 w-9 bg-white rounded-full"/>
            </div>) : 
            (<div className="h-7 w-14 bg-red-600 rounded-full flex items-center pl-0.5 flex-shrink-0">
                <div className="h-5 w-9 bg-white rounded-full"/>
            </div>)}
        </div>
    );
}

export function DisponibilityStatus({onClick, evaluate}: StatusSectionProps) {
    return(
        <div onClick={onClick}  className="h-[8vh] min-h-[60px] max-h-[70px] w-full max-w-[280px] bg-[#7398B7] rounded-lg flex items-center justify-between px-4 cursor-pointer flex-shrink-0">
            <h1 className="text-white font-bold text-sm sm:text-base">DISPONIBILIDADE</h1>
            {evaluate ? 
            (<div className="h-7 w-14 bg-green-500 rounded-full flex items-center pr-0.5 justify-end flex-shrink-0">
                <div className="h-5 w-9 bg-white rounded-full"/>
            </div>) : 
            (<div className="h-7 w-14 bg-red-600 rounded-full flex items-center pl-0.5 flex-shrink-0">
                <div className="h-5 w-9 bg-white rounded-full"/>
            </div>)}
        </div>
    );
}