"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UseConfirmProps {
  title: string;
  desc?: string;
}

export const useConfirm = ({
  title,
  desc,
}: UseConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (val: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const onClose = () => {
    setPromise(null);
  };

  const onConfirm = () => {
    promise?.resolve(true);
    onClose();
  };

  const onCancle = () => {
    promise?.resolve(false);
    onClose();
  };

  const ConfirmDialog = () => (
    <Dialog onOpenChange={onClose} open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancle}>Cancle</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
