import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main"

function App() {
  const [selected, setSelected] = useState("home");
  return (
    <div style={{
      width:"1288px",
      margin:"auto",
      backgroundColor:"white",
      fontFamily:"Roboto"
    }}>
      <Header selected={selected} setSelected={setSelected}/>
      <Main selected={selected}/>
    </div>
  );
}

export default App;
