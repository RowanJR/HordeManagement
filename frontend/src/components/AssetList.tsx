import './AssetList.css'
import StockAsset from './StockAsset';

type AssetInfo = {
    stockname: string; 
    description: string; 
    owned: number; 
    price: number; 
    dividend: number; 
    deviation: number;
};

function AssetList(){

    let AssetCategories: AssetInfo[] = [];

    let farmers: AssetInfo = {
        stockname: "Farmers Union",
        description: "Staple goods", 
        owned: 0,
        price: 10,
        dividend: 0.04,
        deviation: 0.05
    };
    let miners: AssetInfo = {
        stockname: "miners",
        description: "Staple goods", 
        owned: 0,
        price: 10,
        dividend: 0.04,
        deviation: 0.05
    };
    let crown: AssetInfo = {
        stockname: "crown",
        description: "Staple goods", 
        owned: 0,
        price: 10,
        dividend: 0.04,
        deviation: 0.05
    };
    let militia: AssetInfo = {
        stockname: "militia",
        description: "Staple goods", 
        owned: 0,
        price: 10,
        dividend: 0.04,
        deviation: 0.05
    };
    let tinkerers: AssetInfo = {
        stockname: "tinkerers",
        description: "Staple goods", 
        owned: 0,
        price: 10,
        dividend: 0.04,
        deviation: 0.05
    };

    AssetCategories.push(farmers);
    AssetCategories.push(miners);
    AssetCategories.push(crown);
    AssetCategories.push(militia);
    AssetCategories.push(tinkerers);
        
    return(
        <div className="List">
            {AssetCategories.map(asset => <li className="AssetIndex">
                <StockAsset
                    stockname= {asset["stockname"]}
                    description= {asset["description"]}
                    owned= {asset["owned"]}
                    price= {asset["price"]}
                    dividend= {asset["dividend"]}
                    deviation= {asset["deviation"]}
                />
                <hr/>
            </li>)}
        </div>
    );
}

export default AssetList;