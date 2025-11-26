import '../styles/globals.css';
import { TickerProvider } from "../hooks/useTicker";

export default function App({ Component, pageProps }) {
  return (
    <TickerProvider>
      <Component {...pageProps} />
    </TickerProvider>
  );
}
