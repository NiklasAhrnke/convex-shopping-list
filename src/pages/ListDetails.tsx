import {useMutation, useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {PlusIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import {useParams} from "react-router-dom";
import type {Id} from "../../convex/_generated/dataModel";

function ListDetails() {

    const { listId } = useParams();

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");

    const articles = useQuery(api.articles.getArticles, listId ? {listId: listId as Id<"lists">} : "skip");
    const setArticle = useMutation(api.articles.setArticle);

    const setComplete = useMutation(api.articles.setComplete);
    const deleteArticle = useMutation(api.articles.deleteArticle);

    return (
        <>
            <div className={"w-full"}>
                <div className={"text-2xl font-[Indie_Flower]"}>
                    <ul className={"flex flex-col gap-4 list-none"}>
                        {articles?.map(({_id, quantity, unit, name, isCompleted}) => (
                            <li key={_id}
                                className={"hover:bg-black/5 rounded-lg flex w-full justify-between before:content-['•'] gap-2"}>
                                <div className={"flex items-center justify-between w-full"}>
                                <span
                                    className={`${isCompleted ? "line-through" : ""} hover:cursor-pointer`}
                                    onClick={async () => {
                                        await setComplete({id: _id, complete: !isCompleted});
                                    }}
                                >
                                    {quantity} {unit} {name}
                                </span>
                                    <button onClick={async () => await deleteArticle({id: _id})}
                                            aria-label={"delete this item"} className={"hover:cursor-pointer pr-4"}>
                                        <XMarkIcon className={"size-4"}></XMarkIcon>
                                    </button>
                                </div>
                            </li>)
                        )}
                    </ul>
                </div>
                <div className="w-[90%] md:w-225 mx-auto fixed bottom-0 left-0 right-0 flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-gray-500 overflow-hidden m-6 p-2">

                    <div className={"w-1/6 flex flex-col items-start justify-center"}>
                        <label htmlFor={"quantity-input"}
                               className={"text-[10px] text-gray-500 font-semibold"}>MENGE</label>
                        <input
                            id={"quantity-input"}
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={"w-full flex bg-transparent outline-none font-sans text-base"}/>
                    </div>

                    <div className="w-px h-10 bg-gray-200 mx-1" aria-hidden="true"/>

                    <div className={"w-1/4 flex flex-col items-start justify-center pl-2"}>
                        <label htmlFor={"unit-input"} className={"text-[10px] text-gray-500 font-semibold"}>EINHEIT</label>
                        <input
                            id={"unit-input"}
                            type="text"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className={"w-full flex bg-transparent outline-none font-sans text-base"}/>
                    </div>

                    <div className="w-px h-10 bg-gray-200 mx-1" aria-hidden="true"/>

                    <div className={"w-1/2 flex flex-col items-start justify-center pl-2"}>
                        <label htmlFor={"name-input"} className={"text-[10px] text-gray-500 font-semibold"}>ARTIKEL</label>
                        <input
                            id={"name-input"}
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full flex bg-transparent outline-none font-sans text-base"/>
                    </div>

                    <div className="w-px h-10 bg-gray-200 mx-1" aria-hidden="true"/>

                    <button aria-label="Hinzufügen"
                            className="px-4 h-full text-gray-600 hover:cursor-pointer"
                            onClick={async () => {
                                await setArticle({listId: listId as Id<"lists">, name: name, quantity: quantity, unit: unit});
                                setName("");
                                setQuantity("");
                                setUnit("");
                            }}
                    >
                        <PlusIcon className={"size-4"}/>
                    </button>

                </div>
            </div>
        </>
    )
}

export default ListDetails;