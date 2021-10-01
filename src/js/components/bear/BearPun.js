import PropTypes from "prop-types";

/**
 * @this BearPun
 */
export function BearPun({ pun }) {
  return <p>"{pun}"</p>;
}
BearPun.propTypes = {
  pun: PropTypes.string.isRequired,
};
