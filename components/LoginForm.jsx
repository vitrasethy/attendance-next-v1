"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { login } from "@/components/logInOutAction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 mr-2"
      >
        <path d="M4.75 2A2.75 2.75 0 0 0 2 4.75v6.5A2.75 2.75 0 0 0 4.75 14h3a2.75 2.75 0 0 0 2.75-2.75v-.5a.75.75 0 0 0-1.5 0v.5c0 .69-.56 1.25-1.25 1.25h-3c-.69 0-1.25-.56-1.25-1.25v-6.5c0-.69.56-1.25 1.25-1.25h3C8.44 3.5 9 4.06 9 4.75v.5a.75.75 0 0 0 1.5 0v-.5A2.75 2.75 0 0 0 7.75 2h-3Z" />
        <path d="M8.03 6.28a.75.75 0 0 0-1.06-1.06L4.72 7.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06l-.97-.97h7.19a.75.75 0 0 0 0-1.5H7.06l.97-.97Z" />
      </svg>
      Login
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form autoComplete={"off"} action={formAction}>
      <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input name={"email"} type="email" id="email" placeholder="Email" />
        <p className="text-sm text-red-600">{state?.message.email}</p>
      </div>
      <div className="grid mb-6 w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          name={"password"}
          type="password"
          id="password"
          placeholder="Password"
        />
        <p className="text-sm text-red-600">{state?.message.password}</p>
      </div>
      <div className={"flex justify-end"}>
        <SubmitButton />
      </div>
    </form>
  );
}
