import "../sass/main.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { createClient } from "pexels";
import { useEffect, useState } from "react";

function App() {
  const pexelsClient = createClient(process.env.REACT_APP_PEXELS_API_KEY);

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    pexelsClient.collections
      .media({ id: process.env.REACT_APP_PEXELS_BEAR_COLLECTION_ID })
      .then((res) => {
        let idx = Math.floor(Math.random() * (res.media.length - 0 + 1) + 0);
        setPhoto(res.media[idx]);
      });
  }, []);

  return (
    <>
      <Header />
      <Main>{photo && <img src={photo.src.large} />}</Main>
      <Footer />
    </>
  );
}

export default App;
