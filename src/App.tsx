import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layouts/Layout.tsx";
import ListDetails from "./pages/ListDetails.tsx";

function EmptyState() {
    return (
        <p className={"text-2xl font-[Indie_Flower]"}>Wähle eine Liste aus dem Menü oder erstelle eine neue.</p>
    );
}

function App() {

    return (
        <BrowserRouter basename="/convex-shopping-list">
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<EmptyState />} />
                    <Route path="/:listId" element={<ListDetails />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
