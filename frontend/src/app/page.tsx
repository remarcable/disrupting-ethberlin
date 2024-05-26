"use client";

import { Event } from "@/components/Event";
import { useGetEvents } from "@/data/useGetEvents";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

import ETHBerlinLogo from "./ethBerlinLogo.svg";
import TGQRCode from "./tg-qrcode.png";

export default function Home() {
  const { data: events = [], error } = useGetEvents();

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch events", error);
    }
  }, [error]);

  return (
    <div className="flex h-full w-full flex-row items-center justify-center gap-4">
      <div className="flex w-1/2 flex-col gap-4">
        <Image
          src={ETHBerlinLogo}
          alt="ETHBerlin logo"
          width={400}
          className="mb-8 ml-2"
        />

        <h1 className="mb-4 max-w-2xl text-left text-[6rem] font-bold leading-[1.1] tracking-tight">
          Disrupting ETHBerlin
        </h1>
        <span className="max-w-xl text-2xl">
          The ETHBerlin organizers claim to value <b>decentralization</b> and{" "}
          <b>independence</b>. But why are only{" "}
          <b>few highly selected companies</b> allowed to give talks or host
          experiences? Where is the stage for hackers?!
        </span>

        <div className="mt-8 flex max-w-[650px] gap-8 rounded-lg bg-white p-6">
          <Image src={TGQRCode} alt="QR Code" className="object-contain" />

          <div className="flex flex-col justify-center gap-2">
            <span className="text-2xl font-bold">
              Be subversive – Add your event
            </span>
            <span className="max-w-xs text-xl">
              Rise up! Host your own talk, mini-workshop, discussion, music jam,
              or anything else. Just add it to this board via TG
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-full min-w-[500px] flex-col justify-center gap-12 px-8">
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              layoutId={`event-${event.id}`}
              key={`event-${event.id}`}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{
                duration: 0.6,
                type: "spring",
              }}
            >
              <Event {...event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
