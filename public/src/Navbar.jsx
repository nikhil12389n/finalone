import { useEffect } from "react";
import "./navbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useUser } from "./ContextProvider";

export default function Navbar() {
    const [cookies, setCookies, removeCookies] = useCookies([]);
    const navigate = useNavigate();

    const logOut = async () => {
        removeCookies("jwt");
        localStorage.removeItem("refreshed");
        navigate('/login');
    };

    useEffect(() => {}, []);

    return (
        <div className="navbar-cont">
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient">
                <div className="container-fluid">
                    <p className="navbar-brand">
                        {useUser()}
                    </p>
                    
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <button className="btn btn-primary" onClick={logOut}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
