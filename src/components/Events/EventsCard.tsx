import type React from "react";
import { useState } from "react";
import type { Event, Side, EventOptions } from "../../types";
import Button from "../Buttons/Button";
import css from "./EventsCard.module.scss";

interface EventsCardProps {
  event: Event;
  displayAmount?: number;
}

const EventsCard: React.FC<EventsCardProps> = ({
  event,
  displayAmount = 1000,
}) => {
  const [, setSide] = useState<Side | null>(null);
  const [, setOption] = useState<EventOptions | null>(null);

  const calPayout = (amount: number, price: number) => {
    return Math.floor((amount * 100) / price);
  };

  return (
    <div className={css.card}>
      {event.imageUrl && (
        <img src={event.imageUrl} alt="event" className={css.cardImage} />
      )}

      <div className={css.header}>{event.question}</div>

      <div className={css.optionsContainer}>
        {event.eventOptions.map((option) => (
          <div key={option.id}>
            {option.title && <p>{option.title}</p>}
            <div className={css.buttonGroup}>
              <Button
                size="small"
                color="green"
                onClick={() => {
                  setSide("YES");
                  setOption(option);
                }}
              >
                <div>
                  <p>YES</p>
                  <p>₦{option.yesPrice}</p>
                </div>
              </Button>
              <Button
                size="small"
                color="pink"
                onClick={() => {
                  setSide("NO");
                  setOption(option);
                }}
              >
                <div>
                  <p>NO</p>
                  <p>₦{option.noPrice}</p>
                </div>
              </Button>
            </div>
            <div className={css.payouts}>
              <p>1k to win ₦{calPayout(displayAmount, option.yesPrice)}</p>
              <p>1k to win ₦{calPayout(displayAmount, option.noPrice)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={css.statusTime}>
        <p>
          Status: <strong>{event.status}</strong>
        </p>
        <p>
          Closes at: <strong>{event.closesAt}</strong>
        </p>
      </div>
    </div>
  );
};

export default EventsCard;
