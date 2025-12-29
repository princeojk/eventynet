import React from "react";
import css from "./tradeModal.module.scss";
import type { Event, Side } from "../../types";
import Button from "../Buttons/Button";

interface modalProps {
  event: Event;
  side: Side;
}

const TradeModal: React.FC<modalProps> = ({ event }) => {
  return (
    <div className={css.modalContainer}>
      <div className={css.modalContent}>
        <div className={css.eventQuestion}>
          <p>{event.question}</p>
        </div>
        <div className={css.buttonGroup}>
          <Button size="small" color="green" onClick={() => {}}>
            <div>
              <p>YES</p>
              <p>
                ₦
                {event.eventOptions.map((option) => {
                  return option.yesPrice;
                })}
              </p>
            </div>
          </Button>
          <Button size="small" color="pink" onClick={() => {}}>
            <div>
              <p>NO</p>
              <p>
                ₦
                {event.eventOptions.map((option) => {
                  return option.noPrice;
                })}
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
