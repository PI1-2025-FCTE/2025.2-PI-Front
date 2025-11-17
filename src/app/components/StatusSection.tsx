import React from 'react';

type ConnectionStatusProps = {
    onClickToggle: () => void,
    evaluate: boolean; 
    ip: string;
    porta: string; 
    onIpChange: (value: string) => void;
    onPortaChange: (value: string) => void;
    isConnecting: boolean;
}

type DisponibilityStatusProps = {
    onClick: () => void;
    evaluate: boolean;
}

export function ConnectionStatus({
    onClickToggle, 
    evaluate, 
    ip, 
    porta, 
    onIpChange, 
    onPortaChange,
    isConnecting
}: ConnectionStatusProps) {

    const isConnected = evaluate;
    const isDisabled = evaluate || isConnecting;

    return(
        <div className={`h-auto w-[300px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-between p-5 ${isConnecting ? 'opacity-70' : ''}`}>
            
            <div className="flex flex-col text-white gap-2 w-full pr-4">
                <h1 className="font-bold lg:text-[25px]">CONEXÃO</h1>
                
                <div className="flex flex-col gap-1.5">
                    <div>
                        <label className="text-xs font-bold opacity-80 block">IP</label>
                        <input 
                            type="text"
                            value={ip}
                            onChange={(e) => onIpChange(e.target.value)}
                            disabled={isDisabled}
                            className="w-full p-1.5 rounded text-black text-sm disabled:bg-gray-200 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold opacity-80 block">PORTA</label>
                        <input 
                            type="text"
                            value={porta}
                            onChange={(e) => onPortaChange(e.target.value)}
                            disabled={isDisabled}
                            className="w-full p-1.5 rounded text-black text-sm disabled:bg-gray-200 disabled:opacity-70"
                        />
                    </div>
                </div>
            </div>

            <div className="shrink-0">
                <div 
                    onClick={() => !isConnecting && onClickToggle()}
                    className={`h-5 w-10 lg:h-10 lg:w-20 rounded-full flex items-center ${isConnecting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${evaluate ? 'bg-green-500 pr-1 justify-end' : 'bg-red-600 pl-1'}`}
                >
                    <div className="h-3.5 w-5 lg:h-8 lg:w-12 bg-white rounded-full"/>
                </div>
            </div>
        </div>
    );
}    

export function DisponibilityStatus({onClick, evaluate}: DisponibilityStatusProps) {
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