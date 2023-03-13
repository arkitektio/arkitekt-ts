import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { EasyProvider, useApp } from "./arkitekt";
import { Callback } from "./arkitekt/components/Callback";
import { EasyGuard } from "./arkitekt/components/EasyGuard";
import { LoginButton } from "./arkitekt/components/LoginButton";
import { Images } from "./contrib/Images";

export const Test = () => {
  const { manifest } = useApp();

  return (
    <>
      <h1>{manifest.identifier}</h1>
      <EasyGuard>
        <Images />
      </EasyGuard>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <EasyProvider
        manifest={{
          identifier: "github.io.jhnnsrs.arkitekt",
          version: "latest",
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/callback" element={<Callback autoClose={true} />} />
          </Routes>
        </Router>
      </EasyProvider>
    </div>
  );
}

export default App;
