import PropTypes from "prop-types";
import BearFallback from "../../../images/bfb_large.jpg";
import BearPaddington from "../../../images/paddington_xmas.jpg";
import { Bear } from "../../models/Bear";

/**
 * @this BearImage
 */
export function BearImage({ bearObj }) {
  let bearSrc = null;

  if (bearObj === null) {
    bearSrc = BearFallback;
  } else if (bearObj.isPaddington()) {
    bearSrc = BearPaddington;
  } else {
    bearSrc = bearObj.getSrcByDimensions();
  }

  return <img src={bearSrc} alt={"A bear"} />;
}
BearImage.propTypes = {
  bearObj: PropTypes.instanceOf(Bear).isRequired,
};
