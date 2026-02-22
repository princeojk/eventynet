import type { Event, Side } from "../../types";
import css from "./opentrades.module.scss";

interface OpenTrades {
  event: Event;
  position: Side;
  amount: number;
}

const OpenTrades = () => {
  const openTrades: OpenTrades[] = [
    {
      event: {
        id: 1,
        question: "Will BTC hit $100k by Dec 31?",
        closesAt: "2025-12-31T23:59:59Z",
        status: "CLOSED",
        eventOptions: [
          {
            id: 1,
            yesPrice: 62,
            noPrice: 38,
          },
        ],
        amountTraded: 1000,
        imageUrl: "",
      },
      position: "YES",
      amount: 1000,
    },
    {
      event: {
        id: 1,
        question: "Who will be the next governor of New York?",
        closesAt: "2026-11-03T23:59:59Z",
        status: "OPEN",
        eventOptions: [
          {
            id: 1,
            yesPrice: 60,
            noPrice: 40,
          },
        ],
        amountTraded: 1000,
        imageUrl: "https://example.com/governor.jpg",
      },
      position: "NO",
      amount: 2000,
    },
    {
      event: {
        id: 1,
        question: "Will BTC hit $100k by Dec 31?",
        closesAt: "2025-12-31T23:59:59Z",
        status: "CLOSED",
        eventOptions: [
          {
            id: 1,
            yesPrice: 62,
            noPrice: 38,
          },
        ],
        amountTraded: 1000,
        imageUrl: "",
      },
      position: "YES",
      amount: 1000,
    },
    {
      event: {
        id: 1,
        question: "Who will be the next governor of New York?",
        closesAt: "2026-11-03T23:59:59Z",
        status: "OPEN",
        eventOptions: [
          {
            id: 1,
            yesPrice: 60,
            noPrice: 40,
          },
        ],
        amountTraded: 1000,
        imageUrl: "https://example.com/governor.jpg",
      },
      position: "NO",
      amount: 2000,
    },
    {
      event: {
        id: 1,
        question: "Will BTC hit $100k by Dec 31?",
        closesAt: "2025-12-31T23:59:59Z",
        status: "CLOSED",
        eventOptions: [
          {
            id: 1,
            yesPrice: 62,
            noPrice: 38,
          },
        ],
        amountTraded: 1000,
        imageUrl: "",
      },
      position: "YES",
      amount: 1000,
    },
    {
      event: {
        id: 1,
        question: "Who will be the next governor of New York?",
        closesAt: "2026-11-03T23:59:59Z",
        status: "OPEN",
        eventOptions: [
          {
            id: 1,
            yesPrice: 60,
            noPrice: 40,
          },
        ],
        amountTraded: 1000,
        imageUrl: "https://example.com/governor.jpg",
      },
      position: "NO",
      amount: 2000,
    },
  ];

  return (
    <div className={css.openTradesContainer}>
      <p className={css.title}>Open Events</p>
      <div className={css.openTrades}>
        <div className={css.value}>
          {openTrades.map(({ event, position, amount }) => {
            return (
              <div key={event.id} className={css.openList}>
                <p>{event.question}</p>
                <p>Choosen Position: {position}</p>
                <p>Amount: {amount}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OpenTrades;
