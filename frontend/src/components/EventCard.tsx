import './EventCard.css'

interface Modifier {
    stockmodified: string;
    modification: number;
}

function EventCard(props){
    
    let modifiers: Modifier[] = [];

    let newmod: Modifier = {
        stockmodified: "Farmers' Union",
        modification: -0.20
    };

    modifiers.push(newmod)
    
    return(
        <div className="Event">
            <span className="EventName">{/*props.eventname*/}testname</span>
            <br/>
            <span className="EventDescription">{/*props.eventdescription*/}testdesc</span>
            <br/>
            <span className="EventModifiers">
                {modifiers.map(modifier => <li className="ModifierIndex">
                {modifier.stockmodified}: {modifier.modification}
            </li>)}
            </span>
        </div>
    );
}
 
export default EventCard;