import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import BearFallback from "../../../images/bfb_large.jpg";
import BearPaddington from "../../../images/paddington_greeting_xmas.jpg";
import { Bear } from "../../models/Bear";

/**
 * @this BearImage
 */
export function BearImage({ bearObj, setBearImgLoading }) {
  let [loading, setLoading] = useState(true);

  let bearSrc = null;

  if (bearObj === null) {
    bearSrc = BearFallback;
  } else if (bearObj.isPaddington()) {
    bearSrc = BearPaddington;
  } else {
    bearSrc = bearObj.getSrcByDimensions() || BearFallback;
  }

  useEffect(() => {
    setBearImgLoading(loading);
  }, [loading, setBearImgLoading]);

  return <img src={bearSrc} alt={"A bear"} onLoad={() => setLoading(false)} />;
}
BearImage.propTypes = {
  bearObj: PropTypes.instanceOf(Bear).isRequired,
  setBearImgLoading: PropTypes.func.isRequired,
};
