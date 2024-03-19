import NewMeeting from "./components/newMeeting";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar></Sidebar>
      <NewMeeting></NewMeeting>
     
    </div>
  );
}

export default App;
