import './EventList.css'
import EventCard from './EventCard';
import {useEffect, useState} from 'react';

function EventList(props){
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
        {
            fetch('http://localhost:5001/api/events')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setEvents(data);
                    setLoading(false);
                })
                .catch((err) => console.error("error fecthing data: ", err));
        }, 
    [props.refresh]);

    if(loading) return <div className="List">Obtaining information from server...</div>

    if(events.length <= 0)
    {
        return(
            <div className="List">
                <p>No events have occured.</p>
            </div>);
    }

    return(
        <div className="List">
            {events.map(event => <li className="AssetIndex">
                <EventCard
                    eventname={event["name"]}
                    description={event["description"]}
                    modifierarray={event["modifiers"]}
                />
                <hr/>
            </li>)}
        </div>
    );
}
 
export default EventList;