"use client";
import { eventMetaDataType } from "@/lib/types/global-types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function EventUpcoming({
  title,
  start,
  end,
  thumbnail,
  thumbnailAlt,
  location,
}: eventMetaDataType) {
  const [onHover, setOnHover] = useState(false);
  return (
    <Link
      href={`/events/${title}`}
      className="relative isolate flex shadow-xl flex-col justify-end overflow-hidden
       rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto "
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Image
        src={`/img/events/${thumbnail}`}
        alt={thumbnailAlt}
        width={400}
        height={400}
        className={`absolute inset-0 h-full w-full object-cover
           ${onHover && "transform scale-105"} transition-all duration-300`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-shade via-gray-900/40"></div>
      <h3 className="z-10 mt-3 mb-3 text-3xl font-bold text-white">{title}</h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <div className="flex items-start gap-3 mb-3">
          <MdDateRange className="text-white text-2xl" />
          <p>
            The event starts at {start} and finishes at
            {end}.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <FaLocationDot className="text-white " />
          <p>{location}</p>
        </div>
      </div>
    </Link>
  );
}
