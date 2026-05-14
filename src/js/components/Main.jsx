import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { Bear } from "../models/Bear";
import { getDailyPun } from "../dailyPun";
import { BearImage } from "./bear/BearImage";
import { BearPun } from "./bear/BearPun";
import { LoadingSpinner } from "./LoadingSpinner";

/**
 * @this Main
 */
export function Main({ bear }) {
  let [bearImgLoading, setBearImgLoading] = useState(true);
  let pun = useMemo(() => getDailyPun(new Date()), []);

  return (
    <main id={"app-main"}>
      {bear && (
        <>
          {bearImgLoading ? <LoadingSpinner /> : <h1>{bear.name}</h1>}
          <BearImage bearObj={bear} setBearImgLoading={setBearImgLoading} />
          {pun ? (
            <section
              className={"app-main__pun"}
              aria-labelledby={"pun-of-the-day-heading"}
            >
              <p className={"app-main__pun-label"} id={"pun-of-the-day-heading"}>
                Pun of the day
              </p>
              <BearPun pun={pun} />
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}
Main.propTypes = {
  bear: PropTypes.instanceOf(Bear),
};
