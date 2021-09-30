import PropTypes from "prop-types";
import React from "react";
import { Bear } from "../models/Bear";
import BearFallback from "../../images/bfb_large.jpg";

/**
 * @this Main
 */
export function Main({ bear }) {
  return (
    <main id={"app-main"}>
      {bear && (
        <>
          <h1>{bear.name}</h1>
          <BearImage bearObj={bear} />
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};

/**
 * @this BearImage
 */
function BearImage({ bearObj }) {
  let renderFallbackBear = bearObj === null;
  return (
    <img
      src={renderFallbackBear ? BearFallback : bearObj.getSrcByDimensions()}
      alt={"A bear"}
    />
  );
}
BearImage.propTypes = {
  bearObj: PropTypes.instanceOf(Bear).isRequired,
};
