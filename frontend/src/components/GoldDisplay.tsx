import './GoldDisplay.css'
import {useEffect, useState} from 'react';

function GoldDisplay({refreshTrigger}:{refreshTrigger: number}){
    const [value, setValue] = useState(0);

    let dummy: number = value;

    useEffect(() =>
        {
            fetch('http://localhost:5001/api/gold')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setValue(data["amount"]);
                })
                .catch((err) => console.error("error fetching data: ", err));
        }, 
    [refreshTrigger]);

    return (
    <div className="GoldDisplayBox">
        <span className="GoldDisplayText">Gold: {dummy.toFixed(1)}</span>
    </div>);
}

export default GoldDisplay;