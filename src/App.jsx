import CampaignMode from "./components/CampaignMode.jsx";
import "./App.css";

function App() {
  console.log("App component is loading...");
  
  return (
    <div className="app">
      <h1>Lost in Translation: Marketing Mayhem</h1>
      <CampaignMode />
    </div>
  );
}

export default App;
