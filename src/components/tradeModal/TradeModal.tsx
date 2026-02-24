import React, { useContext, useEffect, useReducer, useState } from "react";
import css from "./tradeModal.module.scss";
import type { Event, Side } from "../../types";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import { payoutReducer } from "./tradeModal.reducer";
import AccountBalance from "../AccountBalance/AccountBalance";
import DepositModal from "../../depositModal/DepositModal";
import { placetrade } from "../../api/placeTrade";
import AlertContext from "../Alerts/AlertContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

interface modalProps {
  event: Event;
  side: Side;
  onClose: () => void;
}

const TradeModal: React.FC<modalProps> = ({ event, side, onClose }) => {
  const socket = useContext(WebsocketContext);
  const alert = useContext(AlertContext);
  const [yesPrice, setYesPrice] = useState(event.yesPrice);
  const [noPrice, setNoPrice] = useState(event.noPrice);
  const price = side === "YES" ? event.yesPrice : event.noPrice;
  const [state, dispatch] = useReducer(payoutReducer, {
    selectedSide: side,
    payout: 0,
    inputPayload: 0,
    price: price,
  });
  const [depositModal, setDepositModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      console.log("Connected! (Already established)");
    }
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("onPriceChange", (data) => {
      console.log("updatePrice event ");
      if (event.id === data.body.id) {
        setYesPrice(data.body.yesPrice);
        setNoPrice(data.body.noPrice);
      }
    });

    return () => {
      console.log("unregistering events... ");
      socket.off("connect");
      socket.off("onPriceChange");
    };
  }, [event.id, socket]);

  const handleTrade = () => {
    if (state.inputPayload === 0) {
      alert?.error("Please enter an amount to place trade", 1);
      return;
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
                price: event.yesPrice,
                inputPayload: state.inputPayload,
              });
            }}
          >
            <div>
              <p>YES</p>
              <p>₦{yesPrice}</p>
            </div>
          </Button>
          <Button
            size="small"
            color="pink"
            onClick={() => {
              dispatch({
                type: "selectSide",
                selectedSide: "NO",
                price: event.noPrice,
                inputPayload: state.inputPayload,
              });
            }}
          >
            <div>
              <p>NO</p>
              <p>₦{noPrice}</p>
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
