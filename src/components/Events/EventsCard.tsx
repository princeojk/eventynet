import type React from "react";
import { useState } from "react";
import type { Event, Side } from "../../types";
import Button from "../Buttons/Button";
import css from "./EventsCard.module.css";

interface EventsCardProps {
  event: Event;
  displayAmount?: number;
}

const EventsCard: React.FC<EventsCardProps> = ({
  event,
  displayAmount = 1000,
}) => {
  const [, setSide] = useState<Side | null>(null);

  const calPayout = (amount: number, price: number) => {
    return Math.floor((amount * 100) / price);
  };

  const yesAmount = calPayout(displayAmount, event.prices.yes);
  const noAmount = calPayout(displayAmount, event.prices.no);

  return (
    <div className={css.card}>
      {event.imageUrl && (
        <img src={event.imageUrl} alt="event" className={css.cardImage} />
      )}

      <div className={css.header}>{event.question}</div>

      <div className={css.payouts}>
        <p>Invest: ₦{displayAmount}</p>
        <p>YES payout: ₦{yesAmount}</p>
        <p>NO payout: ₦{noAmount}</p>
      </div>

      <div className={css.buttonGroup}>
        <Button size="small" color="green" onClick={() => setSide("YES")}>
          YES ₦{event.prices.yes}
        </Button>
        <Button size="small" color="red" onClick={() => setSide("NO")}>
          NO ₦{event.prices.no}
        </Button>
      </div>

      <div className={css.status}>
        <p>Status: {event.status}</p>
        <p>Closes at: {event.closesAt}</p>
      </div>
    </div>
  );
};

export default EventsCard;
