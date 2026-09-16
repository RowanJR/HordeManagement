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
  const [goldrefresh, setGoldRefresh] = useState(0);
  const [fullrefresh, setRefresh] = useState(0);

  const GoldRefresh = () => {
    setGoldRefresh(goldrefresh + 1);
  };

  const FullRefresh = () => {
    setRefresh(fullrefresh + 1);
    setGoldRefresh(goldrefresh + 1);
  };

  return (
    <div>
      {activepage === "EventPage" && <EventList refresh={fullrefresh}/>}
      {activepage === "AssetPage" && <AssetList refresh={fullrefresh} onTransaction={GoldRefresh}/>}
      <GoldDisplay refreshTrigger={goldrefresh}/>
      <PageSelector activepage={activepage} OnSelectPage={SetActivePage} />
      <NextQuarterButton onAdvance={FullRefresh}/>
    </div>
  );
}

export default App;