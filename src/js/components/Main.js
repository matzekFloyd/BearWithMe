import PropTypes from "prop-types";
import React from "react";
import { Bear } from "../models/Bear";
import BearFallback from "../../images/bfb_large.jpg";

export function Main({ bear }) {
  return (
    <main id={"app-main"}>
      {bear && (
        <>
          <h1>{bear.name}</h1>
          <BearImage bearCfg={bear} />
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};

function BearImage({ bearCfg }) {
  let renderFallbackBear = bearCfg === null;
  return (
    <img
      src={renderFallbackBear ? BearFallback : bearCfg.src.large}
      alt={"A bear"}
    />
  );
}
BearImage.propTypes = {
  bearCfg: PropTypes.instanceOf(Bear).isRequired,
};
