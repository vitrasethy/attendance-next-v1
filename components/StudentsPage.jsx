"use client";

import NavBar from "@/components/NavBar.jsx";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button.jsx";
import NoData from "@/components/NoData.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import AddStudentModal from "@/components/AddStudentModal.jsx";
import EditClassModal from "@/components/EditClassNameModal.jsx";
import DeleteClassModal from "@/components/DeleteClassModal.jsx";
import Link from "next/link";
import { deleteStudent, takeRoll } from "@/components/actions";

export default function StudentsPage({ user, students, classroom }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <NavBar user={user} />
      <EditClassModal
        openModal={openEdit}
        setOpenModal={setOpenEdit}
        classroomName={classroom.name}
        classroomId={classroom.id}
      />
      <AddStudentModal
        openModal={openAddStudent}
        setOpenModal={setOpenAddStudent}
        classroomId={classroom.id}
      />
      <DeleteClassModal
        setOpenModal={setOpenDelete}
        openModal={openDelete}
        classroomId={classroom.id}
      />

      {/*class name and code cards*/}
      <div className={"lg:flex gap-4 lg:px-2"}>
        {/*Class Name Card*/}
        <Card className={"w-[95vw] mx-auto mb-2"}>
          <CardHeader>
            <CardDescription>Class Name</CardDescription>
            <div className={"flex items-center justify-between"}>
              <CardTitle>{classroom.name}</CardTitle>
              <div
                className={
                  classroom.user_id !== user.id || user.isAdmin === false
                    ? "hidden"
                    : ""
                }
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"icon"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                        Edit
                      </DropdownMenuItem>
                      <form action={takeRoll}>
                        <input type={'hidden'} value={classroom.id} name={'classroom_id'}/>
                        <button type={"submit"}>
                          <DropdownMenuItem>Take Roll</DropdownMenuItem>
                        </button>
                      </form>
                      <DropdownMenuItem onClick={() => setOpenAddStudent(true)}>
                        Add Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/*class code card*/}
        <Card className={"w-[95vw] mx-auto mb-2"}>
          <CardHeader>
            <CardDescription>Class Code</CardDescription>
            <CardTitle>{classroom.code}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/*student list card table*/}
      <>
        {!students || students.length === 0 ? (
          <NoData />
        ) : (
          <Card className={"w-[90vw] mx-auto p-1 lg:max-w-[90vw] lg:w-fit"}>
            <Table className={""}>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden lg:table-cell">No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className={"hidden lg:table-cell"}>
                    Email
                  </TableHead>
                  <TableHead>Absent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, no) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium hidden lg:table-cell">
                      {no + 1}
                    </TableCell>
                    <TableCell className={"truncate"}>
                      <Link href={"#"}>{student.user.name}</Link>
                    </TableCell>
                    <TableCell className={"hidden lg:table-cell"}>
                      {student.user.email}
                    </TableCell>
                    <TableCell>{student.absence_count}</TableCell>
                    <TableCell
                      className={`flex items-center ${
                        classroom.user_id !== user.id || user.isAdmin === false
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <form action={deleteStudent}>
                        <input
                          type={"hidden"}
                          value={student.id}
                          name={"student_id"}
                        />
                        <input
                          type={"hidden"}
                          value={classroom.id}
                          name={"classroom_id"}
                        />
                        <Button
                          type={"submit"}
                          className={"hidden lg:flex"}
                          size={"sm"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 mr-2"
                          >
                            <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM10.75 5.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
                          </svg>
                          Kick
                        </Button>
                        <Button
                          type={"submit"}
                          className={"lg:hidden"}
                          size={"icon"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM10.75 5.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
                          </svg>
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </>
    </>
  );
}
