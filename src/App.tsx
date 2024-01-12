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
        }
        notLoggedInFallback={
          <>
            <button onClick={() => login()}>Login</button>
          </>
        }
      >
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
        }}
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

export default App;
