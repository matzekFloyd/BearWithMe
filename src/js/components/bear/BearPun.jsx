import PropTypes from "prop-types";

/**
 * @this BearPun
 */
export function BearPun({ pun }) {
  return <p className={"bear-pun"}>{pun}</p>;
}
BearPun.propTypes = {
  pun: PropTypes.string.isRequired,
};
