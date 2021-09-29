import PropTypes from "prop-types";
import { Bear } from "../models/Bear";

export function Main({ name, bear }) {
  return (
    <main id={"app-main"}>
      <h1>{name}</h1>
      {bear && <img src={bear.src.large} alt={"A bear"} />}
    </main>
  );
}
Main.propTypes = {
  name: PropTypes.string,
  bear: PropTypes.instanceOf(Bear),
};
