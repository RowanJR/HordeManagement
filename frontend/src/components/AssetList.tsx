import './AssetList.css'
import StockAsset from './StockAsset';
import {useEffect, useState} from 'react';

/*type AssetInfo = {
    id: string;
    stockname: string; 
    description: string; 
    owned: number; 
    price: number; 
    dividend: number; 
    deviation: number;
};*/

function AssetList(props){
    const [stocks, setStocks] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
        {
            fetch('http://localhost:5001/api/portfolio')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setStocks(data);
                    setLoading(false);
                })
                .catch((err) => console.error("error fecthing data: ", err));
        }, 
    [props.refresh]);

    if(loading) return <div className="List">Obtaining information from server...</div>

    if(stocks.length <= 0) return <div className="List">No stocks found</div>
    
    return(
        <div className="List">
            {stocks.map(stock => <li className="AssetIndex">
                <StockAsset
                    stockid= {stock["id"]}
                    stockname= {stock["stockname"]}
                    description= {stock["description"]}
                    owned= {stock["owned"]}
                    price= {stock["price"]}
                    dividend= {stock["dividend"]}
                    deviation= {stock["deviation"]}
                    goldupdate= {props.onTransaction}
                />
                <hr/>
            </li>)}
        </div>
    );
}

export default AssetList;