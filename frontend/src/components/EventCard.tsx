import './EventCard.css'

interface Event {
    eventname: string;
    description; string;
    modifierarray: [string, number][];
}

function EventCard({ eventname, description, modifierarray }: Event){
    
    return(
        <div className="Event">
            <span className="EventName">{eventname}</span>
            <br/>
            <span className="EventDescription">{description}</span>
            <br/>
            <span className="EventModifiers">
                {modifierarray.map(([label, value]) => 
                <>
                    {value <= 0 ?
                        <li className="NegativeModifier">
                            {label}: {value*100}%
                        </li>
                    :
                        <li className="PositiveModifier">
                            {label}: +{value*100}%
                        </li>
                    }
                </>)}
            </span>
        </div>
    );
}
 
export default EventCard;