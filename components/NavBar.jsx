"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DropDownNavBar from "@/components/DropDownNavBar.jsx";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createClass, joinClass } from "@/components/actions";

const initialStateJoin = {
  message: "",
};
const initialStateCreate = {
  message: "",
};

function SubmitButton({ value }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button disabled>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  }
  return <Button>{value}</Button>;
}

export default function NavBar({ user }) {
  const [stateJoin, formJoin] = useFormState(joinClass, initialStateJoin);
  const [stateCreate, formCreate] = useFormState(
    createClass,
    initialStateCreate,
  );

  return (
    <div className={"mb-20"}>
      {/*Navbar*/}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href={"/classrooms"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={"w-8 h-8"}
              viewBox="0 0 448 512"
            >
              <path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" />
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Attendance {user.isAdmin ? "(Admin)" : ""}
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Dialog>
              <DialogTrigger asChild className={"border-none"}>
                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Tabs defaultValue="create" className={"mt-5"}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create">Create Class</TabsTrigger>
                    <TabsTrigger value="join">Join Class</TabsTrigger>
                  </TabsList>
                  <TabsContent value="create">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create Class</CardTitle>
                      </CardHeader>
                      <form action={formCreate}>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="name">Class Name</Label>
                            <Input id="name" name={"name"} />
                            <p className="text-sm text-red-500">
                              {stateCreate?.message}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <SubmitButton value={"Create"} />
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>
                  <TabsContent value="join">
                    <Card>
                      <CardHeader>
                        <CardTitle>Join Class</CardTitle>
                      </CardHeader>
                      <form action={formJoin}>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="name">Class Code</Label>
                            <Input id="name" name={"code"} />
                            <p className="text-sm text-red-500">
                              {stateJoin?.message}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <SubmitButton value={"Join"} />
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <DropDownNavBar user={user} />
          </div>
        </div>
      </nav>
    </div>
  );
}
