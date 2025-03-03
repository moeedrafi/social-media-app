"use server";

import prisma from "@/lib/client";

export const getUser = async (userId: string) => {
  try {
    return prisma.user.findFirst({
      where: { id: userId },
    });
  } catch (error) {
    console.log(error);
    throw new Error("could'nt get user");
  }
};
