import React from "react";
import { Avatar, AvatarImage } from "../avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Button } from "../button";
import { UserRound, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  return (
    <>
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-3xl font-bold">
              Job <span className="text-[#F83002]">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-12">
            <ul className="flex gap-5 font-medium  items-center">
              <li>
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li>
                {" "}
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                {" "}
                <Link to="/browse">Browse</Link>
              </li>
            </ul>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  {" "}
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  {" "}
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>{" "}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-50">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>{" "}
                      <div>
                        <h4 className="font-medium">Tushar Bhai</h4>
                        <p className="text-sm text-muted-foreground">
                          Lorem ipsum dolor sit amet,
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col text-gray-600">
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <UserRound />
                        <Button variant="link"><Link to="/profile">View profile</Link></Button>
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button variant="link"><Link to="/logout">Logout</Link></Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
