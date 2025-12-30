import winner from "../../assets/images/winner.jpg";
import css from "./Hero.module.scss";
import type { Event, EventOptions, Side } from "../../types";
import EventList from "../EventsList/EventsList";
import { useState } from "react";
import TradeModal from "../tradeModal/TradeModal";

const binaryEvent: Event[] = [
  {
    id: "btc-100k-dec",
    question: "Will BTC hit $100k by Dec 31?",
    closesAt: "2025-12-31T23:59:59Z",
    status: "CLOSED",
    eventOptions: [
      {
        id: "opt-1",
        yesPrice: 62,
        noPrice: 38,
      },
    ],
    amountTraded: 1000,
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
    amountTraded: 1000,
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
    amountTraded: 1040,
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
    amountTraded: 1500,
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
    amountTraded: 2000,
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
    amountTraded: 3400,
    imageUrl: "https://example.com/governor.jpg",
  },
];

function Hero() {
  const [modalData, setModalData] = useState<{
    event: Event | null;
    option: EventOptions | null;
    side: Side | null;
  }>({ event: null, option: null, side: null });

  const openTradeModal = (event: Event, option: EventOptions, side: Side) => {
    setModalData({ event, option, side });
  };

  // const closeTradeModal = () => {
  //   setModalData({ event: null, option: null, side: null });
  // };
  return (
    <>
      <div className={css.heroContainer}>
        <div className={css.eventsList}>
          <EventList events={binaryEvent} onOpenModal={openTradeModal} />
        </div>
        {modalData.event && modalData.side && modalData.option && (
          <TradeModal
            event={modalData.event}
            side={modalData.side}
            option={modalData.option}
          />
        )}
      </div>
    </>
  );
}

export default Hero;
