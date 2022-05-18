import Info from "./components/Info";
import Form from "./components/Form";
import "./App.scss";

function App() {
  return (
    <div className="main">
      <div className="titleWrap">
        <h1>Chat with GPT-3</h1>
        <Info />
      </div>
      <Form />
    </div>
  );
}

export default App;
