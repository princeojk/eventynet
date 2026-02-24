import type React from "react";
import { useState } from "react";
import type { Event, Side } from "../../types";
import Button from "../Buttons/Button";
import css from "./EventsCard.module.scss";
import { calPayout } from "../../utils/calculatePayout";
interface EventsCardProps {
  event: Event;
  displayAmount?: number;
  onOpenModal: (event: Event, side: Side) => void;
}

const EventsCard: React.FC<EventsCardProps> = ({
  event,
  displayAmount = 1000,
  onOpenModal,
}) => {
  const [, setSide] = useState<Side | null>(null);
  const isActive = event.status === "OPEN";

  return (
    <>
      <div className={css.card}>
        {event.imageUrl && (
          <img src={event.imageUrl} alt="event" className={css.cardImage} />
        )}
        <div className={css.header}>{event.question}</div>
        <div className={css.buttonGroup}>
          <Button
            size="small"
            color="green"
            onClick={() => {
              setSide("YES");
              onOpenModal(event, "YES");
            }}
            disabled={!isActive}
          >
            <div>
              <p>YES</p>
              <p>₦{event.yesPrice}</p>
            </div>
          </Button>
          <Button
            size="small"
            color="pink"
            onClick={() => {
              setSide("NO");
              onOpenModal(event, "NO");
            }}
            disabled={!isActive}
          >
            <div>
              <p>NO</p>
              <p>₦{event.noPrice}</p>
            </div>
          </Button>
        </div>

        <div className={css.payouts}>
          <p>1k to win ₦{calPayout(displayAmount, event.yesPrice)}</p>
          <p>1k to win ₦{calPayout(displayAmount, event.noPrice)}</p>
        </div>
        <div>
          <p>
            Amount traded: <strong>₦{event.amountTraded}</strong>
          </p>
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
    </>
  );
};

export default EventsCard;
