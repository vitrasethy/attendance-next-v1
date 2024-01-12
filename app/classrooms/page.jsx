import ClassroomPage from "@/components/ClassroomPage";
import {cookies} from "next/headers";

async function fetchClassrooms() {
  const token = cookies().get("token").value;
  const response = await fetch("http://v1.attendance-sys.me/api/classrooms", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(JSON.stringify(await response.text()));
  }

  return response.json();
}

async function fetchUser() {
  const token = cookies().get("token").value;
  const response = await fetch("http://v1.attendance-sys.me/api/sign-in-user", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export default async function Page() {
  const classroomsData = fetchClassrooms();
  const userData = fetchUser();

  const [classrooms, user] = await Promise.all([classroomsData, userData]);

  return (
    <>
      <ClassroomPage classrooms={classrooms} user={user} />
    </>
  );
}
