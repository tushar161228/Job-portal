import React from "react";
import { Avatar, AvatarImage } from "../avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Button } from "../button";
import { UserRound, LogOut } from "lucide-react";
const Navbar = () => {
  const user = false;
  return (
    <>
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job <span className="text-[#F83002]">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-10">
            <ul className="flex gap-5 font-medium  items-center">
              <li>Home</li>
              <li>Jobs</li>
              <li>Browse</li>
            </ul>

            {!user ? (
              <div className="flex items-center gap-2">
                <Button variant="outline">Login</Button>
                <Button>Signup</Button>
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
                        <Button variant="link">View profile</Button>
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button variant="link">Logout</Button>
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
