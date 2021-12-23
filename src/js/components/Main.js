import PropTypes from "prop-types";
import { useState } from "react";
import { Bear } from "../models/Bear";
import { BearImage } from "./bear/BearImage";
import { LoadingSpinner } from "./LoadingSpinner";

/**
 * @this Main
 */
export function Main({ bear }) {
  let [bearImgLoading, setBearImgLoading] = useState(true);

  return (
    <main id={"app-main"}>
      {bear && (
        <>
          {bearImgLoading ? <LoadingSpinner /> : <h1>{bear.name}</h1>}
          <BearImage bearObj={bear} setBearImgLoading={setBearImgLoading} />
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};
