import type { Event, EventOptions, Side } from "../../types";
import type React from "react";
import EventsCard from "../Events/EventsCard";
import css from "./EventsList.module.scss";

interface EventListProps {
  events: Event[];
  onOpenModal: (event: Event, option: EventOptions, side: Side) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onOpenModal }) => {
  return (
    <>
      <div className={css.eventGrid}>
        {events.map((event) => (
          <>
            <EventsCard
              key={event.id}
              event={event}
              displayAmount={1000}
              onOpenModal={onOpenModal}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default EventList;
