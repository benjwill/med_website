import { Outlet, Link, redirect } from "react-router-dom";
import Staff from "./multimedia/medical_staff.png"
import { useState } from "react";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState("");


    const logoutPressed = () => {
        setIsLoggedIn(false);
        setUserID("");
        redirect("/");
    }
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={Staff} alt="Bootstrap" width="80" height="60"/>
                    </Link>
                    <div>
                        <h1>{isLoggedIn?("Your ID: " + userID):("Easy Data Sharing with Healthcare Professionals")}</h1>
                    </div>
                    <div className="d-flex">
                        {
                            isLoggedIn === false
                            ?(
                                <button className="btn btn-success" type="button">
                                    <Link style={{textDecoration:"none", color:"white"}} to="/login">Login / Create Account</Link>
                                </button>
                            )
                            :(
                                <button className="btn btn-danger" type="button" onClick={logoutPressed}>
                                    <Link style={{textDecoration:"none", color:"white"}} to="/">Logout</Link>
                                </button>
                            )
                        }
                    </div>
                </div>
            </nav>

            <Outlet context={[isLoggedIn, setIsLoggedIn, userID, setUserID]} />
        </>
    )
};

export default Layout;
