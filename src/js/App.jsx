import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { BearGenerator } from "./BearGenerator";

/**
 * @this App
 */
function App() {
  const [bear, setBear] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function getBear() {
      let b = await BearGenerator.fetchBear();
      if (!cancelled) {
        setBear(b);
      }
    }
    getBear();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Header />
      <Main bear={bear} />
      <Footer />
    </>
  );
}

export default App;
