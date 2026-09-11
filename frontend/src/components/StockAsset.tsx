import './StockAsset.css'

function StockAsset(props){

    return(
        <div className="Stock">
            <span className="StockName">{props.stockname}</span>
            <br/>
            <span className="StockDescription">{props.description}</span>
            <br/>
            <span className="OwnedShares">{props.owned} shares owned</span>
            <br/>
            <span className="StockPrice">Price: {props.price}</span>
            <br/>
            <span className="StockDivident">Dividend: {props.dividend}</span>
            <br/>
            <button className="SellButton">Sell</button>
            <button className="BuyButton">Buy</button>
        </div>
    );
}
 
export default StockAsset;