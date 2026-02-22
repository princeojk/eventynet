import React, { useContext, useReducer, useState } from "react";
import css from "./tradeModal.module.scss";
import type { Event, EventOptions, Side } from "../../types";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import { payoutReducer } from "./tradeModal.reducer";
import AccountBalance from "../AccountBalance/AccountBalance";
import DepositModal from "../../depositModal/DepositModal";
import { placetrade } from "../../api/placeTrade";
import AlertContext from "../Alerts/AlertContext";

interface modalProps {
  event: Event;
  side: Side;
  option: EventOptions;
  onClose: () => void;
}

const TradeModal: React.FC<modalProps> = ({ event, side, option, onClose }) => {
  const alert = useContext(AlertContext);
  const price = side === "YES" ? option.yesPrice : option.noPrice;
  const [state, dispatch] = useReducer(payoutReducer, {
    selectedSide: side,
    payout: 0,
    inputPayload: 0,
    price: price,
  });
  const [depositModal, setDepositModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrade = () => {
    if (state.inputPayload === 0) {
      console.log("tk zero amount");
      alert?.error("Please enter an amount to place trade", 1);
    }

    try {
      setLoading(true);
      placetrade(event.id, state.selectedSide, price, state.inputPayload);
    } catch {
      console.error("unable to place trade");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const openDepositModal = (e: boolean) => {
    setDepositModal(e);
  };

  const handleOnClose = () => {
    setDepositModal(false);
  };

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
              dispatch({
                type: "selectSide",
                selectedSide: "YES",
                price: option.yesPrice,
                inputPayload: state.inputPayload,
              });
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
              dispatch({
                type: "selectSide",
                selectedSide: "NO",
                price: option.noPrice,
                inputPayload: state.inputPayload,
              });
            }}
          >
            <div>
              <p>NO</p>
              <p>₦{option.noPrice}</p>
            </div>
          </Button>
        </div>
        <div className={css.tradeAmount}>
          <Input
            id={"amountInput"}
            inputSize={10}
            containerSize="small"
            color="black"
            placeholder="trade amount"
            layout="horizontal"
            onChange={(e) => {
              dispatch({
                type: "calPayout",
                price: state.price,
                inputPayload: Number(e.target.value),
              });
            }}
          >
            Trade Amount:
          </Input>
        </div>
        <div className={css.payout}>
          <p>
            Potential payout if {state.selectedSide} wins: {state.payout}
          </p>
        </div>
        <div className={css.balance}>
          <AccountBalance onOpenModel={openDepositModal} />
        </div>
        <div className={css.actions}>
          <Button onClick={handleTrade} disabled={loading}>
            {loading ? "saving..." : "Trade"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
      {depositModal && (
        <div className={css.depositModal}>
          <DepositModal onClose={handleOnClose} />
        </div>
      )}
    </div>
  );
};

export default TradeModal;
