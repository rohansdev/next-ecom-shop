import { db } from "@/prisma/db";
import { notFound } from "next/navigation";
import CoverDesignPreview from "./CoverDesignPreview";

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

  return <CoverDesignPreview configuration={configuration} />;
};

export default page;
