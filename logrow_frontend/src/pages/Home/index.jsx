import Sidebar from './components/Sidebar';
import InfoPanel from './components/InfoPanel';
import CalendarPanel from './calendar/CalendarPanel';

export default function Home() {
  return (
    <div className="homeContainer">
      <Sidebar />
      <CalendarPanel />
      <InfoPanel />
    </div>
  );
}
