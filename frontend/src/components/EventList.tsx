import './EventList.css'
import EventCard from './EventCard';

interface Event{
    eventname: string;
    description: string;
    modifiers: [string, number][];
}

function EventList(props){

    const mods: [string, number][] = [
        ["Farmers' Union", -0.2],
        ["raiders", 0.05]
    ];

    let Events: Event[] = [];

    let famine: Event = {
        eventname: "Famine",
        description: "A famine is occuring",
        modifiers: mods
    };

    Events.push(famine);

    if(Events.length <= 0)
    {
        return(
            <div className="List">
                <p>No events have occured.</p>
            </div>);
    }

    return(
        <div className="List">
            {Events.map(event => <li className="AssetIndex">
                <EventCard
                    eventname={event["eventname"]}
                    description={event["description"]}
                    modifierarray={event["modifiers"]}
                />
                <hr/>
            </li>)}
        </div>
    );
}
 
export default EventList;