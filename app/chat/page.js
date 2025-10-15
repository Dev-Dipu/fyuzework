import ChatHistorySection from "@/components/ChatHistory"
import Image from "next/image"
import Link from "next/link"

const page = () => {
    return (
        <div className="h-screen w-full flex justify-between bg-[#0D0D0D] relative p-6">
            <div className="absolute top-0 left-0 h-full w-full z-0">
                <Image src="/assets/gradientEdited.svg" fill className="h-full w-full" alt="gradient" />
            </div>
            <div className="h-full bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)]  backdrop-blur-[500px] z-10 inter w-[20vw] p-6 border-[.5px] rounded-3xl flex flex-col justify-between">
                <div className="space-y-6">
                    <Image src="/assets/fyuze-logo.svg" alt="fyuze logo" height={80} width={80} />
                    <button className="text-white uppercase text-sm tracking-tighter bg-black w-full gap-2 justify-center py-3 rounded-full flex items-center">
                        <Image src="./assets/ChatCircleText.svg" height={20} width={20} alt="chatIcon" />
                        New chat
                    </button>
                    <div>
                        <ChatHistorySection />
                    </div>
                    <div>
                        <h1 className="text-white flex items-center gap-2">
                            <Image src="./assets/dashBoard.svg" height={24} width={24} alt="dashBoard" />
                            Dashboard
                        </h1>
                    </div>
                </div>
                <div>
                    <div className="space-y-4">
                        <h1 className="text-white flex items-center gap-2">
                            <Image src="./assets/settings.svg" height={24} width={24} alt="settings" />
                            Settings
                        </h1>
                        <hr />
                        <h1 className="text-white text-sm">
                            Profile
                        </h1>
                        <div className="flex items-center gap-2">
                            <Image src="/assets/profile.png" alt="profile" height={40} width={40} className="rounded-full" />
                            <div>
                                <h1 className="text-white">Jenny Wilson</h1>
                                <p className="text-xs text-gray-400">jennywilson@fyuze.com</p>
                            </div>
                        </div>
                        <button className="text-white text-sm tracking-tighter border-[.5px] w-full gap-2 justify-center py-2 rounded-full flex items-center">
                            <Image src="./assets/logOut.svg" height={20} width={20} alt="chatIcon" />
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-full w-[72vw] z-10">

            </div>
            <div className="h-full z-10 w-[8vw] flex flex-col justify-between items-end">
                <div className="flex flex-col gap-4">
                    <button>
                        <Image src="./assets/linkIcon.svg" height={50} width={50} alt="chatIcon" />
                    </button>
                    <button>
                        <Image src="./assets/linkMagnifying.svg" height={50} width={50} alt="chatIcon" />
                    </button>
                </div>
                <div className="flex flex-col gap-3 text-right">
                    <Link 
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        how it works
                    </Link>
                    <div className="relative w-[1.6vw] h-[2px] rounded-full bg-white self-end"></div>
                    <Link 
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        features
                    </Link>
                    <div className="relative w-[1.6vw] h-[2px] rounded-full bg-white self-end"></div>
                    <Link 
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        pricing
                    </Link>
                    <div className="relative w-[1.6vw] h-[2px] rounded-full bg-white self-end"></div>
                    <Link 
                        href="/"
                        className="text-white text-sm tracking-tighter uppercase w-full gap-2"
                    >
                        about
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page