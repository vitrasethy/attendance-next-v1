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
import { addStudent } from "@/components/actions";

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
  return <Button>Add</Button>;
}

export default function AddStudentModal({
  openModal,
  setOpenModal,
  classroomId,
}) {
  const [state, formAction] = useFormState(addStudent, initialState);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Add the student to your class here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} autoComplete="off">
          <div className={"mb-2"}>
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name={"email"} className="col-span-3" />
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
