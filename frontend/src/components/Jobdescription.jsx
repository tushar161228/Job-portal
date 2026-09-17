import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Jobdescription = () =>{

  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isApplied = singleJob?.application?.some(application=>application==user?._id)||false;

  const applyJobHandler=async()=>{
    try {
      const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() =>{
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl"> {singleJob?.title}</h1>
          <div>
            <Badge className="text-blue-700 font-bold mt-5" variant="outline">
              {singleJob?.position} positions
            </Badge>
            <Badge className="text-[#F83002] font-bold  mt-5" variant="outline">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold  mt-5" variant="outline">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button onClick={isApplied?null:applyJobHandler}
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
            {singleJob?.title}
          </span>
        </h1>

        <h1 className="font-bold">
          Location:
          <span className="pl-4 font-normal text-gray-600">
            {" "}
            {singleJob?.location}
          </span>
        </h1>

        <h1 className="font-bold">
          Experience:
          <span className="pl-4 font-normal text-gray-600">
            {" "}
            {singleJob?.experienceLevel}
          </span>
        </h1>

        <h1 className="font-bold">
          Salary:
          <span className="pl-4 font-normal text-gray-600">
            {singleJob?.salary}LPA
          </span>
        </h1>

        <h1 className="font-bold">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-600">{singleJob?.application?.length}</span>
        </h1>

        <h1 className="font-bold">
          Posted Date:
          <span className="pl-4 font-normal text-gray-600">{singleJob?.createdAt.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default Jobdescription;
