import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  when: z.string(),
  untilWhen: z.string(),
  location: z.string(),
});

export type Event = z.infer<typeof eventSchema>;

const eventsSchema = z.array(eventSchema);

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  });
};
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const api = axios.create({
  baseURL,
  responseType: "json",
});

const getEvents = async () => {
  return api.get("/events").then((res) => eventsSchema.parse(res.data));
};
