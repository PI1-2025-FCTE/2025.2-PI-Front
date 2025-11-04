
import Link from "next/link";

type RouteBoxProps = {
    index: number;
}

export function RouteBox({index}: RouteBoxProps) {
    return(
        <Link href={`/route/${index}`}>
            <button className="h-[80px] w-full md:w-[400px] bg-[#7398B7] text-white font-bold flex justify-start items-center pl-10 rounded-xl transition hover:scale-[1.02]">
                PERCURSO {index}
            </button>
        </Link>
    );
}
