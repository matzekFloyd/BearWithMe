import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { Pexels } from "./api/Pexels";

function App() {
  const [bear, setBear] = useState(null);

  useEffect(() => {
    async function getBear() {
      return await Pexels.getBear();
    }
    getBear().then((bear) => setBear(bear));
  }, [setBear]);

  return (
    <>
      <Header />
      <Main bear={bear} />
      <Footer />
    </>
  );
}

export default App;
