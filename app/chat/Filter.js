import Image from "next/image";

const Filter = () => {
  return (
    <div className="h-[80vh] rounded-2xl w-[56%] bg-black text-white fixed z-[400] top-6 left-[28%] px-8 py-4 overflow-y-auto">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src="/faders.svg" height={20} width={20} alt="Filter settings icon" />
          <h1 className="font-medium tracking-tight text-lg">
            Search with advanced filters
          </h1>
        </div>
        <Image
          src="/X.svg"
          height={25}
          width={25}
          alt="Close filter modal"
          className="cursor-pointer hover:opacity-70"
        />
      </div>
      <div className="pt-4">
        <h1 className="font-semibold tracking-tight text-xl">Location</h1>
        <div className="pt-4">
          <p className="tracking-tight pb-2 text-sm">
            Brief Description of what you are looking for
          </p>
          <input
            type="text"
            className="py-3 px-6 bg-[#1a1a1a] rounded-xl w-full text-white border-none outline-none cursor-text"
          />
        </div>
        <div className="py-4 flex items-center gap-10">
          <div className="w-[80%]">
            <div className="flex pb-2 items-center gap-1">
              <Image src="/mapPin.svg" height={15} width={15} alt="Location pin icon" />
              <h1 className="text-sm">Location</h1>
            </div>
            <input
              type="text"
              className="py-3 px-6 bg-[#1a1a1a] rounded-xl w-full text-white border-none outline-none cursor-text"
            />
          </div>
          <div className="w-full">
            <div className="flex pb-2 items-center gap-1">
              <Image src="/sealCheck.svg" height={15} width={15} alt="Verification badge icon" />
              <h1 className="text-sm">Verification</h1>
            </div>
            <div className="flex items-center gap-4">
              <p
                className="py-2 px-10 rounded-full border-[1px] border-white
             inline-block text-sm cursor-pointer hover:bg-white hover:text-black transition-colors"
              >
                All
              </p>
              <p
                className="py-2 px-14 rounded-full border-[1px] border-white
             inline-block text-sm cursor-pointer hover:bg-white hover:text-black transition-colors"
              >
                Verified
              </p>
              <p
                className="py-2 px-16 rounded-full border-[1px] border-white
             inline-block text-sm cursor-pointer hover:bg-white hover:text-black transition-colors"
              >
                Un-Verified Only
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex pb-2 items-center gap-1">
          <Image src="/sortAscending.svg" height={20} width={20} alt="Sort ascending icon" />
          <h1 className="font-semibold tracking-tight text-xl">Category</h1>
        </div>
        <p className="font-medium tracking-tight text-xs pb-4 pt-2 opacity-70">
          POPULAR CATEGORIES
        </p>
        <div className="flex gap-4 pb-4">
          {["Food", "Fitness", "Tech", "Design"].map((item, index) => (
            <p
              key={index}
              className="tracking-tight px-6 py-1 border-[1px] border-white inline-block rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors"
            >
              {item}
            </p>
          ))}
        </div>
        <input
          placeholder="Browse 20+ more category"
          className="py-3 px-6 bg-[#1a1a1a] w-full tracking-tight rounded-xl text-white border-none outline-none cursor-text"
        />
      </div>
      <div className="pt-4">
        <h1 className="font-semibold tracking-tight text-xl pb-2">Audience</h1>
        <div className="flex items-center gap-10">
          <div>
            <div className="flex pb-2 items-center gap-1">
              <Image src="/mapPin.svg" height={15} width={15} alt="Location pin icon" />
              <h1 className="text-sm">Follower range</h1>
            </div>
            <div className="flex gap-4">
              <input
                placeholder="Min"
                type="text"
                className="py-3 px-6 bg-[#1a1a1a] rounded-xl text-white border-none outline-none cursor-text"
              />
              <input
                placeholder="Max"
                type="text"
                className="py-3 px-6 bg-[#1a1a1a] rounded-xl text-white border-none outline-none cursor-text"
              />
            </div>
          </div>
          <div>
            <div className="flex pb-2 items-center gap-1">
              <Image src="/sealCheck.svg" height={15} width={15} alt="Verification badge icon" />
              <h1 className="text-sm">Gender</h1>
            </div>
            <div className="flex gap-3">
              <p className="px-8 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                Any
              </p>
              <p className="px-12 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                Male
              </p>
              <p className="px-16 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                Female
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-3">
          <div>
            <div className="flex pb-2 items-center gap-1">
              <Image src="/mapPin.svg" height={15} width={15} alt="Location pin icon" />
              <h1 className="text-sm">Age range</h1>
            </div>
            <div className="flex gap-3">
              <p className="px-6 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                18y - 25y
              </p>
              <p className="px-6 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                25y - 35y
              </p>
              <p className="px-6 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                45y - 55y
              </p>
              <p className="px-6 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                55y - 65y
              </p>
              <p className="px-6 py-2 border-[1px] rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition-colors">
                65+
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="px-24 py-2 bg-white/30 rounded-full mt-4 text-sm font-medium cursor-pointer hover:bg-white/40 transition-colors">
        Apply and send
      </button>
    </div>
  );
};

export default Filter;