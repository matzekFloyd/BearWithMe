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
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};
