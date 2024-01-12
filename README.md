# Arkitekt Typescript Client  

This repository contains the Code for the Arkitekt Typescript client,
which provides convenience methods to integrate Arkitekt into React-based
applications.

## Installation

```bash
yarn add @jhnnsrs/arkitekt
```

## Usage

```typescript
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { EasyGuard, EasyProvider, useApp } from "./arkitekt";
import { AutoConfiguration } from "./arkitekt/autos/AutoConfiguration";
import { Callback } from "./arkitekt/components/Callback";
import { useArkitektConnect } from "./arkitekt/hooks/useArkitektConnect";
import { useArkitektLogin } from "./arkitekt/hooks/useArkitektLogin";

export const Test = () => {
  const { manifest } = useApp();
  const { registeredEndpoints, load } = useArkitektConnect();
  const { login } = useArkitektLogin();

  return (
    <>
      <h1>{manifest.identifier}</h1>
      <EasyGuard
        notConnectedFallback={
          <>
            {registeredEndpoints.map((e) => {
              return (
                <button
                  onClick={() =>
                    load({
                      endpoint: e,
                    })
                  }
                >
                  Connect to {e.name}
                </button>
              );
            })}
          </>
        } // Endpoitns will be automatically autodiscoverd if local
        notLoggedInFallback={
          <>
            <button onClick={() => login()}>Login</button>
          </>
        } // Will start the login workflow
      > // Api calls to the Platform needs to be happening within a Guarded Connecs
        Lets do something with this app
      </EasyGuard>
      </>
  );
};

function App() {

  return (
    <div className="App">
      <EasyProvider
        manifest={{
          version: "latest",
          identifier: "github.io.jhnnsrs.orkestrator",
          scopes: ["openid", "profile", "email"],
        }} // Manifest is required to authenticate against server
      >
        <AutoConfiguration wellKnownEndpoints={["127.0.0.1:8010"]} />
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

```

This is a basic Arkitekt App, which will be able to connnect to a local Arkitekt Service, retrieve configuration from it (or negotiate
to become a new app on the platform), and then authenticates the user via Oauth2 (using an oauth authorization-code grant). 
Components within the "Easy Guard" will only be rendered once Arkitekt is connected. 

