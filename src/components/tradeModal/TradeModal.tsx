import React, { useEffect, useState } from "react";
import css from "./tradeModal.module.scss";
import type { Event, EventOptions, Side } from "../../types";
import { calPayout } from "../../utils/calculatePayout";
import Button from "../Buttons/Button";
import Input from "../Input/Input";

interface modalProps {
  event: Event;
  side: Side;
  option: EventOptions;
}

const TradeModal: React.FC<modalProps> = ({ event, side, option }) => {
  const [selectedSide, setSelectedSide] = useState(side);
  const [payout, setPayout] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);

  const handleOnchange = (amount: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(Number(amount.target.value));
  };

  const displayPayout = () => {
    const price = selectedSide === "YES" ? option.yesPrice : option.noPrice;
    const payout = calPayout(inputAmount, price);
    setPayout(payout);
  };

  useEffect(displayPayout, [
    inputAmount,
    selectedSide,
    option.yesPrice,
    option.noPrice,
  ]);

  return (
    <div className={css.modalContainer}>
      <div className={css.modalContent}>
        <div className={css.eventQuestion}>
          <p>{event.question}</p>
        </div>
        <div className={css.buttonGroup}>
          <Button
            size="small"
            color="green"
            onClick={() => {
              setSelectedSide("YES");
            }}
          >
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
          <Button
            size="small"
            color="pink"
            onClick={() => {
              setSelectedSide("NO");
            }}
          >
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
        <div className={css.tradeAmount}>
          <Input
            id={"amountInput"}
            inputSize={10}
            containerSize="small"
            color="black"
            layout="horizontal"
            onChange={handleOnchange}
          >
            Trade Amount:
          </Input>
        </div>
        <div>
          <p>
            Potential payout if {selectedSide} wins: {payout}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
