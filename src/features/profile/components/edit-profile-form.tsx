"use clinet";

import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";
import { ChangeEvent, ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";

import { editProfile } from "@/actions/edit-profile";
import { useRouter } from "next/navigation";

interface EditProfilePage {
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const EditProfilePage = ({ user }: EditProfilePage) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<ElementRef<"input">>(null);

  const { isLoading, excute } = useAction(editProfile, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        description: "Profile Edited",
      });
      router.push(`/dashboard/${data.id}`);
    },
    onError: (error) => {
      toast({
        description: error,
      });
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onPickFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setPreview(URL.createObjectURL(file));
  };
  const onAddOrChangeImage = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (formData: FormData) => {
    const newPassword = formData.get("newPassword");
    const passwordConfirm = formData.get("passwordConfirm");
    if (newPassword !== passwordConfirm) {
      toast({
        description: "passwords are not same",
      });
      return;
    }

    excute({ formData });
  };

  return (
    <div className="w-full h-full bg-white text-black p-5 border-2 shadow-md rounded-lg">
      <h2 className="text-start text-xl font-medium">Edit Profile</h2>
      <form
        action={onSubmit}
        className="w-full flex flex-col items-center justify-center space-y-7"
      >
        <input type="text" hidden name="id" defaultValue={user.id} readOnly />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          name="avatar"
          onChange={onPickFile}
        />

        <Image
          src={preview || user.avatar}
          alt={user.username}
          width={300}
          height={300}
          className="w-32 h-32 rounded-full cursor-pointer object-cover"
          onClick={onAddOrChangeImage}
        />

        <div className="w-full space-y-4">
          <FormInput
            disabled={isLoading}
            className="border-2"
            placeholder={user.username}
            id="username"
          />
          <div className="flex items-center space-x-1 border rounded-md">
            <FormInput
              disabled={isLoading}
              id="oldPassword"
              placeholder="Old Password"
              type={showOldPassword ? "text" : "password"}
              className=""
            />
            <Button
              onClick={() => setShowOldPassword((pervState) => !pervState)}
              type="button"
              size={"icon"}
              variant={"ghost"}
            >
              {showOldPassword ? (
                <EyeClosed className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-1 border rounded-md">
            <FormInput
              disabled={isLoading}
              id="newPassword"
              placeholder="New Password"
              type={showNewPassword ? "text" : "password"}
              className=""
            />
            <Button
              onClick={() => setShowNewPassword((pervState) => !pervState)}
              type="button"
              size={"icon"}
              variant={"ghost"}
            >
              {showNewPassword ? (
                <EyeClosed className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-1 border rounded-md">
            <FormInput
              disabled={isLoading}
              id="passwordConfirm"
              placeholder="Password Confirm"
              type={showConfirmPassword ? "text" : "password"}
              className=""
            />
            <Button
              onClick={() => setShowConfirmPassword((pervState) => !pervState)}
              type="button"
              size={"icon"}
              variant={"ghost"}
            >
              {showConfirmPassword ? (
                <EyeClosed className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <FormButton disabled={isLoading} className="w-full">
          Edit Profile
        </FormButton>
      </form>
    </div>
  );
};
