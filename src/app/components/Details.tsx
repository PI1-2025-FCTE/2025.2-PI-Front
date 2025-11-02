type DetailsProps = {
    text: string;
}

export default function Details({text}: DetailsProps) {
    return(
        <div className="mt-2.5 bg-[#434343] rounded-xl h-[195px] w-[280px] lg:h-[480px] lg:w-[350px] xl:w-[610px]  2xl:h-[570px] 2xl:w-[880px] overflow-y-auto">
            <p className="text-white p-5 text-justify">{text}</p>
        </div>
    );
}