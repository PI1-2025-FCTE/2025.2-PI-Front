type StatusSectionProps = {
    onClick: () => void,
    evaluate: boolean;
}

export function ConnectionStatus({onClick, evaluate}: StatusSectionProps) {
    return(
        <div onClick={onClick}  className="h-[60px] w-[300px] lg:h-[100px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center gap-36 lg:gap-40">
            <h1 className="pl-5 text-white font-bold lg:text-[25px]">CONEXÃO</h1>
            {evaluate ? 
            (<div className=" h-5 w-10 lg:h-10 lg:w-20 bg-green-500 rounded-full flex items-center pr-1 justify-end">
                <div className="h-3.5 w-5 lg:h-8 lg:w-12 bg-white rounded-full"/>
            </div>) : 
            (<div className="h-5 w-10 lg:h-10 lg:w-20 bg-red-600 rounded-full flex items-center pl-1">
                <div className="h-3.5 w-5 lg:h-8 lg:w-12 bg-white rounded-full"/>
            </div>)}
        </div>
    );
}

export function DisponibilityStatus({onClick, evaluate}: StatusSectionProps) {
    return(
        <div onClick={onClick}  className="h-[60px] w-[300px] lg:h-[100px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center gap-[86px] lg:gap-16">
            <h1 className="pl-5 text-white font-bold lg:text-[25px]">DISPONIBILIDADE</h1>
            {evaluate ? 
            (<div className=" h-5 w-10 lg:h-10 lg:w-20 bg-green-500 rounded-full flex items-center pr-1 justify-end">
                <div className="h-3.5 w-5 lg:h-8 lg:w-12 bg-white rounded-full"/>
            </div>) : 
            (<div className="h-5 w-10 lg:h-10 lg:w-20 bg-red-600 rounded-full flex items-center pl-1">
                <div className="h-3.5 w-5 lg:h-8 lg:w-12 bg-white rounded-full"/>
            </div>)}
        </div>
    );
}