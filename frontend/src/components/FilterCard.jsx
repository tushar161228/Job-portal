import { RadioGroup } from "@base-ui/react";
import React from "react";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filtrerData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Graphic Designer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40-60k", "60k-80k", "80k-1lakh", "1lakh+"],
  },
];
const FilterCard = ({ children }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>

      <hr className="mt-3 mb-4" />

      <RadioGroup>
        {filtrerData.map((data, index) => (
          <div key={index} className="mb-5">
            <h1 className="font-bold text-lg mb-2 ">{data.filterType}</h1>

            {data.array.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2 space-x-2 my-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
