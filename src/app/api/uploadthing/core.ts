import { db } from "@/prisma/db";
import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

const auth = (req: Request) => ({ id: process.env.UPLOADTHING_TOKEN });

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.number().optional() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.ufsUrl);
      const buffer = await res.arrayBuffer();
      const imageMetaData = await sharp(buffer).metadata();
      const { width, height } = imageMetaData;

      if (!configId) {
        const configuration = await db.orm.public.Configuration.create({
          imageUrl: file.ufsUrl,
          width: width || 500,
          height: height || 500,
        });

        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await db.orm.public.Configuration.where({
          id: configId,
        }).update({
          croppedImageUrl: file.ufsUrl,
        });

        return { configId: updatedConfiguration?.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
