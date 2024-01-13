import {cookies} from "next/headers";
import QRCode from "react-qr-code";

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
      <div className={'flex justify-center'}>
        <QRCode
          size={256}
          style={{ height: "100px", width: "100px" }}
          value={`http://localhost:3000/classrooms/${params.classroom_id}/${params.record_id}/${record.code}`}
          viewBox={`0 0 256 256`}
        />
      </div>
      <h1>
        http://localhost:3000/classrooms/{params.classroom_id}/
        {params.record_id}/{record.code}
      </h1>
    </>
  );
}