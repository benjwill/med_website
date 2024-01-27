import { useState } from "react";

function Home() {
    const [text, setText] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [file, setFile] = useState("");

    const [sentData, setSentData] = useState(`${Date.now()}: This is the data`);

    const isLoggedIn = false;
    const userID = 12345;

    const checkInputs = () => {
        if((file !== "" || text !== "") && selectedID !== ""){
            submitPressed();
        }
        else{
            alert("Check to make sure the data field and the ID of the healthcare professional are both filled out.")
        }
    }
    
    const submitPressed = () => {
        fetch("http://localhost:8080/patientData", 
        {
            method: "POST",
            body: JSON.stringify({
                timestamp: Date.now(),
                selectedID: selectedID,
                data: text,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        setText("");
        setSelectedID("");
        setFile("")
    }
    const refreshPressed = () => {
        fetch("http://localhost:8080/doctorData", 
        {
            method: "POST",
            body: JSON.stringify({
                ID: userID,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response)=> response.json())
            .then((data) => setSentData((`${data.Timestamp}: ${data.Data}`)))
        
        setText("");
        setSelectedID("");
        setFile("")
    }

    if(!isLoggedIn){
        return (
            <>
                <div className="Home">            
                    <div className="container mx-auto text-center">
                        <form onSubmit={submitPressed}>
                            <div className="input-group mb-3 pt-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Type ID of Healthcare Professional:</span>
                                <input value={selectedID} type="text" className="form-control" onChange={(event)=>setSelectedID(event.target.value)}/>
                            </div>
                            <div className="data-area">
                                <textarea placeholder="Type or paste information here if applicable" className="form-control mb-5 mt-5" value={text} style={{borderColor: "black", height:"50vh", resize:"none"}} id="text" onChange={(event)=>setText(event.target.value)}></textarea>   
                            </div>
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="inputFile">Upload file here if applicable</label>
                                <input onChange={(event)=>setFile(event.target.value)} value={file} type="file" className="form-control" id="inputFile"/>
                            </div>

                            <div className="submit-btn">
                                <button className="btn btn-primary" type="button" onClick={checkInputs}>Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
    else if (isLoggedIn){
        return(
            <>
                <div className="containter-fluid text-center p-3">
                    <h1 className="fs-1 mt-3">Your ID: {userID}</h1>
                    <div className="data-area">
                        <textarea readOnly placeholder="Data will appear here when shared" className="form-control mb-5 mt-5" value={sentData} style={{borderColor: "black", height:"50vh", resize:"none"}} id="sent-data"></textarea>   
                    </div>
                    <div className="submit-btn">
                        <button className="btn btn-primary" type="button" onClick={refreshPressed}>Refresh</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;