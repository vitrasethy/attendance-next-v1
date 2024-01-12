import { cookies } from "next/headers";
import StudentsPage from "@/components/StudentsPage";

async function fetchData(classroomId) {
  const token = cookies().get("token").value;
  const response = await fetch(
    `http://v1.attendance-sys.me/api/classrooms/${classroomId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }

  return response.json();
}

async function fetchUser() {
  const token = cookies().get("token").value;
  const response = await fetch("http://v1.attendance-sys.me/api/sign-in-user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export default async function Page({ params }) {
  const dataFetch = fetchData(params.classroom_id);
  const userData = fetchUser();

  const [data, user] = await Promise.all([dataFetch, userData]);

  return (
    <>
      <StudentsPage
        classroom={data.classroom}
        students={data.students}
        user={user}
      />
    </>
  );
}
