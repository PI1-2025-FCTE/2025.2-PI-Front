import Link from "next/link";

type RouteBoxProps = {
    index: string;
}

export function RouteBox({index}: RouteBoxProps) {
    return(
        <Link href={`/route/${index}`}>
            <button className="h-[70px] w-[800px] bg-[#446784] text-white font-bold flex justify-start items-center pl-10 rounded-xl transition hover:scale-[1.02]">
                PERCURSO {index}
            </button>
        </Link>
    );
}