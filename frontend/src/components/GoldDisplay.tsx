import './GoldDisplay.css'

function GoldDisplay(){
    let value: number = 69421;

    return (
    <div className="GoldDisplayBox">
        <span className="GoldDisplayText">Gold: {value}</span>
    </div>);
}

export default GoldDisplay;