import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { Pexels } from "./api/Pexels";
import Names from "../json/names.json";
import { getIndex } from "./util";

function App() {
  const name = Names[getIndex()];
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
      <Main name={name} bear={bear} />
      <Footer />
    </>
  );
}

export default App;
