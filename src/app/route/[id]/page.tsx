"use client";

import Link from "next/link";
import { useState } from "react";
import { SlArrowLeft, SlMenu } from "react-icons/sl";
import Graph from "@/components/Graph";

export default function Route() {
    const [sideBar, setSideBar] = useState(false);
    
        const handleClick = () => {
            setSideBar(!sideBar);
        }

    const lorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus.";

    return(
        <div>
            {sideBar ? 
                (<div className="min-h-screen w-full bg-[#7398B7]">
                    <div className="min-h-screen w-[450px] bg-[#446784] flex flex-col items-center gap-10">
                        <div className="flex w-[400px] justify-end py-10">
                            <button>
                                <SlArrowLeft onClick={handleClick} className=" text-[#D9D9D9] text-[35px] font-bold transition hover:scale-110"/>
                            </button>
                        </div> 
                        <Link href={"/instruction"}>
                            <button className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                                <h1 className="text-white font-bold text-[25px]">INSTRUÇÕES</h1>
                            </button>
                        </Link>
                        <Link href={"/route"}>
                            <button className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                                <h1 className="text-white font-bold text-[25px]">PERCURSOS</h1>
                            </button>
                        </Link>
                    </div>
                        
                </div>) 
                : 
                (<div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
                    <header className="h-[60px] w-full bg-[#446784] flex items-center">
                        <button onClick={handleClick} className="px-7 transition hover:scale-110">
                            <SlMenu className="text-[#D9D9D9] text-[35px]"/>
                        </button>
                        <div className="h-11 w-[1435px] bg-[#F6F7FA] flex rounded-xl items-center">
                            <img
                                src="/image.png"
                                alt="Conector"
                                className="pl-5 h-10"
                            />
                            <h1 className="font-bold">Conector do Carrinho</h1>
                        </div>
                    </header>
                    <div className="flex my-5 h-[625px] w-full gap-3">
                        <div className="ml-5 h-[625px] w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
                            <h1 className="mt-2.5 text-white font-bold text-center">DETALHES DA TRAJETÓRIA</h1>
                            <div className="mt-2.5 bg-[#434343] rounded-xl h-[570px] w-[880px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#434343] scrollbar-track-transparent">
                                <p className="text-white p-5">{lorem}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center h-[625px] w-[600px] mr-5">
                            <div className="flex flex-col h-[400px] w-[600px] bg-[#7398B7] rounded-xl justify items-center">
                                <h1 className="pt-2.5 text-center text-white font-bold">GRÁFICO DE DESEMPENHO</h1>
                                <div className="w-[550px] pt-5">
                                    <Graph/>
                                </div>
                            </div>
                            <div className="h-10"></div>
                            <button className="h-[100px] w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
                                <h1 className="text-white font-bold text-[25px]">BAIXAR RELATÓRIO</h1>
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}