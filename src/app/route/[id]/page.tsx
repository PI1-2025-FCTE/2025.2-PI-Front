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
        <div>
            {sideBar ? 
                (<SideBar onClick={handleClick} instruction={true}/>) 
                : 
                (<div className="min-h-screen w-full bg-[#1E1E1E] flex flex-col items-center">
                    <Header onClick={handleClick}/>
                    <div className="flex my-5 h-[625px] w-full gap-3">
                        <div className="ml-5 h-[625px] w-[900px] bg-[#7398B7] rounded-xl flex flex-col items-center">
                            <h1 className="mt-2.5 text-white font-bold text-center">DETALHES DA TRAJETÓRIA</h1>
                            <Details text={lorem}/>
                        </div>
                        <div className="flex flex-col items-center h-[625px] w-[600px] mr-5">
                            <div className="flex flex-col h-[400px] w-[600px] bg-[#7398B7] rounded-xl justify items-center">
                                <h1 className="pt-2.5 text-center text-white font-bold">GRÁFICO DE DESEMPENHO</h1>
                                <div className="w-[550px] pt-5">
                                    <Graph/>
                                </div>
                            </div>
                            <div className="h-10"></div>
                            <Button text="BAIXAR RELATÓRIO"/>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}