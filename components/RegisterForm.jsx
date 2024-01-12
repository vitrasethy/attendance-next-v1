"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { register } from "@/components/logInOutAction";

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
  return <Button>Register</Button>;
}

export default function RegisterForm() {
  const [state, formAction] = useFormState(register, initialState);

  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Card className={"p-4"}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Please Enter your info for your new account.
          </CardDescription>
        </CardHeader>
        <form autoComplete={"off"} action={formAction}>
          <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={"name"}>Name</Label>
            <Input type={"text"} name={"name"} id={"name"} />
            <p className="text-sm text-red-600">{state?.message.name}</p>
          </div>
          <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={"gender"}>Gender</Label>
            <Select id={"gender"} name={"gender"}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender here..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-red-600">{state?.message.gender}</p>
          </div>
          <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={"email"}>Email</Label>
            <Input type={"email"} name={"email"} id={"email"} />
            <p className="text-sm text-red-600">{state?.message.email}</p>
          </div>
          <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={"password"}>Password</Label>
            <Input type={"password"} name={"password"} id={"password"} />
            <p className="text-sm text-red-600">{state?.message.password}</p>
          </div>
          <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={"password_confirmation"}>Confirm Password</Label>
            <Input
              type={"password"}
              name={"password_confirmation"}
              id={"password_confirmation"}
            />
            <p className="text-sm text-red-600">{state?.message.password}</p>
          </div>
          <div className={"flex justify-end"}>
            <SubmitButton />
          </div>
        </form>
      </Card>
    </div>
  );
}
