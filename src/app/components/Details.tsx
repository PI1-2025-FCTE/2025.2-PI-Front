type DetailsProps = {
    text: string;
}

export default function Details({text}: DetailsProps) {
    return(
        <div className="flex-1 min-h-0 bg-[#434343] rounded-lg mx-3 mb-3 overflow-y-auto scrollbar scrollbar-thumb-[#7398B7] scrollbar-track-[#434343]">
            <p className="text-white p-3 sm:p-4 text-xs sm:text-sm leading-relaxed">{text}</p>
        </div>
    );
}