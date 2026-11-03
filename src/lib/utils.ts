import { Metadata } from "next";

export { cn } from "cn";

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export const constructMetadata = ({
  title = "DesignMyCover - design custom phone covers",
  description = "Design custom high-quality phone covers.",
  image = "/thumbnailpng",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@rohans32",
    },
    icons,
  };
};
