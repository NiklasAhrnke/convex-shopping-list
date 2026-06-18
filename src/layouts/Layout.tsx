import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <Header />
            <main className="flex flex-col min-h-dvh items-start max-w-4xl mx-auto p-4">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;