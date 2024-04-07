import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";

function App() {
  return (
    <>
      <Navbar navTitle="TextUtils" navEle1="Home" navEle1Link="/" />
      <TextForm heading="Welcome to text utilities" />
    </>
  );
}

export default App;
