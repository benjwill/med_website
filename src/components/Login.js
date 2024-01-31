import { useState } from "react";
import { redirect } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const submittedLogin = () => {
        fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                isnew: false
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json)
            .then((data)=> {
                redirect("/");
            })
    }

    const submittedCreateAccount = () => {
        if(newPassword.length < 10) {
            alert("password must be at least 10 characters")
            return
        }
        if (newPassword === confirmNewPassword){
            fetch("http://localhost:8080/login", {
                method: "POST",
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword,
                    isnew: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }) 
                .then((response)=> response.json)
                .then((data)=>{
                    console.log(data.message)
                })            
        }
        else {
            alert("Passwords do not match")
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
                            <label className="input-group-text" htmlFor="new-username">Username</label>
                            <input id="new-username" type="text" className="form-control" onChange={(event)=>setNewUsername(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="new-password">Password</label>
                            <input id="new-password" type="password" className="form-control" onChange={(event)=>setNewPassword(event.target.value)}/>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text" htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" type="password" className="form-control" onChange={(event)=>setConfirmNewPassword(event.target.value)}/>
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