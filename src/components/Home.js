import { useState } from "react";

function Home() {
    const [text, setText] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [file, setFile] = useState("");

    const checkInputs = () => {
        if((file !== "" || text !== "") && selectedID !== ""){
            submitPressed();
        }
        else{
            alert("Check to make sure the data field and the ID of the healthcare professional are both filled out.")
        }
    }
    
    const submitPressed = () => {
        console.log("ran");
        
        setText("");
        setSelectedID("");
        setFile("")
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
                            <textarea placeholder="Type or paste information here if applicable" className="form-control mb-5 mt-5" value={text} style={{borderColor: "black", height:"50vh", resize:"none"}} id="text" onChange={(event)=>setText(event.target.value)}></textarea>   
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputFile">Upload file here if applicable</label>
                            <input onChange={(event)=>setFile(event.target.value)} value={file} type="file" class="form-control" id="inputFile"/>
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