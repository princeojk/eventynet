import winner from "../../assets/images/winner.jpg";
import css from "./Hero.module.scss";
import type { Event } from "../../types";
import EventList from "../EventsList/EventsList";

const binaryEvent: Event[] = [
  {
    id: "btc-100k-dec",
    question: "Will BTC hit $100k by Dec 31?",
    closesAt: "2025-12-31T23:59:59Z",
    status: "OPEN",
    eventOptions: [
      {
        id: "opt-1",
        yesPrice: 62,
        noPrice: 38,
      },
    ],
    imageUrl: winner,
  },
  {
    id: "ny-governor-2026",
    question: "Who will be the next governor of New York?",
    closesAt: "2026-11-03T23:59:59Z",
    status: "OPEN",
    eventOptions: [
      {
        id: "cand-a",
        yesPrice: 60,
        noPrice: 40,
      },
    ],
    imageUrl: "https://example.com/governor.jpg",
  },
  {
    id: "btc-100k-dec",
    question: "Will BTC hit $100k by Dec 31?",
    closesAt: "2025-12-31T23:59:59Z",
    status: "OPEN",
    eventOptions: [
      {
        id: "opt-1",
        yesPrice: 62,
        noPrice: 38,
      },
    ],
    imageUrl: winner,
  },
  {
    id: "ny-governor-2026",
    question: "Who will be the next governor of New York?",
    closesAt: "2026-11-03T23:59:59Z",
    status: "OPEN",
    eventOptions: [
      {
        id: "cand-a",
        yesPrice: 60,
        noPrice: 40,
      },
    ],
    imageUrl: "https://example.com/governor.jpg",
  },
  {
    id: "btc-100k-dec",
    question: "Will BTC hit $100k by Dec 31?",
    closesAt: "2025-12-31T23:59:59Z",
    status: "OPEN",
    eventOptions: [
      {
        id: "opt-1",
        yesPrice: 62,
        noPrice: 38,
      },
    ],
    imageUrl: winner,
  },
  {
    id: "ny-governor-2026",
    question: "Who will be the next governor of New York?",
    closesAt: "2026-11-03T23:59:59Z",
    status: "OPEN",
    eventOptions: [
      {
        id: "cand-a",
        yesPrice: 60,
        noPrice: 40,
      },
    ],
    imageUrl: "https://example.com/governor.jpg",
  },
];

function Hero() {
  return (
    <>
      <div className={css.heroContainer}>
        <div className={css.eventsList}>
          <EventList events={binaryEvent} />
        </div>
      </div>
    </>
  );
}

export default Hero;
