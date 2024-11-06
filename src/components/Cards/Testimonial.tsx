import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  title: string;
  image: string;
  quote: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  title,
  image,
  quote,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover aspect-square"
          />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-gray-500">{title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{quote}</p>
      </CardContent>
    </Card>
  );
};

export default Testimonial;