import PropTypes from "prop-types";

/**
 * @this BearFact
 */
export function BearFact({ fact }) {
  return <p>"{fact}"</p>;
}
BearFact.propTypes = {
  fact: PropTypes.string.isRequired,
};
