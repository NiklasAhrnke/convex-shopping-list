import ListsMenu from "../components/ListsMenu.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import type {Id} from "../../convex/_generated/dataModel";

function Header() {

    const { listId } = useParams();
    const list = useQuery(api.lists.getById, listId ? {id: listId as Id<"lists">} : "skip");

    return (
        <header className={"w-full h-20 border-b"}>
            <div className="max-w-4xl h-full flex items-center justify-between mx-auto p-4">
                <h1 className={"text-3xl font-semibold font-[Indie_Flower]"}>{list?.name ?? "Convex Shopping List"}</h1>
                <ListsMenu></ListsMenu>
            </div>
        </header>
    );
}

export default Header;