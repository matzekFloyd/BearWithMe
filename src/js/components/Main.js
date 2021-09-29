import PropTypes from "prop-types";
import { Bear } from "../models/Bear";

export function Main({ bear }) {
  return (
    <main id={"app-main"}>
      {bear && (
        <>
          <h1>{bear.name}</h1>
          <img src={bear.src.large} alt={"A bear"} />
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};
