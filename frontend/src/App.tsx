import './App.css'
import GoldDisplay from './components/GoldDisplay';
import NextQuarterButton from './components/NextQuarterButton';
import PageSelector from './components/PageSelector';
import AssetList from './components/AssetList';
import EventList from './components/EventList';
import EventCard from './components/EventCard';

function App() {

  return (
    <div>
      {/*<div className="Assets">
        <AssetList />
      </div>*/}
      <div className="Events">
        <EventCard/>
      </div>
      <GoldDisplay />
      <PageSelector />
      <NextQuarterButton />
    </div>
  )
}

export default App;