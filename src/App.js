import "./App.css";
import Display from "./display.js";

function App() {
  return (
    <div className="App">
      <div className="upperBar">
        <h1>Todo List</h1>
      </div>
      {/* In this app there are three things component post ,delete and put*/}
      <div className="wrapper">
        <div className="display">
          <Display />
        </div>
      </div>
    </div>
  );
}

export default App;
