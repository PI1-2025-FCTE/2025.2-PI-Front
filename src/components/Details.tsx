type DetailsProps = {
    text: string;
}

export default function Details({text}: DetailsProps) {
    return(
        <div className="mt-2.5 bg-[#434343] rounded-xl h-[570px] w-[880px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#434343] scrollbar-track-transparent">
            <p className="text-white p-5">{text}</p>
        </div>
    );
}