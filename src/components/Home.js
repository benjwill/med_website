import { useState } from "react";

function Home() {
    const [data, setData] = useState("");
    const [selectedID, setSelectedID] = useState("");

    const checkInputs = () => {
        if(data !== "" && selectedID !== ""){
            submitPressed();
        }
        else{
            alert("Check to make sure the data field and the ID of the healthcare professional are both filled out.")
        }
    }
    
    const submitPressed = () => {
        console.log("ran");
        
        setData("");
        setSelectedID("");
    }

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
                            <textarea className="form-control mb-5 mt-5" value={data} style={{borderColor: "black", height:"50vh", resize:"none"}} id="data" onChange={(event)=>setData(event.target.value)}></textarea>   
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

export default Home;