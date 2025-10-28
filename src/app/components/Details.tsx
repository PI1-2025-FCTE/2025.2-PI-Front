type DetailsProps = {
    text: string;
}

export default function Details({text}: DetailsProps) {
    return(
        <div className="mt-2.5 bg-[#434343] rounded-xl h-[570px] w-[880px] overflow-y-auto">
            <p className="text-white p-5">{text}</p>
        </div>
    );
}