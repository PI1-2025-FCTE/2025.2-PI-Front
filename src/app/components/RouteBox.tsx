import Link from "next/link";

type RouteBoxProps = {
    index: string;
}

export function RouteBox({index}: RouteBoxProps) {
    return(
        <Link href={`/route/${index}`}>
            <button className="h-[80px] w-full max-w-[400px] bg-[#7398B7] text-white font-bold flex justify-start items-center pl-6 sm:pl-10 rounded-xl transition hover:scale-[1.02] text-sm sm:text-base">
                PERCURSO {index}
            </button>
        </Link>
    );
}