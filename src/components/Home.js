import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
    const [text, setText] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [isLoggedIn, setIsLoggedIn, userID, setUserID] = useOutletContext();
    const [sentData, setSentData] = useState("");

    const checkInputs = () => {
        if((text !== "") && selectedID !== ""){
            submitPressed();
        }
        else{
            alert("Check to make sure the data field and the ID of the healthcare professional are both filled out.")
        }
    }
    
    const submitPressed = () => {
        fetch(`${process.env.BACKEND_LINK}/patientData`, 
        {
            method: "POST",
            mode:"cors",
            body: JSON.stringify({
                selectedID: parseInt(selectedID),
                data: text,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        setText("");
        setSelectedID("");
    }
    const refreshPressed = () => {
        fetch(`${process.env.BACKEND_LINK}/doctorData`, 
        {
            method: "POST",
            body: JSON.stringify({
                id: parseInt(userID),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response)=> response.json())
            .then((data)=> {
                if(data === null){
                    setSentData("")
                    return
                }
                let dataString = ""
                for(let i = 0; i < data.length; i++){
                    dataString = dataString + data[i].timestamp + ": " + data[i].data + "\n" 
                }
                setSentData(dataString)
            });
        
        setText("");
        setSelectedID("");
    }
    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  refreshPressed()
        return () => { ignore = true; }
    },[]);

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