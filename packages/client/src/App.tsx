import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PrivyClient, PrivyProvider } from "@privy-io/react-auth";
import { env } from "./env";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <PrivyProvider
      appId={env.VITE_PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets", // defaults to 'off'
        },
      }}
    >
      <LoginPage />
    </PrivyProvider>
  );
}

export default App;
