import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { Api } from "./api/Api";
import Names from "../json/names.json";
import { getIndex } from "./util";

function App() {
  const name = Names[getIndex()];
  const [bear, setBear] = useState(null);

  useEffect(() => {
    async function getBear() {
      return await Api.getBear();
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
