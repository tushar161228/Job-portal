import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "@base-ui/react";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-5">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-auto pl-2">
              <Button variant="outline" className="rounded-full border border-gray-300 px-5 py-2 bg-white text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
