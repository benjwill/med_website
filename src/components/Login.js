import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submittedLogin = () => {
        alert(`Username: ${username}, Password: ${password}`);
    }

    const submittedCreateAccount = () => {
        if(password !== confirmPassword){
            alert("Make sure passwords match")
        }
    }
    
    return (
        <>
            <div className="container-fluid text-center">
                <div className="row mt-3">
                    <div className="col border-end">
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="username">Username</label>
                            <input id="username" type="text" className="form-control" onChange={(event)=>setUsername(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-control" onChange={(event)=>setPassword(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3 text-center">
                            <button type="button" className="btn btn-primary" onClick={submittedLogin}>Submit</button>
                        </div>
                    </div>

                    <div className="col border-start">
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="username">Username</label>
                            <input id="username" type="text" className="form-control" onChange={(event)=>setUsername(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-control" onChange={(event)=>setPassword(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" type="password" className="form-control" onChange={(event)=>setConfirmPassword(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3 text-center">
                            <button type="button" className="btn btn-primary" onClick={submittedCreateAccount}>Create Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;