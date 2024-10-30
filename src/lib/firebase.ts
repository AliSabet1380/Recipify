"use server";

import { firebaseStorage } from "@/firebase/storage";

import { deleteObject, ref, getStorage } from "firebase/storage";

export const deleteImage = async (url: string) => {
  const desertRef = ref(firebaseStorage, url);

  deleteObject(desertRef);
};
