"use server";

import type { Models } from "@/prisma/contract";
import { db } from "@/prisma/db";

type Configuration = Models.public_Configuration;
type CoverColor = NonNullable<Configuration>["color"];
type CoverFinishing = NonNullable<Configuration>["finishing"];
type CoverMaterial = NonNullable<Configuration>["material"];
type PhoneModel = NonNullable<Configuration>["model"];

export type SaveDesignConfigsArgs = {
  color: CoverColor;
  finishing: CoverFinishing;
  material: CoverMaterial;
  model: PhoneModel;
  configId: number;
};

export async function saveDesignConfigs({
  color,
  finishing,
  material,
  model,
  configId,
}: SaveDesignConfigsArgs) {
  await db.orm.public.Configuration.where({
    id: configId,
  }).update({
    color,
    finishing,
    material,
    model,
  });
}
