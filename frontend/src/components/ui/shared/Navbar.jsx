import React from "react";
import { Avatar, AvatarImage } from "../avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Button } from "../button";
import { UserRound, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { USER_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("LOGOUT ERROR:", error);

      toast.error(
        error?.response?.data?.message || error?.message || "Logout failed",
      );
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-12">
          <ul className="flex gap-5 font-medium items-center">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/jobs">Jobs</Link>
            </li>

            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {/* Not logged in */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            /* Logged in */
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                    />
                  </Avatar>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-64">
                <div>
                  {/* User information */}
                  <div className="flex gap-2 items-center mb-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>

                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>

                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <UserRound size={18} />

                    <Button variant="link" asChild>
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>

                  {/* Logout */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <LogOut size={18} />

                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
