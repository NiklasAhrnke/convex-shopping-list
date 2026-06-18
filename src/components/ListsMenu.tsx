import { Bars3Icon } from "@heroicons/react/24/solid";
import {useState} from "react";
import {api} from "../../convex/_generated/api";
import {useQuery} from "convex/react";
import {useNavigate} from "react-router-dom";

function ListsMenu() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const lists = useQuery(api.lists.getLists);

    return (
        <div className={"relative mr-4"}>
            <button aria-label={"open list menu"} onClick={() => setOpen(!open)}>
                <Bars3Icon className={"size-6 hover:cursor-pointer active:scale-95"}></Bars3Icon>
            </button>

            {open && (
                <div className={"absolute right-0 bg-white border border-gray-200 rounded-md shadow-lg min-w-55"}>
                    {lists?.map((list) => (
                        <button
                            key={list._id}
                            onClick={() => {
                                navigate(`/${list._id}`);
                                setOpen(!open);
                            }}
                            className={"w-full border-b border-gray-100 text-left px-2 py-1 hover:cursor-pointer hover:bg-gray-50"}
                        >
                            {list.name}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ListsMenu;