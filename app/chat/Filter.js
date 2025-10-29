import Image from "next/image";

const Filter = ({isFilterOpen}) => {
  return (
    <div className={`${isFilterOpen ? '' : 'hidden'}`}>
      <div className="h-[90vh] sm:h-[85vh] md:h-[80vh] rounded-2xl w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[56%] bg-black text-white fixed z-[400] top-[5vh] sm:top-6 left-[2.5%] sm:left-[5%] md:left-[10%] lg:left-[15%] xl:left-[28%] px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 overflow-y-auto">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-2 pb-2 sm:pb-3">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <Image 
            src="/faders-in.svg" 
            height={16} 
            width={16} 
            alt="Filter settings icon"
            className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]"
          />
          <h1 className="font-medium tracking-tight text-sm sm:text-base md:text-lg">
            Search with advanced filters
          </h1>
        </div>
        <Image
          src="/X.svg"
          height={20}
          width={20}
          alt="Close filter modal"
          className="cursor-pointer hover:opacity-70 w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
        />
      </div>

      {/* Location Section */}
      <div className="pt-2 sm:pt-3">
        <h1 className="font-semibold tracking-tight text-base sm:text-lg md:text-xl">Location</h1>
        <div className="pt-2 sm:pt-3">
          <p className="tracking-tight pb-1.5 text-[10px] sm:text-xs">
            Brief Description of what you are looking for
          </p>
          <input
            type="text"
            className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-xs sm:text-sm text-white border-none outline-none"
            placeholder="Enter description..."
          />
        </div>

        {/* Location & Verification Row */}
        <div className="py-2 sm:py-3 md:py-4 flex flex-col lg:flex-row items-start lg:items-end gap-3 sm:gap-4 lg:gap-6">
          {/* Location Input */}
          <div className="w-full lg:w-[55%]">
            <div className="flex pb-1.5 items-center gap-1">
              <Image 
                src="/map-pin.svg" 
                height={13} 
                width={13} 
                alt="Location pin icon"
                className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
              />
              <h1 className="text-[10px] sm:text-xs">Location</h1>
            </div>
            <input
              type="text"
              className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-xs sm:text-sm text-white border-none outline-none"
              placeholder="Enter location..."
            />
          </div>

          {/* Verification Buttons */}
          <div className="w-full lg:w-[45%]">
            <div className="flex pb-1.5 items-center gap-1">
              <Image 
                src="/sealCheck.svg" 
                height={13} 
                width={13} 
                alt="Verification badge icon"
                className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
              />
              <h1 className="text-[10px] sm:text-xs">Verification</h1>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <p className="py-1 sm:py-1.5 px-3 sm:px-5 md:px-7 rounded-full border-[1px] border-white text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors">
                All
              </p>
              <p className="py-1 sm:py-1.5 px-4 sm:px-6 md:px-9 rounded-full border-[1px] border-white text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors">
                Verified
              </p>
              <p className="py-1 sm:py-1.5 px-3 sm:px-5 md:px-7 rounded-full border-[1px] border-white text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                Un-Verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="pt-2 sm:pt-3">
        <div className="flex pb-1.5 items-center gap-1">
          <Image 
            src="/sort-asc.svg" 
            height={16} 
            width={16} 
            alt="Sort ascending icon"
            className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
          />
          <h1 className="font-semibold tracking-tight text-base sm:text-lg md:text-xl">Category</h1>
        </div>
        <p className="font-medium tracking-tight text-[9px] sm:text-[10px] pb-2 pt-1 opacity-70">
          POPULAR CATEGORIES
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-2 sm:pb-3">
          {["Food", "Fitness", "Tech", "Design"].map((item, index) => (
            <p
              key={index}
              className="tracking-tight px-3 sm:px-4 md:px-5 py-0.5 sm:py-1 border-[1px] border-white rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors"
            >
              {item}
            </p>
          ))}
        </div>
        <input
          placeholder="Browse 20+ more category"
          className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#1a1a1a] w-full tracking-tight rounded-lg sm:rounded-xl text-xs sm:text-sm text-white border-none outline-none"
        />
      </div>

      {/* Audience Section */}
      <div className="pt-2 sm:pt-3">
        <h1 className="font-semibold tracking-tight text-base sm:text-lg md:text-xl pb-2 sm:pb-3">Audience</h1>
        
        {/* Follower Range & Gender Row */}
        <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
          {/* Follower Range */}
          <div className="w-full lg:w-1/2">
            <div className="flex pb-1.5 items-center gap-1">
              <Image 
                src="/map-pin.svg" 
                height={13} 
                width={13} 
                alt="Location pin icon"
                className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
              />
              <h1 className="text-[10px] sm:text-xs">Follower range</h1>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <input
                placeholder="Min"
                type="text"
                className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-xs sm:text-sm text-white border-none outline-none"
              />
              <input
                placeholder="Max"
                type="text"
                className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-xs sm:text-sm text-white border-none outline-none"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="w-full lg:w-1/2">
            <div className="flex pb-1.5 items-center gap-1">
              <Image 
                src="/sealCheck.svg" 
                height={13} 
                width={13} 
                alt="Verification badge icon"
                className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
              />
              <h1 className="text-[10px] sm:text-xs">Gender</h1>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <p className="px-4 sm:px-6 py-1 sm:py-1.5 border-[1px] rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors">
                Any
              </p>
              <p className="px-5 sm:px-8 py-1 sm:py-1.5 border-[1px] rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors">
                Male
              </p>
              <p className="px-5 sm:px-8 py-1 sm:py-1.5 border-[1px] rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors">
                Female
              </p>
            </div>
          </div>
        </div>

        {/* Age Range */}
        <div className="pt-3 sm:pt-4">
          <div className="flex pb-1.5 items-center gap-1">
            <Image 
              src="/map-pin.svg"
              height={13} 
              width={13} 
              alt="Location pin icon"
              className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
            />
            <h1 className="text-[10px] sm:text-xs">Age range</h1>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {["18-25y", "25-35y", "35-45y", "45-55y", "55-65y", "65+"].map((age, index) => (
              <p
                key={index}
                className="px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 border-[1px] rounded-full text-[10px] sm:text-xs cursor-pointer hover:bg-white hover:text-black transition-colors whitespace-nowrap"
              >
                {age}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-3 sm:pt-4 mt-2 sm:mt-3">
        <button className="w-full sm:w-auto px-10 sm:px-16 md:px-20 py-1.5 sm:py-2 md:py-2.5 bg-white/30 rounded-full text-[10px] sm:text-xs md:text-sm font-medium cursor-pointer hover:bg-white/40 transition-colors">
          Apply and send
        </button>
      </div>
    </div>
    </div>
  );
};

export default Filter;