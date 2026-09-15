import './GoldDisplay.css'
import {useEffect, useState} from 'react';

function GoldDisplay({refreshTrigger}:{refreshTrigger: number}){
    const [value, setValue] = useState(null);

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
        <span className="GoldDisplayText">Gold: {value}</span>
    </div>);
}

export default GoldDisplay;