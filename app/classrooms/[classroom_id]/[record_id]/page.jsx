import {cookies} from "next/headers";

async function fetchRecordCode(record_id) {
  const token = cookies().get("token").value;
  const response = await fetch(`http://v1.attendance-sys.me/api/records/${record_id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export default async function Page({params}) {
  const record = await fetchRecordCode(params.record_id);

  return (
    <>
      <h1>http://localhost:3000/classrooms/{params.classroom_id}/{params.record_id}/{record.code}</h1>
    </>
  );
}