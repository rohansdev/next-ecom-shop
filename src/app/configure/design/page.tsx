import { db } from "@/prisma/db";
import { notFound } from "next/navigation";
import CoverDesigner from "./CoverDesigner";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  if (typeof id !== "string") {
    return notFound();
  }

  const configId = Number(id);
  if (!Number.isSafeInteger(configId) || configId <= 0) {
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
