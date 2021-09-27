import PropTypes from "prop-types";
import { Bear } from "../models/Bear";

export function Main({ bear }) {
  return (
    <main id={"app-main"}>
      {bear && <img src={bear.src.large} alt={"A bear"} />}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};
