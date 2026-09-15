import './StockAsset.css'
import {useState} from 'react';

interface DataPayload{
    id: string;
}

function StockAsset(props){

    const [owned, setOwned] = useState(props.owned);

    let stockid: string = props.stockid;

    const BuyClick = async () => {
        
        const payload: DataPayload = {
            id: stockid
        }

        //we update the UI here roughly, it could desync from the backend theoretically, but it should be fine
        fetch('http://localhost:5001/api/buy', {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data["success"])
            {
                setOwned(owned + 1);
            }
        })
        .catch((err) => console.error("error fetching data: ", err));
        
        props.goldupdate();
    };

    const SellClick = async () => {

        const payload: DataPayload = {
            id: stockid
        }

        fetch('http://localhost:5001/api/sell', {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data["success"])
            {
                setOwned(owned - 1);
            }
        })
        .catch((err) => console.error("error fetching data: ", err));

        props.goldupdate();
    };

    return(
        <div className="Stock">
            <span className="StockName">{props.stockname}</span>
            <br/>
            <span className="StockDescription">{props.description}</span>
            <br/>
            <span className="OwnedShares">shares owned: {owned}</span>
            <br/>
            <span className="StockPrice">Price: {props.price}</span>
            <br/>
            <span className="StockDivident">Dividend: {props.dividend}</span>
            <br/>
            <button className="SellButton" onClick={SellClick}>Sell</button>
            <button className="BuyButton" onClick={BuyClick}>Buy</button>
        </div>
    );
}
 
export default StockAsset;