import './App.css'
import {useMutation, useQuery} from "convex/react";
import {api} from "../convex/_generated/api";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {PlusIcon} from "@heroicons/react/16/solid";
import {useState} from "react";

function App() {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const articles = useQuery(api.articles.getArticles);
  const setArticle = useMutation(api.articles.setArticle);

  const setComplete = useMutation(api.articles.setComplete);
  const deleteArticle = useMutation(api.articles.deleteArticle);

    return (
        <>
          <div className={"p-12 text-2xl font-[Indie_Flower]"}>
            <ul className={"flex flex-col gap-4 list-disc"}>
              {articles?.map(({_id, quantity, unit, name, isCompleted}) => (
                  <li key={_id}>
                    <div className={"flex items-center justify-between"}>
                      <span
                          className={isCompleted ? "line-through" : ""}
                          onClick={async () => {
                            await setComplete({id: _id, complete: !isCompleted})
                          }}
                      >
                        {quantity} {unit} {name}
                      </span>
                      <button onClick={async () => await deleteArticle({id: _id})} aria-label={"delete this item"}>
                        <XMarkIcon className={"size-4"}></XMarkIcon></button>
                    </div>
                  </li>)
              )}
            </ul>
          </div>

          <div className="fixed bottom-0 left-0 right-0 flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-gray-500 overflow-hidden m-6">

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={"w-1/6 flex bg-transparent outline-none py-2 pl-4 font-sans text-base"}
            />

            <div className="w-px h-5 bg-gray-200 mx-1" aria-hidden="true"/>

            <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className={"w-1/4 flex bg-transparent outline-none py-2 font-sans text-base"}
            />

            <div className="w-px h-5 bg-gray-200 mx-1" aria-hidden="true"/>

            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-1/2 flex bg-transparent outline-none py-2 font-sans text-base placeholder:text-gray-400"
            />

            <div className="w-px h-5 bg-gray-200 mx-1" aria-hidden="true"/>

            <button aria-label="Hinzufügen"
                    className="px-4 h-full text-gray-600"
                    onClick={async () => {await setArticle({name: name, quantity: quantity, unit: unit}); setName(""); setQuantity(""); setUnit("")}}
            >
              <PlusIcon className={"size-4"}/>
            </button>

          </div>
        </>
    )
}

export default App
