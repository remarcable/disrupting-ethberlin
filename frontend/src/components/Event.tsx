import { type Event as EventType } from "@/data/useGetEvents";

export const Event: React.FC<EventType> = ({
  when,
  untilWhen,
  location,
  title,
}) => (
  <div>
    <span className="text-xl">
      {when} - {untilWhen} @ {location}
    </span>
    <h2 className="max-w-xl text-left text-4xl font-bold leading-tight tracking-tight">
      {title}
    </h2>
  </div>
);
