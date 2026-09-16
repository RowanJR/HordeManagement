import './NextQuarterButton.css'

function NextQuarterButton(props){

    const Click = async () => {
        
        fetch('http://localhost:5001/api/advance')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            props.onAdvance();
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