import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
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
  let [punRevealed, setPunRevealed] = useState(false);
  let pun = useMemo(() => getDailyPun(new Date()), []);

  let revealPun = useCallback(() => {
    if (pun) {
      setPunRevealed(true);
    }
  }, [pun]);

  let onBearHitKeyDown = useCallback(
    (e) => {
      if (!pun || punRevealed) {
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        revealPun();
      }
    },
    [pun, punRevealed, revealPun]
  );

  let awaitingPunTap = Boolean(pun && !punRevealed);

  return (
    <main id={"app-main"}>
      {bear && (
        <>
          {bearImgLoading ? <LoadingSpinner /> : <h1>{bear.name}</h1>}
          <div
            className={
              awaitingPunTap
                ? "app-main__bear-hit"
                : pun && punRevealed
                  ? "app-main__bear-wrap app-main__bear-wrap--settle"
                  : "app-main__bear-wrap"
            }
            onClick={awaitingPunTap ? revealPun : undefined}
            onKeyDown={awaitingPunTap ? onBearHitKeyDown : undefined}
            role={awaitingPunTap ? "button" : undefined}
            tabIndex={awaitingPunTap ? 0 : undefined}
            aria-label={
              awaitingPunTap ? "Reveal the pun of the day" : undefined
            }
          >
            <BearImage bearObj={bear} setBearImgLoading={setBearImgLoading} />
          </div>
          {pun && punRevealed ? (
            <section
              className={"app-main__pun app-main__pun--reveal-in"}
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
