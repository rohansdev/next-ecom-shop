import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

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
    .middleware(async ({ input, req }) => {
      const session = await auth.api.getSession({ headers: req.headers });
      const user = session?.user;

      if (!user?.email) {
        throw new UploadThingError("Unauthorized! You are not logged in.");
      }

      return { input, userEmail: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.ufsUrl);
      if (!res.ok) {
        throw new UploadThingError("Unable to retrieve the uploaded image.");
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      const imageMetaData = await sharp(buffer).metadata();
      const { width, height } = imageMetaData;
      const user =
        (await db.orm.public.User.where({
          email: metadata.userEmail,
        }).first()) ??
        (await db.orm.public.User.create({ email: metadata.userEmail }));

      if (!configId) {
        const configuration = await db.orm.public.Configuration.create({
          userId: user.id,
          imageUrl: file.ufsUrl,
          width: width || 500,
          height: height || 500,
        });

        return { configId: configuration.id };
      } else if (user) {
        const updatedConfiguration = await db.orm.public.Configuration.where({
          id: configId,
          userId: user.id,
        }).update({
          croppedImageUrl: file.ufsUrl,
        });

        if (!updatedConfiguration) {
          throw new UploadThingError("Configuration not found.");
        }

        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
