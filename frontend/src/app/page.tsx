"use client";

import { useGetEvents } from "@/data/useGetEvents";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

import TGQRCode from "./tg-qrcode.png";

export default function Home() {
  const { data: events = [], error } = useGetEvents();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch events", error);
    }
  }, [error]);

  return (
    <div className="flex h-full w-full flex-row gap-4 pl-44">
      <div className="flex flex-col gap-4 pt-56">
        <h1 className="max-w-2xl text-left text-[5.5rem] font-bold leading-[1.1] tracking-tight">
          Events and Workshops
        </h1>
        <span className="max-w-xl text-2xl">
          The ETHBerlin organizers say they value <b>decentralization</b> and{" "}
          <b>independence</b>. But why are only a{" "}
          <b>few highly selected companies</b> allowed to give talks or host
          experiences? Where is the stage for hackers?!
        </span>

        <div className="mt-8 flex max-w-xl gap-8 rounded-lg bg-white p-8 ">
          <Image src={TGQRCode} alt="QR Code" className="object-contain" />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">
              Be subversive – Add your event
            </span>
            <span className="text-xl">
              Rise up! – Hack the ETHBerlin experience by hosting your own talk,
              mini-workshop, discussion, music jam, or anything else. Just add
              it to this board via TG
            </span>
          </div>
        </div>
      </div>
      <div className="w-px bg-slate-500"></div>
      <div className="flex h-full flex-col justify-center gap-12 px-40">
        <AnimatePresence mode="popLayout">
          {events.map((item) => (
            <motion.div
              layoutId={`item-${item.id}`}
              key={`item-${item.id}`}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{
                duration: 0.6,
                type: "spring",
              }}
            >
              <ScheduleItem {...item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const ScheduleItem = ({ when, untilWhen, location, title }) => (
  <div>
    <span className="text-xl">
      {when} - {untilWhen} @ {location}
    </span>
    <h2 className="max-w-xl text-left text-4xl font-bold leading-tight tracking-tight">
      {title}
    </h2>
  </div>
);
