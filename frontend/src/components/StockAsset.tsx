import './StockAsset.css'
import {useEffect} from 'react';

interface DataPayload{
    id: string;
}

function StockAsset(props){

    let stockid: string = props.stockid;

    const BuyClick = async () => {
        
        const payload: DataPayload = {
            id: stockid
        }

        const response = await fetch('http://localhost:5001/api/buy', {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(payload)
        });
        

    };

    const SellClick = async () => {

        const payload: DataPayload = {
            id: stockid
        }

        const response = await fetch('http://localhost:5001/api/sell', {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(payload)
        });

    };

    return(
        <div className="Stock">
            <span className="StockName">{props.stockname}</span>
            <br/>
            <span className="StockDescription">{props.description}</span>
            <br/>
            <span className="OwnedShares">shares owned: {props.owned}</span>
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