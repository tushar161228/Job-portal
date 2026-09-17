import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="mb-4">
        <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-xl">{job?.title}</h1>
        <p className="text-gray-600 mt-1">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="text-blue-700 font-bold" variant="outline">
          {job?.position}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;