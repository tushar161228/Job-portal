import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Jobdescription = () => {
  const isApplied = true;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">FrontEnd Developer</h1>
          <div>
            <Badge className="text-blue-700 font-bold mt-5" variant="outline">
              12 positions
            </Badge>
            <Badge className="text-[#F83002] font-bold  mt-5" variant="outline">
              Part Time
            </Badge>
            <Badge className="text-[#7209b7] font-bold  mt-5" variant="outline">
              24 LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-black text-white cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f0799]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="space-y-3">
        <h1 className="font-bold">
          Role:
          <span className="pl-4 font-normal text-gray-600">
            Frontend Developer
          </span>
        </h1>

        <h1 className="font-bold">
          Location:
          <span className="pl-4 font-normal text-gray-600">India</span>
        </h1>

        <h1 className="font-bold">
          Description:
          <span className="pl-4 font-normal text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laborum.
          </span>
        </h1>

        <h1 className="font-bold">
          Experience:
          <span className="pl-4 font-normal text-gray-600">1-2 Years</span>
        </h1>

        <h1 className="font-bold">
          Salary:
          <span className="pl-4 font-normal text-gray-600">8 LPA</span>
        </h1>

        <h1 className="font-bold">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-600">120</span>
        </h1>

        <h1 className="font-bold">
          Posted Date:
          <span className="pl-4 font-normal text-gray-600">15-09-2026</span>
        </h1>
      </div>
    </div>
  );
};

export default Jobdescription;
