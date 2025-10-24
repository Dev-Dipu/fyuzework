"use client";
import Image from "next/image";
import React from "react";
import { Trash2 } from "lucide-react";

const mockData = [
  {
    name: "Olivia Rhye",
    username: "@olivia",
    followers: "312 K",
    location: "Mumbai, India",
    email: "olivia@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Phoenix Baker",
    username: "@phoenix",
    followers: "324 K",
    location: "Mumbai, India",
    email: "phoenix@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Lana Steiner",
    username: "@lana",
    followers: "412 K",
    location: "Mumbai, India",
    email: "lana@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Demi Wilkinson",
    username: "@demi",
    followers: "752 K",
    location: "Mumbai, India",
    email: "demi@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Candice Wu",
    username: "@candice",
    followers: "232 K",
    location: "Mumbai, India",
    email: "candice@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Natali Craig",
    username: "@natali",
    followers: "2.3 M",
    location: "Mumbai, India",
    email: "natali@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Drew Cano",
    username: "@drew",
    followers: "2.3 M",
    location: "Mumbai, India",
    email: "drew@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Orlando Diggs",
    username: "@orlando",
    followers: "2.3 M",
    location: "Mumbai, India",
    email: "orlando@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Andi Lane",
    username: "@andi",
    followers: "2.3 M",
    location: "Mumbai, India",
    email: "andi@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
  {
    name: "Kate Morrison",
    username: "@kate",
    followers: "2.3 M",
    location: "Mumbai, India",
    email: "kate@untitledui.com",
    categories: ["Design", "Product", "Marketing"],
  },
];

const DashboardComponent = () => {
  return (
    <div className="h-full relative text-white w-[72vw] z-20 flex flex-col pl-12 font-archivo">
      {/* Header */}
      <h1 className="text-5xl font-semibold">Dashboard</h1>

      {/* Sub Header */}
      <div className="text-[#C5C5C5] flex items-center gap-5 mt-12">
        <h4 className="text-white font-medium">Wishlisted Influencers</h4>
        <span>|</span>
        <div className="flex h-fit items-center gap-1 cursor-pointer hover:text-white transition">
          <Image height={20} width={20} src="/faders.svg" alt="filters" />
          <h4 className="text-base font-medium text-[#C5C5C5]">Filters</h4>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 absolute top-1/7 w-[105%] h-3/4 bg-[#060606] rounded-xl overflow-hidden flex flex-col">

        <div className="grid grid-cols-[1.8fr_0.8fr_1.2fr_1.8fr_2fr_0.8fr_0.2fr] px-6 py-3 text-white text-sm border-b border-[#6E6E6E]">
          <div>Name</div>
          <div className="flex items-center gap-2">
            Followers
            <Image src="/arrow-down.svg" width={10} height={10} alt="sort" />
          </div>
          <div>Location</div>
          <div>Email address</div>
          <div>Category</div>
          <div></div>
          <div></div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1E1E1E] scrollbar-track-transparent">
          {mockData.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.8fr_0.8fr_1.2fr_1.8fr_2fr_0.8fr_0.2fr] px-6 py-4 items-center border-b border-[#6E6E6E] hover:bg-[#141414] transition"
            >

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1E1E1E] flex items-center justify-center overflow-hidden">
                  <Image
                    src={`/avatars/${index + 1}.png`}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm">{user.username}</p>
                </div>
              </div>

              <div className="">{user.followers}</div>

              <div className="">{user.location}</div>

              <div className="">{user.email}</div>

              <div className="flex flex-wrap gap-2">
                {user.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs border border-[#fff] rounded-full px-2 py-1"
                  >
                    {cat}
                  </span>
                ))}
                <span className="text-xs border border-[#fff] rounded-full px-2 py-1">
                  +4
                </span>
              </div>

              <div className="text-[#FF6B3A] text-sm font-medium cursor-pointer hover:underline">
                OPEN CHAT
              </div>

              <div className="cursor-pointer hover:text-[#FF4500] transition">
                <Trash2 size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
