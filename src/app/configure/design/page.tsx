import { db } from "@/prisma/db";
import { notFound } from "next/navigation";
import CoverDesigner from "./CoverDesigner";

interface PageProps {
  searchParams: {
    [key: string]: number | number[] | undefined;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  let configId = null;
  if (typeof id === "string") {
    configId = Number(id);
  }

  if (!configId || typeof configId !== "number") {
    return notFound();
  }

  const configuration = await db.orm.public.Configuration.first({
    id: configId,
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <CoverDesigner
      configId={configuration.id}
      imageUrl={imageUrl}
      imageDimensions={{ width, height }}
    />
  );
};

export default page;
