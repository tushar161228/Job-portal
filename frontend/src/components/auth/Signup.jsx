import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@base-ui/react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const loading=useSelector(store=>store.auth.loading);
  const dispatch=useDispatch();
  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="text-lg">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              placeholder="Enter your name"
              onChange={changeEventhandler}
              className="w-full text-lg p-2 border border-gray-300 rounded-md"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="text-lg">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              placeholder="xyz@gmail.com"
              onChange={changeEventhandler}
              className="w-full text-lg p-2 border border-gray-300 rounded-md"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="text-lg">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              placeholder="987654321"
              onChange={changeEventhandler}
              className="w-full text-lg p-2 border border-gray-300 rounded-md"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="text-lg">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              placeholder="password"
              onChange={changeEventhandler}
              className="w-full text-lg p-2 border border-gray-300 rounded-md"
            ></Input>
          </div>

          <div className=" flex space-x-6 my-5">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="cursor-pointer"
                  checked={input.role == "student"}
                  onChange={changeEventhandler}
                />
                <Label htmlFor="r1" className="text-lg">
                  Student
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className="cursor-pointer"
                  checked={input.role == "recruiter"}
                  onChange={changeEventhandler}
                />
                <Label htmlFor="r2" className="text-lg">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-8">
              <Label className="text-lg">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full my-4 h-10 bg-purple-900 hover:bg-purple-950 text-white border border-purple-950 rounded-md flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Signup"
            )}
          </Button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
