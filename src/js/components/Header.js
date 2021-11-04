import Heart from "../../images/black_heart_24.png";

/**
 * @this Header
 */
export function Header() {
  return (
    <header id={"app-header"}>
      <p className={"app-header__disclaimer"}>
        For my lovely Babsi bear: A bear a day, to keep your sorrows away...{" "}
        <img src={Heart} alt={"A heart"} />
      </p>
    </header>
  );
}
