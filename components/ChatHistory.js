"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const ChatHistorySection = ({ isDark, closeDashboard, resetTrigger }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null); // Initially null, koi active nahi

    // Whenever parent signals a reset (e.g., New chat clicked), clear active index
    useEffect(() => {
        if (typeof resetTrigger !== "undefined") {
            setActiveIndex(null);
        }
    }, [resetTrigger]);

    const historyItems = [
        "Influencers near Lebanon",
        "Top 5 fitness influencers in Lebanon...",
        "Food related Influencers in India",
        "Fitness Influencers in India",
    ];

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between rounded-lg transition-colors mb-2"
            >
                <h1
                    className={`flex items-center gap-2 ${
                        isDark ? "text-white" : "text-black"
                    }`}
                >
                    <Image
                        src="./assets/chatHistory.svg"
                        height={24}
                        width={24}
                        alt="chatHistory"
                    />
                    Chat History
                </h1>
                <Image
                    className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    } ${
                        !isDark && "invert" 
                    }`}
                    src={'/CaretDown.svg'}
                    height={50}
                    width={50}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="relative pl-6">
                    <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-[#D0D5DD]"></div>

                    <div className="space-y-2 pt-3">
                        {historyItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    console.log("clicked")
                                    setActiveIndex(index)
                                    closeDashboard()
                                }} // Click par active set karo
                                className={`w-full text-left text-sm transition-colors relative`}
                            >
                                <span
                                    className={`block px-4 py-2 rounded-full truncate ${
                                        index === activeIndex
                                            ? "bg-white text-[#343434]"
                                            : `hover:bg-white hover:text-[#343434] ${
                                                  isDark
                                                      ? "text-[#C1C1C1]"
                                                      : "text-[#4F4F4F]"
                                              }`
                                    }`}
                                >
                                    {item}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHistorySection;