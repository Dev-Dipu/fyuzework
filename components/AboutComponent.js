"use client";
import SparkleSvg2 from "./SparkleSvg2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

export default function AboutComponent() {
    const aboutCont = useRef(null);
    const inputRef = useRef(null);
    const cursorRef = useRef(null);
    const [restartSparkle, setRestartSparkle] = useState(false);
    const textMeasureRef = useRef(null);
    const scopeRef = useRef(null);
    const wrapperRef = useRef(null);

    const handlePlayAnimation = () => {
        setRestartSparkle(true);
        setTimeout(() => setRestartSparkle(false), 100);
    };

    const updateCursorPosition = (text) => {
        if (!textMeasureRef.current || !cursorRef.current || !inputRef.current)
            return;
        textMeasureRef.current.textContent = text;
        const textWidth = textMeasureRef.current.offsetWidth;
        gsap.set(cursorRef.current, {
            left: textWidth + "px",
        });
    };

    useEffect(() => {
        if (!scopeRef.current || !wrapperRef.current) return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            const text = "Travel influencers in Lebanon";

            const heading = new SplitType(
                aboutCont.current.querySelector("h3"),
                {
                    types: "words",
                }
            );
            const heading2 = new SplitType(
                aboutCont.current.querySelector("h4"),
                {
                    types: "words",
                }
            );

            // Initial states
            gsap.set(heading.words, { opacity: 0, y: 30 });
            gsap.set(".anim3-desc .desc", { opacity: 0, y: 40 });
            gsap.set(heading2.words, { opacity: 0, y: 10 });
            gsap.set(".anim4-desc .desc", { opacity: 0, y: 20 });
            gsap.set(".popup", { opacity: 0, y: 5 });
            gsap.set(".gradient", { opacity: 0, y: 30 });

            const tl = gsap.timeline({
                defaults: { 
                    ease: "power2.inOut"
                },
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    scrub: 1.5,
                    onUpdate: (self) => {
                        if (cursorRef.current) {
                            const progress = self.progress;
                            const showCursor = progress > 0.15 && progress < 0.35;
                            gsap.set(cursorRef.current, {
                                display: showCursor ? "block" : "none",
                                opacity: showCursor ? 1 : 0,
                            });
                        }
                    },
                },
            });

            // Step 1: Initial entrance - Mock elements instead of images
            tl.from(
                [".mock1", ".mock2", ".mock3", ".mock4", ".mock5", ".mock6", ".mock7", ".mock8"],
                {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut",
                },
                0
            )
                .from(".mock1", { left: "-15vw", top: "-5vh", duration: 2, ease: "power2.inOut" }, 0)
                .from(".mock2", { left: "-5vw", bottom: "-5vh", duration: 2, ease: "power2.inOut" }, 0)
                .from(".mock3", { bottom: "-50vh", left: "-10vw", duration: 2, ease: "power2.inOut" }, 0)
                .from(".mock4", { right: "-5vw", bottom: "-5vh", duration: 2, ease: "power2.inOut" }, 0)
                .from(".mock5", { right: "-10vw", bottom: "-10vh", duration: 2, ease: "power2.inOut" }, 0)
                .from(".mock6", { right: "-12vw", top: "-5vh", duration: 2, ease: "expo.inOut" }, 0)
                .from(".mock7", { right: "-20vw", top: "-10vh", duration: 2, ease: "power2.inOut" }, 0)
                .from(".mock8", { left: "-5vw", top: "-2vh", duration: 2, ease: "power2.inOut" }, 0)
                .fromTo(
                    ".content-text",
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: "power2.inOut" },
                    0.3
                );

            // Step 2: Typing animation
            const chars = { value: 0 };
            tl.to(
                chars,
                {
                    value: text.length,
                    duration: 2.5,
                    ease: "none",
                    onStart: () => handlePlayAnimation(),
                    onUpdate: () => {
                        if (inputRef.current) {
                            const currentText = text.slice(0, Math.floor(chars.value));
                            inputRef.current.placeholder = currentText;
                            updateCursorPosition(currentText);
                        }
                    },
                },
                3
            )
                .to(".mock1", { left: "-20vw", top: "-5vh", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(".mock2", { left: "-5vw", bottom: "-5vh", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(".mock3", { bottom: "-50vh", left: "-10vw", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(".mock4", { right: "-8vw", bottom: "-15vh", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(".mock5", { right: "-15vw", bottom: "-10vh", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(
                    ".mock6",
                    {
                        x: () => {
                            const mock6 = document.querySelector(".mock6");
                            if (!mock6) return 0;
                            const rect = mock6.getBoundingClientRect();
                            return window.innerWidth / 2 - rect.left - mock6.offsetWidth / 2;
                        },
                        y: () => {
                            const mock6 = document.querySelector(".mock6");
                            if (!mock6) return 0;
                            const rect = mock6.getBoundingClientRect();
                            return window.innerHeight / 2 - rect.top - mock6.offsetHeight / 2 + 40;
                        },
                        scale: 2.8,
                        duration: 3,
                        ease: "power4.inOut",
                    },
                    3
                )
                .to(".mock7", { right: "-20vw", top: "-15vh", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(".mock8", { left: "-10vw", top: "-2vh", duration: 2.5, ease: "power2.inOut" }, 3)
                .to(".content-text.heading", { y: -60, opacity: 0, duration: 2, ease: "power2.inOut" }, 3.5)
                .to(".content-text.para", { y: 60, opacity: 0, duration: 2, ease: "power2.inOut" }, 3.5)
                .to(
                    ".input-field",
                    {
                        scale: 1.2,
                        x: () => {
                            const inputField = document.querySelector(".input-field");
                            if (!inputField) return 0;
                            const rect = inputField.getBoundingClientRect();
                            return window.innerWidth / 2 - rect.left - inputField.offsetWidth / 2;
                        },
                        y: () => {
                            const inputField = document.querySelector(".input-field");
                            if (!inputField) return 0;
                            const rect = inputField.getBoundingClientRect();
                            return window.innerHeight / 4 - rect.top - inputField.offsetHeight / 2;
                        },
                        duration: 2,
                        ease: "power2.inOut",
                    },
                    3.5
                )
                .to(".ig-name", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 4);

            // Step 3: Show discovery content
            tl.to(heading.words, { y: 0, opacity: 1, duration: 2, stagger: 0.25, ease: "power3.inOut" }, 4.2)
                .to(".popup", { y: 0, opacity: 1, duration: 1.8, stagger: 0.25, ease: "power3.inOut" }, 4.2)
                .to(".anim3-desc .desc", { y: 0, opacity: 1, duration: 1.8, stagger: 0.25, ease: "power3.inOut" }, 4.4)
                .to(".gradient", { opacity: 1, duration: 2, ease: "power2.inOut" }, 4.6);

            // Step 4: Transition to precision match
            tl.to(".anim3-heading", { y: "-25vh", opacity: 0, filter: "blur(6px)", duration: 2, ease: "power2.inOut" }, 7)
                .to(".anim3-desc", { y: "-50vh", filter: "blur(6px)", opacity: 0, duration: 2, ease: "power2.inOut" }, 7.5)
                .to(".anim3-gradient", { y: "-5vh", opacity: 0, duration: 2, ease: "power2.inOut" }, 7)
                .to(".input-field", { filter: "blur(6px)", opacity: 0, duration: 1.5, ease: "power2.inOut" }, 7)
                .to([".popup.one", ".popup.two", ".popup.three"], { filter: "blur(6px)", opacity: 0, duration: 1.5, stagger: 0.2, ease: "power2.inOut" }, 7)
                .to(".popup.four", { y: "10vh", x: "-20.8vw", duration: 2, ease: "power2.inOut" }, 8)
                .to(
                    ".mock6",
                    {
                        x: () => {
                            const currentX = gsap.getProperty(".mock6", "x");
                            return currentX - window.innerWidth * 0.1;
                        },
                        y: () => {
                            const currentY = gsap.getProperty(".mock6", "y");
                            return currentY - window.innerHeight * 0.05;
                        },
                        duration: 2,
                        ease: "power2.inOut",
                    },
                    8
                )
                .to(".mock-gradient", { scale: 1.8, duration: 2, ease: "power2.inOut" }, 8)
                .to(heading2.words, { y: 0, opacity: 1, duration: 2, stagger: 0.25, ease: "power3.inOut" }, 8.1)
                .to(".anim4-desc .desc", { y: 0, opacity: 1, duration: 2, stagger: 0.25, ease: "power3.inOut" }, 8.1)
                .to(".mock8", { left: "-2vw", top: "10vh", filter: "blur(4px)", duration: 2, ease: "power3.inOut" }, 8)
                .to(".mock3", { left: "20vw", bottom: "-30vh", scale: 0.5, filter: "blur(4px)", duration: 2, ease: "power3.inOut" }, 8)
                .to(".mock4", { right: "15vw", bottom: "-2vh", filter: "blur(4px)", duration: 2, ease: "power3.inOut" }, 8)
                .to(".mock5", { right: "-3vw", top: "-2vh", filter: "blur(4px)", duration: 2, ease: "power3.inOut" }, 8)
                .to(".mock7", { right: "-20vw", top: "-6vh", filter: "blur(4px)", duration: 2, ease: "power3.inOut" }, 8)
                .from(".chat-logo", { scale: 0, opacity: 0, duration: 1.5, ease: "back.out(1.7)" }, 8.2)
                .from(".chat-bubble", { x: -100, y: -20, scale: 0.2, opacity: 0, duration: 2, ease: "power3.inOut" }, 8.3);

            // Step 5: Exit animations
            tl.to(".mock6", { y: "-100vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10.5)
                .to(".anim4-heading", { y: "-100vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".anim4-desc", { y: "-100vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10.2)
                .to([".chat-logo", ".chat-bubble"], { y: "-100vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10.3)
                .to(".popup.four", { y: "-100vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10.5)
                .to(".mock1", { left: "-25vw", top: "-15vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".mock2", { left: "-15vw", bottom: "-15vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".mock3", { bottom: "-60vh", left: "-20vw", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".mock4", { right: "-15vw", bottom: "-25vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".mock5", { right: "-20vw", bottom: "-20vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".mock7", { right: "-30vw", top: "-20vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10)
                .to(".mock8", { left: "-15vw", top: "-12vh", opacity: 0, duration: 2.5, ease: "power2.inOut" }, 10);
        }, scopeRef);

        return () => ctx.revert();
    }, []);

    // Cursor blinking animation
    useEffect(() => {
        if (!scopeRef.current || !cursorRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }, scopeRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full h-[500vh] bg-transparent" ref={wrapperRef}>
            <div
                className="w-full h-screen sticky top-0 overflow-hidden flex items-center justify-center text-dark-black"
                ref={aboutCont}
            >
                <div
                    ref={scopeRef}
                    className="w-full h-full absolute top-0 left-0 flex items-center justify-center"
                >
                    <div className="relative w-[40%] flex flex-col gap-14 -top-14">
                        <div className="text-[2.5vw] leading-[3vw] font-archivo font-[100] content-text heading z-10">
                            <div className="w-[5.8vw] h-[2.8vw] relative inline-block">
                                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                    LOGO
                                </div>
                            </div>
                            <span className="ml-2">
                                Helps from discovery to ROI fully automated,
                                fully optimized.
                            </span>
                        </div>
                        <div className="relative w-7/12 ml-auto bg-white border border-gray-600 rounded-full flex items-center justify-center p-3 font-[300] text-sm content-text input-field z-50">
                            <SparkleSvg2 restart={restartSparkle} />
                            <div className="relative w-full ml-3">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder=""
                                    className="w-full relative bg-transparent border-none outline-none"
                                />
                                <span
                                    ref={textMeasureRef}
                                    className="absolute top-0 left-0 opacity-0 pointer-events-none whitespace-nowrap"
                                    style={{
                                        fontSize: "inherit",
                                        fontFamily: "inherit",
                                        fontWeight: "inherit",
                                    }}
                                ></span>
                                <span
                                    ref={cursorRef}
                                    className="absolute top-0 left-0 w-[1px] h-full bg-black"
                                ></span>
                            </div>
                        </div>
                        <p className="text-sm font-[300] text-gray-500 leading-[100%] content-text para z-10">
                            Ask FYUZE AI to fetch a real-time, curated list of
                            influencers based on your niche, audience, and
                            campaign goals so you save time, money, and effort.
                        </p>
                    </div>
                    
                    {/* Mock elements replacing images */}
                    <div className="w-full h-full absolute z-20 top-0 left-0 pointer-events-none">
                        {/* Mock 1 - Large rectangle */}
                        <div className="w-[12vw] h-[18vw] absolute top-[11vh] left-[-6vw] rounded-[56px] overflow-hidden mock1 bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                                MOCK 1
                            </div>
                        </div>
                        
                        {/* Mock 2 - Small square */}
                        <div className="w-[4.2vw] h-[6.2vw] z-10 absolute bottom-[20vh] left-[8vw] rounded-2xl overflow-hidden mock2 bg-gradient-to-br from-green-400 to-blue-500 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                                MOCK 2
                            </div>
                        </div>
                        
                        {/* Mock 3 - Large vertical */}
                        <div className="w-[21vw] h-[26vw] absolute -bottom-[19vh] left-[35.5vw] rounded-[32px] overflow-hidden mock3 bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                MOCK 3
                            </div>
                        </div>
                        
                        {/* Mock 4 - Medium vertical */}
                        <div className="w-[6.3vw] h-[10vw] absolute bottom-[1.5vh] right-[20vw] rounded-[28px] overflow-hidden mock4 bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                                MOCK 4
                            </div>
                        </div>
                        
                        {/* Mock 5 - Medium rectangle */}
                        <div className="w-[10vw] h-[14vw] absolute bottom-[24vh] -right-[6vw] rounded-[32px] overflow-hidden mock5 bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-md">
                                MOCK 5
                            </div>
                        </div>
                        
                        {/* Mock 6 - Main focus element */}
                        <div className="w-[7.2vw] h-[11.5vw] absolute top-[14vh] right-[11vw] rounded-[20px] overflow-hidden mock6 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl">
                            <div className="w-full h-full relative overflow-hidden rounded-[20px]">
                                <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm z-40">
                                    MAIN MOCK
                                </div>
                                <div
                                    className="absolute h-4 w-full -top-10 left-1/2 -translate-x-1/2 z-[100] glass"
                                    style={{ isolation: "isolate" }}
                                >
                                    <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-full"></div>
                                </div>
                            </div>
                            <div className="mock-gradient absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-50"></div>
                            <p className="text-[5px] opacity-0 font-medium absolute bottom-[10px] left-[10px] text-white z-100 ig-name">
                                @Nick travels
                            </p>
                        </div>
                        
                        {/* Mock 7 - Small square */}
                        <div className="w-[4.2vw] h-[6.2vw] absolute -top-[2.8vh] left-[60vw] rounded-2xl overflow-hidden mock7 bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                                MOCK 7
                            </div>
                        </div>
                        
                        {/* Mock 8 - Quote style */}
                        <div className="w-[9.5vw] h-[16vw] absolute top-[19vh] left-[14vw] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 mock8 shadow-lg">
                            <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-lg">
                                "QUOTE"
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute top-0 w-11/12 mx-auto h-screen border-black gradient anim3-gradient">
                        <div className="w-full h-full -bottom-[10vh] absolute">
                            <div className="w-full h-full bg-gradient-to-b from-blue-100/50 to-transparent"></div>
                        </div>
                    </div>
                    
                    <div className="w-[88%] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center h-[40vh] z-40 pointer-events-auto">
                        <div className="h-full relative w-3/12 anim3-heading">
                            <h3 className="text-[2.6vw] leading-[3vw] font-bold font-archivo w-10/12">
                                Discover the Right Voices
                            </h3>
                        </div>
                        <div className="w-6/12 relative h-[40vh] z-100 flex items-center justify-center flex-col">
                            <div className="absolute popup one right-[5vw] top-1/8 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-2xl p-[10px] z-50 w-[14vw] rounded-2xl overflow-hidden border border-white/30">
                                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                                <span className="font-medium text-[0.9vw] text-dark-black">
                                    Reach : 2 Million
                                </span>
                            </div>
                            <div className="absolute popup two left-[4vw] top-3/8 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-2xl p-[10px] w-[11vw] rounded-2xl overflow-hidden border border-white/30">
                                <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                                <span className="font-medium text-[0.9vw] text-dark-black">
                                    140k Followers
                                </span>
                            </div>
                            <div className="absolute popup four right-[4vw] top-[55%] flex items-center justify-center gap-2 p-[10px] min-w-[14vw] rounded-[20px] overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
                                <div className="w-5 h-5 bg-white rounded-full"></div>
                                <span className="font-[500] text-[0.9vw] leading-[2vw] text-white">
                                    FYUZE Score :
                                    <span className="text-[1.3vw] leading-[1.3vw]">
                                        90
                                    </span>
                                    /100
                                </span>
                            </div>
                            <div className="absolute popup three left-[6vw] top-[85%] flex justify-center items-start gap-2  p-[10px] pl-[17px] w-[15.5vw] rounded-[20px] overflow-hidden bg-white/20 backdrop-blur-2xl border border-white/30">
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                <span className="font-[500] text-[0.9vw] leading-[1.2vw] text-dark-black">
                                    Worked with more that 50 brands, with 75%
                                    ROI.
                                </span>
                            </div>
                        </div>
                        <div className="top-[9vh] text-[0.85vw] left-[2vw] w-3/12 leading-[120%] text-gray-500 anim3-desc font-[300] relative ">
                            <p className="opacity-0 desc">
                                Search millions of creators in seconds using
                            </p>
                            <p className="opacity-0 desc">
                                AI-powered filters:
                                <span className="font-medium">
                                    audience authenticity,
                                </span>
                            </p>
                            <p className="font-medium  desc opacity-0">
                                geo-verification, sentiment, engagement
                            </p>
                            <p className="font-medium desc opacity-0">
                                quality, niche fit, and more.
                            </p>
                        </div>
                    </div>
                    
                    <div className="absolute w-8/12 h-[60vh] flex  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <div className="relative left-0 top-0 w-1/2 h-full"></div>
                        <div className="relative w-1/2 h-full flex items-center justify-center">
                            <div className="flex items-center justify-center flex-col gap-5 w-[55%] relative">
                                <div className="relative anim4-heading w-full">
                                    <h4 className="text-[2.6vw] leading-[3.2vw] font-bold font-archivo">
                                        Match with Precision
                                    </h4>
                                </div>
                                <div className="text-[0.85vw] leading-[120%] w-full text-gray-500 anim4-desc font-[300]">
                                    <p className="opacity-0 desc">
                                        Our proprietary FYUZE Score™ ranks
                                    </p>
                                    <p className="opacity-0 desc">
                                        influencers by projected ROI, audience trust,
                                    </p>
                                    <p className="desc opacity-0">
                                        and contextual brand alignment —
                                        <span className="font-medium">
                                            so you
                                        </span>
                                    </p>
                                    <p className="font-medium desc opacity-0">
                                        know who's truly worth it.
                                    </p>
                                </div>
                                <div className="chat-popup flex justify-center w-full relative mt-2">
                                    <div className="w-2/12 chat-logo relative">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 relative flex items-center justify-center shadow-lg">
                                            <div className="w-4 h-4 bg-white rounded-sm"></div>
                                        </div>
                                    </div>
                                    <div className="chat-bubble bg-white/40 backdrop-blur-3xl relative flex items-center justify-center py-3 px-3 rounded-tl-sm rounded-xl w-[80%] border border-white/50 shadow-lg">
                                        <p className="text-sm text-[#383838] w-10/12 leading-[120%]">
                                            I've found the right influencer for you. Ready to launch
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}