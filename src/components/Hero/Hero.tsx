import css from "./Hero.module.scss";
import type { Event, Side } from "../../types";
import EventList from "../EventsList/EventsList";
import { useContext, useEffect, useState } from "react";
import TradeModal from "../tradeModal/TradeModal";
import ProtectedRoute from "../../ProtectedRoute";
import Alert from "../Alerts/alert";
import { getOpenEvents } from "../../api/getOpenEvents";
import { WebsocketContext } from "../../contexts/WebsocketContext";

function Hero() {
  const [modalData, setModalData] = useState<{
    event: Event | null;
    side: Side | null;
  }>({ event: null, side: null });
  const [events, setEvents] = useState<Event[]>();
  const socket = useContext(WebsocketContext);

  const openTradeModal = (event: Event, side: Side) => {
    setModalData({ event, side });
  };

  const closeTradeModal = () => {
    setModalData({ event: null, side: null });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getOpenEvents();
      setEvents(events);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (socket.connected) {
      console.log("Connected! (Already established)");
    }
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("onPriceChange", (data) => {
      if (!events) {
        return;
      }
      const updatedEventPrice: Event[] = events.map((event) => {
        if (data.body.id === event.id) {
          event.noPrice = data.body.noPrice;
          event.yesPrice = data.body.yesPrice;
          return event;
        }
        return event;
      });
      setEvents(updatedEventPrice);
    });

    return () => {
      console.log("unregistering events... ");
      socket.off("connect");
      socket.off("onPriceChange");
    };
  }, [events, socket]);

  return (
    <>
      <div className={css.heroContainer}>
        <div className={css.eventsList}>
          <EventList events={events} onOpenModal={openTradeModal} />
        </div>
        <Alert />
        {modalData.event && modalData.side && (
          <ProtectedRoute>
            <TradeModal
              event={modalData.event}
              side={modalData.side}
              onClose={closeTradeModal}
            />
          </ProtectedRoute>
        )}
      </div>
    </>
  );
}

export default Hero;
