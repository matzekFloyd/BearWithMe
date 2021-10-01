import PropTypes from "prop-types";

/**
 * @this BearQuote
 */
export function BearQuote({ quoteObj }) {
  return (
    <p>
      "{quoteObj.quote}" - {quoteObj.author}
    </p>
  );
}
BearQuote.propTypes = {
  quoteObj: PropTypes.object,
};
