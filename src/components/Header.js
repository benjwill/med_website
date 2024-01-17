import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="containter-fluid"> 
                <div className="row">
                    <div className="title text-center col-11">
                        <h1>Easy Data Sharing with your Healthcare Professionals</h1>
                    </div>

                    <div className="col-1 pt-2">
                        <Link to="/login"><span className="badge bg-success">Login</span></Link>
                    </div>                
                </div>               

            </div>
        </>
    )
}

export default Header;