import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { Api } from "./api/Api";
import { Bear } from "./models/Bear";

function App() {
  const [bear, setBear] = useState(null);

  useEffect(() => {
    async function getBear() {
      return await Api.getBear();
    }
    getBear().then((bear) => setBear(new Bear(bear)));
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
