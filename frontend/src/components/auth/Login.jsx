import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Button, Input } from "@base-ui/react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { USER_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner"; // or "react-hot-toast", whichever you use
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);
  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success){
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message||error.message);
    } finally {
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
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2"></div>
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
              "Login"
            )}
          </Button>
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
