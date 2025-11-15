"use client";

import { ArrowDown } from "lucide-react";

export default function ValueSection() {
  return (
    <div className="bg-[#0f0f0f] rounded-3xl w-full p-6 pb-2">
      {/* ---------------- HEADER ---------------- */}
      <h2 className="text-white text-lg font-semibold mb-4 font-archivo">Value</h2>

      {/* ---------------- ROW 1 ---------------- */}
      <div className="flex flex-wrap items-stretch pb-6">
        {/* Estimated Price (Post) */}
        <div className="flex flex-col pr-8 border-r border-[#E5E9EB]">
          <p className="text-[12px] text-white mb-1">Estimated Price</p>
          <p className="text-[16px] font-semibold text-white leading-none">
            $552,000 – $1,660,000{" "}
            <span className="text-[12px] text-gray-400 font-normal">/ Post</span>
          </p>
        </div>

        {/* Estimated Price (Story) */}
        <div className="flex flex-col px-8">
          <p className="text-[12px] text-white mb-1">Estimated Price</p>
          <p className="text-[16px] font-semibold text-white leading-none">
            $25,000 – $60,000{" "}
            <span className="text-[12px] text-gray-400 font-normal">/ Story</span>
          </p>
        </div>
      </div>
      <div className="flex items-stretch pb-6 mb-6">
        {/* Cost Per Engagement */}
        <div className="flex flex-col pr-8 border-r border-[#E5E9EB]">
          <p className="text-[12px] text-white mb-1">Cost Per Engagement</p>
          <div className="flex items-center gap-2">
            <p className="text-[16px] font-semibold text-white leading-none">
              $0.17–11.16
            </p>
            <span className="text-[11px] text-green-400 font-medium px-2 py-1 border border-green-500 rounded-full leading-none">
              Excellent
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1 leading-none">
            Compared to average market values
          </p>
        </div>

        {/* EMV */}
        <div className="flex flex-col pl-8 ">
          <p className="text-[12px] text-white mb-1">EMV</p>
          <div className="flex items-center gap-1">
            <p className="text-[16px] font-semibold text-white leading-none">
              $900,000–3,000,000
            </p>
            <ArrowDown size={12} className="text-[#F76659] mt-[2px]" />
          </div>
          <p className="text-[11px] text-wrap text-gray-500 mt-1 leading-snug">
            Estimated cost to gain the same reach through paid social ad with
            similar audience. Based on est. post price you’ll get $1.7 value for
            each $1 you pay.
          </p>
        </div>
      </div>
    </div>
  );
}
