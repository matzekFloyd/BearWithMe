import PropTypes from "prop-types";
import { Bear } from "../models/Bear";
import { BearImage } from "./bear/BearImage";

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
          <p>
          Lumber companies felt they had no choice but to kill the black bears in Washington State that were eating the bark from trees. However, once someone thought to put piles of food in the forest, the bears stopped eating the trees, and were happy to eat the free food. Because feeding the bears cost less than killing them, the lumber companies were happy, too.
          </p>
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};
