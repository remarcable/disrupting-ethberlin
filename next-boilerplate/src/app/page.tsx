import { Button } from "@/components/ui/button";
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
];

export default function Home() {
  return (
    <div className="flex h-full w-full flex-row gap-4 pl-44">
      <div className="flex flex-col gap-4 pt-80">
        <h1 className="max-w-2xl text-left text-[6rem] font-bold leading-tight tracking-tight">
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
        {items.map((item) => (
          <div key={item.title}>
            <span className="text-xl">
              {item.time} | {item.location}
            </span>
            <h2 className="max-w-xl text-left text-4xl font-bold leading-tight tracking-tight">
              {item.emoji} {item.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
