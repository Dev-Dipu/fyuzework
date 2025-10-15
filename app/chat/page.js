import ChatHistorySection from "@/components/ChatHistory";
import Image from "next/image";
import Link from "next/link";

const page = () => {
    return (
        <div className="h-screen w-full flex justify-between bg-[#0D0D0D] relative p-6">
            <div className="absolute top-0 left-0 h-full w-full z-0">
                <Image
                    src="/assets/gradientEdited.svg"
                    fill
                    className="h-full w-full"
                    alt="gradient"
                />
            </div>
            <div className="h-full bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)]  backdrop-blur-[500px] z-10 inter w-[20vw] p-6 border-[.5px] rounded-3xl flex flex-col justify-between">
                <div className="space-y-6">
                    <Image
                        src="/assets/fyuze-logo.svg"
                        alt="fyuze logo"
                        height={80}
                        width={80}
                    />
                    <button className="text-white uppercase text-sm tracking-tighter bg-black w-full gap-2 justify-center py-3 rounded-full flex items-center">
                        <Image
                            src="./assets/ChatCircleText.svg"
                            height={20}
                            width={20}
                            alt="chatIcon"
                        />
                        New chat
                    </button>
                    <div>
                        <ChatHistorySection />
                    </div>
                    <div>
                        <h1 className="text-[#E2E1DC] flex items-center gap-2">
                            <Image
                                src="./assets/dashBoard.svg"
                                height={24}
                                width={24}
                                alt="dashBoard"
                            />
                            Dashboard
                        </h1>
                    </div>
                </div>
                <div>
                    <div className="space-y-4">
                        <h1 className="text-white flex items-center gap-2">
                            <Image
                                src="./assets/settings.svg"
                                height={24}
                                width={24}
                                alt="settings"
                            />
                            Settings
                        </h1>
                        <hr />
                        <h1 className="text-white text-sm">Profile</h1>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/profile.png"
                                alt="profile"
                                height={40}
                                width={40}
                                className="rounded-full"
                            />
                            <div>
                                <h1 className="text-white">Jenny Wilson</h1>
                                <p className="text-xs text-[#C1C1C1]">
                                    jennywilson@fyuze.com
                                </p>
                            </div>
                        </div>
                        <button className="text-white text-sm tracking-tighter border-[.5px] w-full gap-2 justify-center py-2 rounded-full flex items-center">
                            <Image
                                src="./assets/logOut.svg"
                                height={20}
                                width={20}
                                alt="chatIcon"
                            />
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-full relative text-white w-[72vw] z-10 flex items-center justify-center">
                <div className="flex flex-col justify-center items-center font-[inter]">
                    <Image
                        className="invert"
                        height={1}
                        width={30}
                        src={"/MONOGRAM.svg"}
                        alt="logo"
                    />
                    <h3 className="text-3xl font-archivo font-semibold mt-2">
                        Ask Fyuze to find your next Influencer
                    </h3>
                    <p className="w-[56%] text-center text-sm leading-tight mt-5">
                        AI-powered influencer discovery that filters by niche,
                        authenticity & ROI so you spend less time searching and
                        more time growing.
                    </p>
                    <div className="w-[70%] flex gap-5 mt-8 font-light">
                        {[
                            {
                                img: "/starsgroup.svg",
                                text: "Find top 10 influencers on Instagram in Dubai",
                            },
                            {
                                img: "/usermark.svg",
                                text: "Help me with crypto launch campaign",
                            },
                            {
                                img: "/crossHair.svg",
                                text: "Find fashion influencers who speak french",
                            },
                        ].map((card, index) => (
                            <div
                                key={index}
                                className="w-1/3 px-6 py-4 rounded-4xl 
                 bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)]
                 border border-transparent 
                 [border-image-source:linear-gradient(348.51deg,#ffffff_-7.6%,rgba(255,255,255,0)_49.58%),linear-gradient(159.89deg,#ffffff_2.13%,rgba(255,255,255,0)_10.38%)]
                 backdrop-blur-[500px]"
                            >
                                <Image
                                    height={1}
                                    width={20}
                                    src={card.img}
                                    alt="icon"
                                />
                                <p className="text-sm mt-1.5 leading-tight">
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-4/5 bottom-0 pointer-events-auto absolute" style={{ willChange: "opacity, transform" }}>
                                <div className="absolute w-full bg-[#060606] h-20 -translate-y-10 rounded-4xl flex justify-end px-6 py-2.5 font-[inter] font-medium">
                                    <div className="flex h-fit items-center gap-1">
                                        <Image height={1} width={20} src={'/faders.svg'} alt="faders" />
                                        <h4 className="text-base font-medium text-[#C5C5C5]">Search with advanced filters</h4>
                                    </div>
                                </div>
                                <input
                                  type="text"
                                  placeholder="Ask for... Food related Influencers in India"
                                  className="w-[70%] h-full absolute z-90 outline-none text-white  placeholder:text-[#5D5D5D] placeholder:font-[inter] ml-20"
                                  style={{ willChange: "opacity, transform" }}
                                />
                                <div className="relative bg-[#0D0D0D] w-full flex-between p-5 h-full rounded-[28px] backdrop-blur-[120px] z-80" style={{ willChange: "opacity, filter, transform" }}>
                                    <div className="">
                                        <Image className="" height={1} width={40} src={'/circlemonologo.svg'} alt="logo" />
                                    </div>
                                    <div className="w-px h-4 absolute left-18 z-20 bg-white"></div>
                                  <div className="flex-center relative gap-3" style={{ willChange: "opacity, transform" }}>
                                    <div className="relative flex-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition" style={{ willChange: "opacity, transform" }}>
                                      <div className="relative w-5 h-5" style={{ willChange: "opacity, transform" }}>
                                        <Image
                                          src="/assets/clip.svg"
                                          alt="logo"
                                          fill
                                          className="object-contain"
                                          style={{ willChange: "opacity, transform" }}
                                        />
                                      </div>
                                    </div>
                                    <div className="relative flex-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition" style={{ willChange: "opacity, transform" }}>
                                      <div className="relative w-5 h-5" style={{ willChange: "opacity, transform" }}>
                                        <Image
                                          src="/assets/arrow.svg"
                                          alt="logo"
                                          fill
                                          className="object-contain"
                                          style={{ willChange: "opacity, transform" }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full absolute top-0 left-0 overflow-hidden custom-border h-full z-90 pointer-events-none" style={{ willChange: "opacity, transform" }}></div>
                              </div>
            </div>
            <div className="h-full z-10 w-[8vw] flex flex-col justify-between items-end">
                <div className="flex flex-col gap-4">
                    <button>
                        <Image
                            src="./assets/linkIcon.svg"
                            height={50}
                            width={50}
                            alt="chatIcon"
                        />
                    </button>
                    <button>
                        <Image
                            src="./assets/linkMagnifying.svg"
                            height={50}
                            width={50}
                            alt="chatIcon"
                        />
                    </button>
                </div>
                <div className="flex flex-col gap-3 text-right font-[inter]">
                    <Link
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        how it works
                    </Link>
                    <div className="relative w-[1.5vw] h-[0.01vw] rounded-full bg-white self-end"></div>
                    <Link
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        features
                    </Link>
                    <div className="relative w-[1.5vw] h-[0.01vw] rounded-full bg-white self-end"></div>
                    <Link
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        pricing
                    </Link>
                    <div className="relative w-[1.5vw] h-[0.01vw] rounded-full bg-white self-end"></div>
                    <Link
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        about
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;
