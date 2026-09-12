import './PageSelector.css'

type Page = "EventPage" | "AssetPage";

interface PageSelectorProp{
    activepage: Page;
    OnSelectPage: (page: Page) => void;
}

function PageSelector({ activepage, OnSelectPage }: PageSelectorProp){
        
    return(
        <div className="PageBox">
            <button className="AssetsSelect" data-state={activepage === "AssetPage" ? "active" : 'inactive'} onClick={() => OnSelectPage("AssetPage")} >Assets</button>
            <button className="EventsSelect" data-state={activepage === "EventPage" ? "active" : 'inactive'} onClick={() => OnSelectPage("EventPage")} >Events</button>
        </div>
    );
}

export default PageSelector;