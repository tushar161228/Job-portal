import { Button } from "@base-ui/react";
import { Search } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font medium">
          No. 1 Job platform
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream job</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, tempora!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 rounded-full items-center overflow-hidden mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Job"
            className="outline-none border-none w-full h-12 px-4"
          />

          <Button className="bg-[#6A38C2] h-12 px-5 text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
