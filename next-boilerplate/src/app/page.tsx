"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import TGQRCode from "./tg-qrcode.png";

const items = [
  {
    time: "15:30-17:30",
    location: "The Patio",
    title: "Open Jam 1",
    emoji: "🎸",
  },
  {
    time: "15:30-17:30",
    location: "The Patio",
    title: "Open Jam 2",
    emoji: "🎸",
  },
  {
    time: "15:30-17:30",
    location: "The Patio",
    title: "Open Jam 3",
    emoji: "🎸",
  },
  {
    time: "15:30-17:30",
    location: "The Patio",
    title: "Open Jam 4",
    emoji: "🎸",
  },
];

export default function Home() {
  return (
    <div className="flex h-full w-full flex-row gap-4 pl-44">
      <div className="flex flex-col gap-4 pt-80">
        <h1 className="max-w-2xl text-left text-[5.5rem] font-bold leading-tight tracking-tight">
          Events and Workshops 🤗
        </h1>

        <div className="mt-8 flex max-w-xl gap-8 rounded-lg bg-white p-8 ">
          <Image src={TGQRCode} alt="QR Code" />
          <div className="flex flex-col gap-2">
            <span className="text-2xl">
              Permissionlessly co-created
              <br />
              by <b>YOU</b>
            </span>
            <span className="text-xl">
              Hack the ETHBerlin experience by adding your own event via
              Telegram
            </span>
          </div>
        </div>
      </div>
      <div className="w-px bg-slate-500"></div>
      <div className="flex h-full flex-col justify-center gap-12 px-40">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              layoutId={`item-${item.title}`}
              key={`item-${item.title}`}
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

const ScheduleItem = ({ time, location, title, emoji }) => (
  <div>
    <span className="text-xl">
      {time} | {location}
    </span>
    <h2 className="max-w-xl text-left text-4xl font-bold leading-tight tracking-tight">
      {emoji} {title}
    </h2>
  </div>
);
