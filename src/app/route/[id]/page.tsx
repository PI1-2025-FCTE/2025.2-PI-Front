"use client";

import { useState } from "react";
import SideBar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
import Details from "@/app/components/Details";
import Graph from "@/app/components/Graph";
import Button from "@/app/components/Button";

export default function Route() {
    const [sideBar, setSideBar] = useState(false);
    
        const handleClick = () => {
            setSideBar(!sideBar);
        }

    const lorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi eligendi eum assumenda inventore odio eius fugiat temporibus minus? Sequi quo consectetur rem repellendus minima iste aliquam esse dicta nulla iure? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil odio nisi cum officia atque veniam explicabo vitae esse blanditiis consectetur. Natus earum aspernatur consequuntur inventore adipisci ut laboriosam nulla voluptatibus.";

    return(
        <div className="h-screen w-full bg-[#1E1E1E] flex flex-col overflow-hidden">
            <Header onClick={handleClick}/>
            <div className="flex flex-1 min-h-0">
                {sideBar ? (
                    <SideBar onClick={handleClick} instruction={true}/>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center min-h-0 pt-5 px-3">
                        <div className="flex flex-col md:flex-row gap-3 w-full max-w-[850px]">
                            <div className="w-full md:w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-[#7398B7] rounded-lg flex flex-col flex-shrink-0">
                                <h1 className="py-2 lg:py-3 text-white font-bold text-center text-xs sm:text-sm flex-shrink-0">DETALHES DA TRAJETÓRIA</h1>
                                <Details text={lorem}/>
                            </div>
                            <div className="w-full md:w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-[#7398B7] rounded-lg flex flex-col p-2 lg:p-3 flex-shrink-0">
                                <h1 className="text-center text-white font-bold text-xs sm:text-sm mb-1 lg:mb-2 flex-shrink-0">GRÁFICO DE DESEMPENHO</h1>
                                <div className="flex-1 min-h-0 flex items-center justify-center">
                                    <Graph/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex justify-center w-full flex-shrink-0">
                            <Button text="BAIXAR RELATÓRIO"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}