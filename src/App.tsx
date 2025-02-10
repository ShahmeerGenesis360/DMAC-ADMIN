import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import '@solana/wallet-adapter-react-ui/styles.css';
import { ToastContainer } from 'react-toastify'


// Use require instead of import since the stylesheets are not included in the main bundle

function App() {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // new SolflareWalletAdapter(),
      // new GlowWalletAdapter(),
      // new MathWalletAdapter(),
    ],
    []
  );

  // Set the network to devnet, testnet, or mainnet-beta
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  return (
    <>
      <BrowserRouter>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Routes />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </>
  );
}

export default App;