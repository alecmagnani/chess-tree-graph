import { Header } from "./Header";
import { AppLogic } from "./AppLogic";
import "../styles/App.css";

const App = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <AppLogic />
      </div>
    </>
  );
};

export default App;
