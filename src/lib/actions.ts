"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: { followerId: currentUserId, followingId: userId },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: { id: existingFollow.id },
      });
      return { success: true, message: "User unfollowed successfully." };
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: { senderId: currentUserId, receiverId: userId },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: { id: existingFollowRequest.id },
        });
      } else {
        await prisma.followRequest.create({
          data: { senderId: currentUserId, receiverId: userId },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update follow status. Please try again.");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: { blockerId: currentUserId, blockedId: userId },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: { id: existingBlock.id },
      });
    } else {
      await prisma.block.create({
        data: { blockerId: currentUserId, blockedId: userId },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update block. Please try again.");
  }
};
