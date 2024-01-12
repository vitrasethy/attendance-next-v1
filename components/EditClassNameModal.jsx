"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { editClassName } from "@/components/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button disabled>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  }
  return <Button>Save Change</Button>;
}

export default function EditClassNameModal({
  openModal,
  setOpenModal,
  classroomId,
  classroomName,
}) {
  const [state, formAction] = useFormState(editClassName, initialState);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Class Name</DialogTitle>
          <DialogDescription>
            Change your class name here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} autoComplete="off">
          <div className={"mb-2"}>
            <Label htmlFor="name" className="text-right">
              Class Name
            </Label>
            <Input
              id="name"
              defaultValue={classroomName}
              name={"name"}
              className="col-span-3"
            />
            <p className="text-sm text-red-500">{state?.message}</p>
            <Input type={"hidden"} name={"classroom_id"} value={classroomId} />
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
