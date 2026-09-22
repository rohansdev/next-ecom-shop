import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Phone from "@/components/Phone";
import { Icons } from "@/components/Icons";
import RatingStars from "@/components/RatingStars";
import UserTestimonials from "@/components/UserTestimonials";
import Reviews from "@/components/Reviews";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image
                  src={"/snake-1.png"}
                  alt="snake image"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-orange-500 px-2 text-white rounded-sm">
                  Custom
                </span>{" "}
                Phone case.
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                DesignMyCaover allows you to protect your memories, not just
                your phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />
                    High-quality, durable material.
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />2
                    years print guarantee.
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />
                    All iPhone models supported.
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <Image
                    src={"/users/user-1.png"}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    alt="user image"
                    width={10}
                    height={10}
                  />
                  <Image
                    src={"/users/user-2.png"}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    alt="user image"
                    width={10}
                    height={10}
                  />
                  <Image
                    src={"/users/user-3.png"}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    alt="user image"
                    width={10}
                    height={10}
                  />
                  <Image
                    src={"/users/user-4.jpg"}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    alt="user image"
                    width={10}
                    height={10}
                  />
                  <Image
                    src={"/users/user-5.jpg"}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                    alt="user image"
                    width={10}
                    height={10}
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <RatingStars
                      className="h-4 w-4 text-orange-600 fill-orange-600"
                      starsCount={5}
                    />
                  </div>
                  <p>
                    <span className="font-semibold">5,635</span> happy
                    customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src={"/your-image.png"}
                width={40}
                height={40}
                alt="your image"
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <Image
                src={"/line.png"}
                alt="line image"
                width={20}
                height={20}
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance leading-tight! font-bold text-5xl md:text-6xl text-gray-900">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-orange-500" />{" "}
              </span>{" "}
              say
            </h2>
            <Image
              src={"/snake-2.png"}
              alt="snake-2"
              width={24}
              height={24}
              className="w-24 order-0 lg:order-2"
            />
          </div>

          <div className="max-w-2xl px-4 lg:mx-0 lg:max-w-none gap-y-16">
            <UserTestimonials />
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 kg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance leading-tight! font-bold text-5xl md:text-6xl text-gray-900">
                Upload your photo and get your own cover now.
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <Image
                src={"/arrow.png"}
                alt="arrow"
                className="absolute top-100 md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                width={100}
                height={100}
              />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <Image
                  src={"/horse.jpg"}
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                  alt="horse"
                  width={120}
                  height={120}
                />
              </div>
              <Phone imgSrc="/horse_phone.jpg" className="w-60" />
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-600 inline mr-1.5" />
              High quality silicone material
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-600 inline mr-1.5" />
              Scratch and fingerprint resistant coating.
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-600 inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-orange-600 inline mr-1.5" />5 years
              print warranty
            </li>

            <div className="flex justify-center">
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
              >
                Create your cover now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
