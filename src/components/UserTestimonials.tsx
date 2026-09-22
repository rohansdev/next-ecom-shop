import Image from "next/image";
import RatingStars from "./RatingStars";
import { Check } from "lucide-react";

const testimonials = [
  {
    userName: "Rohan",
    text: "The cover feels durabl and I even got a compliment on the design. Had this case for two and a half months now and the image is super clear , on the cover I had beore, the image started fading into yellowish color after a couple weeks. Love it.",
    image: "/users/user-1.png",
    rating: 5,
  },
  {
    userName: "Preet",
    text: "I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone covers. This one, besides a barely noticeable scratch on the corner looks brand new after about half a year. I dig it.",
    image: "/users/user-2.png",
    rating: 4,
  },
];

const UserTestimonials = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:pr-8 xl:pr-20">
      {testimonials.map((review, idx) => (
        <div key={idx}>
          <div className="flex gap-0.5 mb-2">
            <RatingStars
              className="h-5 w-5 text-orange-600 fill-orange-600"
              starsCount={review.rating}
            />
          </div>
          <div className="text-lg leading-8">
            <p>&rdquo;{review.text}&rdquo;</p>
          </div>
          <div className="flex gap-4 mt-2">
            <Image
              src={review.image}
              width={12}
              height={12}
              className="rounded-full h-12 w-12 object-cover"
              alt="user"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{review.userName}</p>
              <div className="flex gap-1.5 items-center text-zinc-600">
                <Check className="h-4 w-4 stroke-[3px] text-orange-600" />
                <p className="text-sm">Verified Purchase</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTestimonials;
