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
                {sideBar && <SideBar onClick={handleClick} instruction={true}/>}
                <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
                    <div className="flex-1 min-h-0 bg-[#7398B7] rounded-lg flex flex-col">
                        <h1 className="py-3 text-white font-bold text-center text-sm sm:text-base flex-shrink-0">DETALHES DA TRAJETÓRIA</h1>
                        <Details text={lorem}/>
                    </div>
                    <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[400px] lg:max-w-[500px]">
                        <div className="flex-1 min-h-0 bg-[#7398B7] rounded-lg flex flex-col p-3">
                            <h1 className="text-center text-white font-bold text-sm sm:text-base mb-2 flex-shrink-0">GRÁFICO DE DESEMPENHO</h1>
                            <div className="flex-1 min-h-0 flex items-center justify-center">
                                <Graph/>
                            </div>
                        </div>
                        <Button text="BAIXAR RELATÓRIO"/>
                    </div>
                </div>
            </div>
        </div>
    );
}