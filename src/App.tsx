import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <div className="wrapper">
      <div className="app">
        <PrivateRoute />
      </div>
    </div>
  );
}

export default App;
