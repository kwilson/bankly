import reactLogo from "./assets/react.svg";
import "./app.css";
import { Home } from "./views/home";

const App = () => (
  <div className="app">
    <div className="app__header">
      <div className="container">
        <div className="app__row">
          <a href="https://www.thisisbud.com/" target="_blank" rel="noreferrer">
            <img src="/bankly.svg" className="logo" alt="Bud logo" />
          </a>
        </div>
      </div>
    </div>
    <div className="container">
      <Home />
    </div>
  </div>
);

export default App;
