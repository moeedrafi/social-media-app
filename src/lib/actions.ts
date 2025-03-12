"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  } catch (err) {
    console.log(err);
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

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: { receiverId: currentUserId, senderId: userId },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id },
      });

      await prisma.follower.create({
        data: { followerId: userId, followingId: currentUserId },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to accept request. Please try again.");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: { receiverId: currentUserId, senderId: userId },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to decline request. Please try again.");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;

  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: { postId, userId },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await prisma.like.create({
        data: { userId, postId },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to like. Please try again.");
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const createdComment = await prisma.comment.create({
      data: { postId, desc, userId },
      include: { user: true },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when adding comment!");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  const desc = formData.get("desc") as string;
  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);
  if (!validatedDesc.success) {
    console.log("desc not valid");
    return;
  }

  try {
    await prisma.post.create({
      data: { userId, img, desc: validatedDesc.data, visbility: "default" },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when adding post!");
  }
};

export const addStory = async (img: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: { userId },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: { id: existingStory.id },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: { user: true },
    });

    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when adding post!");
  }
};

export const deletePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: { id: postId, userId },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when deleting post!");
  }
};

export const seenStory = async (storyId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.storyViews.upsert({
      where: { storyId_viewerId: { storyId, viewerId: userId } },
      create: { storyId, viewerId: userId },
      update: {},
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when seeing story!");
  }
};

export const addStoryVisiblity = async (storyId: number, userIds: string[]) => {
  try {
    await prisma.storyVisibility.createMany({
      data: userIds.map((userId) => ({ storyId, userId })),
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong when adding post!");
  }
};

export const addReply = async (
  postId: number,
  parentId: number,
  desc: string
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const createdReply = await prisma.comment.create({
      data: { desc, parentId, userId, postId },
      include: { user: true },
    });

    return createdReply;
  } catch (error) {
    console.log(error);
  }
};
