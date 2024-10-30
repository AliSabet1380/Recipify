"use server";

import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { safeAction } from "@/actions/safe-action";
import { EditSchema, validateFormData } from "@/actions/edit-profile/schema";
import { InputType, ReturnType } from "@/actions/edit-profile/types";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { firebaseStorage } from "@/firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { verifySession } from "@/lib/cookie";
import { deleteImage } from "@/lib/firebase";
import { coparePassword, createHashPassword } from "@/lib/bcrypt";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { formData } = data;

  // Schema
  const validateData = validateFormData.safeParse(Object.fromEntries(formData));
  if (!validateData.success)
    return { errors: validateData.error.errors[0].message };
  const { username, avatar, id, newPassword, oldPassword } = validateData.data;

  // Gaurds
  const session = cookies().get("session")?.value;
  if (!session) return { errors: "Session not found!" };
  const payload = await verifySession(session);
  if (!payload) return { errors: "Session is not valid" };
  if (id !== payload.userId)
    return { errors: "You can only edit your profile" };

  let user;
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, payload.userId),

      columns: {
        avatar: true,
        password: true,
        username: true,
      },
    });

    if (!existingUser) return { errors: "User not found!" };

    let hashedPassword;
    if (newPassword) {
      if (!oldPassword)
        return { errors: "old password is required to change password" };

      const isPasswordValid = await coparePassword(
        oldPassword,
        existingUser.password
      );

      if (!isPasswordValid) return { errors: "Old Password is wrong!" };
      hashedPassword = await createHashPassword(newPassword);
    }

    let avatarUrl;
    if (avatar && avatar.size > 0) {
      if (existingUser.avatar !== "/no-avatar.png")
        deleteImage(existingUser.avatar);

      const storageRef = ref(firebaseStorage, `${avatar.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      avatarUrl = await getDownloadURL((await uploadTask).ref);
    }

    [user] = await db
      .update(users)
      .set({
        avatar: avatarUrl || existingUser.avatar,
        username: username || existingUser.username,
        password: hashedPassword || existingUser.password,
      })
      .where(eq(users.id, payload.userId))
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        avatar: users.avatar,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });
  } catch (error) {
    return { errors: "Fail to update user profile" };
  }

  return { data: user };
};

export const editProfile = safeAction(EditSchema, handler);
