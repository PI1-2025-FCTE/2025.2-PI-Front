type DownloadButtonProps = {
    text: string;
}

export default function DownloadButton({text}: DownloadButtonProps ) {
    return(
        <div className="h-[50px] w-[300px] lg:h-[100px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
            <h1 className="text-white font-bold lg:text-[25px]">{text}</h1>
        </div>
    );
}