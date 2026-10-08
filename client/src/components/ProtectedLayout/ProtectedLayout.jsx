import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function ProtectedLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default ProtectedLayout;