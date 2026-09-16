import './NextQuarterButton.css'

function NextQuarterButton(){

    const Click = async () => {
        
        //we update the UI here roughly, it could desync from the backend theoretically, but it should be fine
        fetch('http://localhost:5001/api/advance')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            
        })
        .catch((err) => console.error("error fetching data: ", err));
    };

    return (
        <div>
            <button className="NextButton" onClick={Click}>Advance to <br></br> Next Quarter</button>
        </div>
    );
}

export default NextQuarterButton;