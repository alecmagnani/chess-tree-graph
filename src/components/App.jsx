import { Header } from "./Header";
import { AppLogic } from "./AppLogic";
import "../styles/App.css";

const App = () => {
  return (
    <>
      {/* <div className="wrapper"> */}
      <div className="chess-diff">
        <Header />
        <AppLogic />
      </div>
      {/* </div> */}
    </>
  );
};

export default App;
