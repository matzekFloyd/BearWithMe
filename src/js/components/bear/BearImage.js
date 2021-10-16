import PropTypes from "prop-types";
import BearFallback from "../../../images/bfb_large.jpg";
import { Bear } from "../../models/Bear";

/**
 * @this BearImage
 */
export function BearImage({ bearObj }) {
  let renderFallbackBear = bearObj === null;
  return (
    <img
      onMouseOver={() => console.log("Mouse over")}
      src={renderFallbackBear ? BearFallback : bearObj.getSrcByDimensions()}
      alt={"A bear"}
    />
  );
}
BearImage.propTypes = {
  bearObj: PropTypes.instanceOf(Bear).isRequired,
};
