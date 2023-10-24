import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { EasyGuard, EasyProvider, UnconnectButton, useApp } from "./arkitekt";
import { AutoConfiguration } from "./arkitekt/autos/AutoConfiguration";
import { Callback } from "./arkitekt/components/Callback";
import { RekuestGuard } from "@jhnnsrs/rekuest";
import { HerreGuard } from "@jhnnsrs/herre";
import { LogoutButton } from "./arkitekt/components/LogoutButton";
import { PortGuard, usePort, usePortQuery, withPort } from "@jhnnsrs/port";
import { gql, useQuery } from "@apollo/client";
import { useFakts } from "@jhnnsrs/fakts";

const GET_DOCS = gql`
  query GetDogs {
    containers {
      id
      name
    }
  }
`;

const PortIsThere = () => {
  const { data, loading } = usePortQuery(GET_DOCS);

  return <h1>{JSON.stringify(data)}</h1>;
};

export const Test = () => {
  const { manifest } = useApp();
  const { fakts } = useFakts();

  return (
    <>
      <h1>{manifest.identifier}</h1>
      <EasyGuard>Hallo</EasyGuard>
      <RekuestGuard>Rekuest</RekuestGuard>
      <HerreGuard>Herre</HerreGuard>
      <PortGuard>
        <PortIsThere />
      </PortGuard>
      {JSON.stringify(fakts)}
      <LogoutButton />
      <UnconnectButton />
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
        <AutoConfiguration wellKnownEndpoints={["100.91.169.37:8000"]} />
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
