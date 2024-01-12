"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NavBar from "@/components/NavBar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
import NoClass from "@/components/NoClass.jsx";
import Link from "next/link";
import { takeRoll } from "@/components/actions";

export default function ClassroomPage({ user, classrooms }) {
  const [data, setData] = useState(classrooms);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState("all");

  const onToggleChange = (e) => {
    setToggle(e);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (toggle === "all") {
      setData(
        classrooms.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else if (toggle === "teaching") {
      setData(
        classrooms.filter(
          (e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) &&
            e.user_id === user.id,
        ),
      );
    } else {
      setData(
        classrooms.filter(
          (e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) &&
            e.user_id !== user.id,
        ),
      );
    }
  }, [classrooms, search, toggle, user.id]);

  return (
    <div>
      <NavBar user={user} />
      <div
        className={"flex flex-col items-center lg:flex-row lg:justify-center"}
      >
        {/*Search box*/}
        <Input
          className={"w-[95vw] lg:w-4/12 lg:mr-10 mb-2"}
          type={"text"}
          placeholder={"Search Class Name"}
          onChange={onSearchChange}
        />

        {/*Toggle Filter*/}
        <ToggleGroup
          className={"mb-2"}
          type="single"
          variant="outline"
          value={toggle}
          onValueChange={onToggleChange}
        >
          <ToggleGroupItem value="all" aria-label="All">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="teaching" aria-label="Teaching">
            Teaching
          </ToggleGroupItem>
          <ToggleGroupItem value="enrolled" aria-label="Enrolled">
            Enrolled
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <>
        {!data || data.length === 0 ? (
          <NoClass />
        ) : (
          <Card className={"w-[90vw] mx-auto p-1 lg:max-w-[90vw] lg:w-fit"}>
            <Table className={""}>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden lg:table-cell">No</TableHead>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Teacher</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((classroom, no) => (
                  <TableRow key={classroom.id}>
                    <TableCell className="font-medium hidden lg:table-cell">
                      {no + 1}
                    </TableCell>
                    <TableCell className={"truncate"}>
                      <Link href={`/classrooms/${classroom.id}`}>
                        {classroom.name}
                      </Link>
                    </TableCell>
                    <TableCell className={"truncate"}>
                      {classroom.user.name}
                    </TableCell>
                    <TableCell
                      className={`flex items-center ${
                        classroom.user_id !== user.id || user.isAdmin === false
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <form action={takeRoll}>
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
                            <path d="M4.75 4.25a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
                            <path
                              fillRule="evenodd"
                              d="M2 3.5A1.5 1.5 0 0 1 3.5 2H6a1.5 1.5 0 0 1 1.5 1.5V6A1.5 1.5 0 0 1 6 7.5H3.5A1.5 1.5 0 0 1 2 6V3.5Zm1.5 0H6V6H3.5V3.5Z"
                              clipRule="evenodd"
                            />
                            <path d="M4.25 11.25a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z" />
                            <path
                              fillRule="evenodd"
                              d="M2 10a1.5 1.5 0 0 1 1.5-1.5H6A1.5 1.5 0 0 1 7.5 10v2.5A1.5 1.5 0 0 1 6 14H3.5A1.5 1.5 0 0 1 2 12.5V10Zm1.5 2.5V10H6v2.5H3.5Z"
                              clipRule="evenodd"
                            />
                            <path d="M11.25 4.25a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
                            <path
                              fillRule="evenodd"
                              d="M10 2a1.5 1.5 0 0 0-1.5 1.5V6A1.5 1.5 0 0 0 10 7.5h2.5A1.5 1.5 0 0 0 14 6V3.5A1.5 1.5 0 0 0 12.5 2H10Zm2.5 1.5H10V6h2.5V3.5Z"
                              clipRule="evenodd"
                            />
                            <path d="M8.5 9.417a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM8.5 13.083a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM13.083 8.5a.917.917 0 1 0 0 1.833.917.917 0 0 0 0-1.833ZM12.166 13.084a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM11.25 10.333a.917.917 0 1 0 0 1.833.917.917 0 0 0 0-1.833Z" />
                          </svg>
                          Take Roll
                        </Button>
                      </form>
                      <Button className={"lg:hidden"} size={"icon"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M4.75 4.25a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
                          <path
                            fillRule="evenodd"
                            d="M2 3.5A1.5 1.5 0 0 1 3.5 2H6a1.5 1.5 0 0 1 1.5 1.5V6A1.5 1.5 0 0 1 6 7.5H3.5A1.5 1.5 0 0 1 2 6V3.5Zm1.5 0H6V6H3.5V3.5Z"
                            clipRule="evenodd"
                          />
                          <path d="M4.25 11.25a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z" />
                          <path
                            fillRule="evenodd"
                            d="M2 10a1.5 1.5 0 0 1 1.5-1.5H6A1.5 1.5 0 0 1 7.5 10v2.5A1.5 1.5 0 0 1 6 14H3.5A1.5 1.5 0 0 1 2 12.5V10Zm1.5 2.5V10H6v2.5H3.5Z"
                            clipRule="evenodd"
                          />
                          <path d="M11.25 4.25a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
                          <path
                            fillRule="evenodd"
                            d="M10 2a1.5 1.5 0 0 0-1.5 1.5V6A1.5 1.5 0 0 0 10 7.5h2.5A1.5 1.5 0 0 0 14 6V3.5A1.5 1.5 0 0 0 12.5 2H10Zm2.5 1.5H10V6h2.5V3.5Z"
                            clipRule="evenodd"
                          />
                          <path d="M8.5 9.417a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM8.5 13.083a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM13.083 8.5a.917.917 0 1 0 0 1.833.917.917 0 0 0 0-1.833ZM12.166 13.084a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM11.25 10.333a.917.917 0 1 0 0 1.833.917.917 0 0 0 0-1.833Z" />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </>
    </div>
  );
}
