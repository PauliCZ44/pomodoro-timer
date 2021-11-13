import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <button className="btn btn-primary mx-5">daisyUI Button</button>
      <button className="btn btn-primary rounded-full">daisyUI Button</button>
    </div>
  );
}

export default App;
