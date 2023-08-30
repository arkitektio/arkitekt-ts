import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { EasyGuard, EasyProvider, useApp } from "./arkitekt";
import { AutoConfiguration } from "./arkitekt/autos/AutoConfiguration";
import { Callback } from "./arkitekt/components/Callback";
import { RekuestGuard } from "@jhnnsrs/rekuest";

export const Test = () => {
  const { manifest } = useApp();

  return (
    <>
      <h1>{manifest.identifier}</h1>
      <EasyGuard>Hallo</EasyGuard>
      <RekuestGuard>oinoin</RekuestGuard>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <EasyProvider
        manifest={{
          version: "latest",
          identifier: "github.io.jhnnsrs.orkestrator",
        }}
      >
        <AutoConfiguration
          endpoints={["100.91.169.37:8000"]}
          mikroPossibleTypes={{}}
          rekuestPossibleTypes={{}}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </Router>
      </EasyProvider>
    </div>
  );
}

export default App;
