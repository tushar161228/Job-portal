import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-lg transition-shadow cursor-pointer">
      <div className="mb-4">
        <h1 className="font-semibold text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-xl">Job Title</h1>
        <p className="text-gray-600 mt-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, vitae.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="text-blue-700 font-bold"  variant="outline">
          12 positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="outline">
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold"  variant="outline">
          24 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
