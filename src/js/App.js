import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { Pexels } from "./api/Pexels";
import { Bear } from "./models/Bear";
import { getIndex } from "./util";
import Names from "../json/names.json";

function App() {
  const [bear, setBear] = useState(null);

  useEffect(() => {
    async function getBear() {
      let idx = getIndex();
      let bear = await Pexels.getBearById();
      if (bear === null) {
        let bears = await Pexels.getBearCollection();
        bear = bears[idx];
      }
      bear = new Bear(bear);
      bear.setName(Names[idx]);
      return bear;
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
