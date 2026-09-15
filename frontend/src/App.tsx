import './App.css'
import GoldDisplay from './components/GoldDisplay';
import NextQuarterButton from './components/NextQuarterButton';
import PageSelector from './components/PageSelector';
import AssetList from './components/AssetList';
import EventList from './components/EventList';
import { useState } from "react";

type Page = "EventPage" | "AssetPage";

function App() {
  const [activepage, SetActivePage] = useState<Page>("AssetPage");
  const [refreshtrigger, setRefresh] = useState(0);

  const GoldRefresh = () => {
    setRefresh(refreshtrigger + 1);
  };

  return (
    <div>
      {activepage === "EventPage" && <EventList />}
      {activepage === "AssetPage" && <AssetList onTransaction={GoldRefresh}/>}
      <GoldDisplay refreshTrigger={refreshtrigger}/>
      <PageSelector activepage={activepage} OnSelectPage={SetActivePage} />
      <NextQuarterButton />
    </div>
  );
}

export default App;