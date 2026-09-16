import './EventCard.css'

interface Event {
    eventname: string;
    description; string;
    modifierarray: [string, string, number][];
}

function EventCard({ eventname, description, modifierarray }: Event){
    
    return(
        <div className="Event">
            <span className="EventName">{eventname}</span>
            <br/>
            <span className="EventDescription">{description}</span>
            <br/>
            <span className="EventModifiers">
                {modifierarray.map((mod) => 
                <>
                    {mod["value"] <= 0 ?
                        <li className="NegativeModifier">
                            {mod["name"]}: {mod["value"]*100}%
                        </li>
                    :
                        <li className="PositiveModifier">
                            {mod["name"]}: +{mod["value"]*100}%
                        </li>
                    }
                </>)}
            </span>
        </div>
    );
}
 
export default EventCard;