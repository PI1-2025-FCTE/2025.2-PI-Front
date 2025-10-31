import Link from "next/link";

type RouteBoxProps = {
    index: string;
}

export function RouteBox({index}: RouteBoxProps) {
    return(
        <Link href={`/route/${index}`}>
            <button className="h-[50px] sm:h-[55px] w-full bg-[#7398B7] text-white font-bold flex justify-start items-center pl-4 rounded-lg transition hover:scale-[1.02] hover:bg-[#8AA8C7] text-sm">
                Rota {index}
            </button>
        </Link>
    );
}