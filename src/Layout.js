import { Outlet, Link } from "react-router-dom";
import Staff from "./multimedia/medical_staff.png"

const Layout = () => {
  return (
    <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Staff} alt="Bootstrap" width="80" height="60"/>
                </Link>
                <div>
                    <h1>Easy Data Sharing With Your Healthcare Professionals</h1>
                </div>
                <div className="d-flex">
                    <button className="btn btn-success" type="button">
                        <Link style={{textDecoration:"none", color:"white"}} to="/login">Login</Link>
                    </button>
                </div>
            </div>
        </nav>

        <Outlet />
    </>
  )
};

export default Layout;
