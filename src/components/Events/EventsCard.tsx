import type React from "react";
import { useState } from "react";
import type { Event, Side, EventOptions } from "../../types";
import Button from "../Buttons/Button";
import css from "./EventsCard.module.scss";
import { calPayout } from "../../utils/calculatePayout";
interface EventsCardProps {
  event: Event;
  displayAmount?: number;
  onOpenModal: (event: Event, option: EventOptions, side: Side) => void;
}

const EventsCard: React.FC<EventsCardProps> = ({
  event,
  displayAmount = 1000,
  onOpenModal,
}) => {
  const [, setSide] = useState<Side | null>(null);
  const [option, setOption] = useState<EventOptions | null>(null);
  const [, setIsModalOpen] = useState(false);
  const isActive = event.status === "OPEN";

  return (
    <>
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
                    setIsModalOpen(true);
                    onOpenModal(event, option, "YES");
                  }}
                  disabled={!isActive}
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
                    setIsModalOpen(true);
                    onOpenModal(event, option, "NO");
                  }}
                  disabled={!isActive}
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
