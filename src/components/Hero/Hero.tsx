import Button from "../Buttons/Button";
import winner from "../../assets/images/winner.jpg";
import css from "./Hero.module.scss";
import EventsCard from "../Events/EventsCard";
import type { Event } from "../../types";

const dummyEvent: Event = {
  id: "btc-100k-dec",
  question: "Will BTC hit $100k by Dec 31?",
  closesAt: "2025-12-31T23:59:59Z",
  status: "OPEN",
  prices: {
    yes: 62,
    no: 38,
  },
};

function Hero() {
  return (
    <>
      <div className={css.heroContainer}>
        <div className={css.authButtons}>
          <Button size="small" color="orange">
            login
          </Button>
          <Button size="small" color="orange">
            sign up
          </Button>
        </div>
        <div className={css.mainText}>
          <h1>Best Event Predictions Platform</h1>
        </div>
        <div className={css.mainButtons}>
          <EventsCard event={dummyEvent} displayAmount={1000}></EventsCard>
        </div>
      </div>
      <div className={css.lowSection}>
        <div className={css.referralContent}>
          <div className={css.referralText}>
            <h2 className={css.referralTitle}>BRING A FRIEND</h2>
            <h3 className={css.referralSubtitle}>GET PAID INSTANTLY</h3>
            <div className={css.cashAmount}>$250</div>
            <p className={css.referralDescription}>
              Instant withdrawal • No waiting • Pure profit
            </p>
            <div className={css.referralCTA}>
              <Button size="medium" color="orange">
                Start Earning Now
              </Button>
            </div>
          </div>
        </div>
        <img src={winner} alt="Hero" className={css.heroImage} />
      </div>
    </>
  );
}

export default Hero;
