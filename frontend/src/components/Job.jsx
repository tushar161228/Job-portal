import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center gap-3 justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Avatar>
          <AvatarImage src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" />
        </Avatar>

        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quam,
          rerum laboriosam a in vel maxime, assumenda amet repudiandae nesciunt
        </p>
      </div>
      <div>
        <Badge className="text-blue-700 font-bold mt-5" variant="outline">
          12 positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="outline">
          Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="outline">
          24 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
