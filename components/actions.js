'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";



export async function joinClass(prevState, formData){
  const token = cookies().get("token").value;
  const data = {
    code: formData.get('code')
  }

  const res = await fetch("http://v1.attendance-sys.me/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json()
    return { message: msg.message}
  }

  const student = await res.json()

  revalidatePath('/')
  redirect(`/classrooms/${student.classroom_id}`)
}

export async function createClass(prevState, formData){
  const token = cookies().get("token").value;
  const data = {
    name: formData.get('name')
  }

  const res = await fetch("http://v1.attendance-sys.me/api/classrooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json()
    return { message: msg.message}
  }

  const classroom = await res.json()

  revalidatePath('/')
  redirect(`/classrooms/${classroom.id}`)
}

export async function addStudent(prevState, formData){
  const token = cookies().get("token").value;
  const data = {
    email: formData.get('email'),
    classroom_id: formData.get('classroom_id')
  }

  const res = await fetch("http://v1.attendance-sys.me/api/add-student-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json()
    return { message: msg.message}
  }

  const student = await res.json()

  revalidatePath('/')
  redirect(`/classrooms/${student.classroom_id}`)
}

export async function editClassName(prevState, formData){
  const token = cookies().get("token").value;
  const data = {
    name: formData.get('name')
  }

  const res = await fetch(`http://v1.attendance-sys.me/api/classrooms/${formData.get('classroom_id')}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json()
    return { message: msg.message}
  }

  const classroom = await res.json()

  revalidatePath('/')
  redirect(`/classrooms/${classroom.id}`)
}

export async function deleteClass(formData){
  const token = cookies().get("token").value;
  const res = await fetch(`http://v1.attendance-sys.me/api/classrooms/${formData.get('classroom_id')}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  revalidatePath('/')
  redirect('/classrooms')
}

export async function deleteStudent(formData){
  const token = cookies().get("token").value;
  const res = await fetch(`http://v1.attendance-sys.me/api/students/${formData.get('student_id')}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  revalidatePath('/')
  redirect(`/classrooms/${formData.get('classroom_id')}`)
}

export async function takeRoll(formData){
  const token = cookies().get("token").value;
  const data = {
    classroom_id: formData.get('classroom_id')
  }

  const res = await fetch(`http://v1.attendance-sys.me/api/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const record = await res.json()

  revalidatePath('/')
  redirect(`/classrooms/${formData.get('classroom_id')}/${record.id}`)
}

export async function present(formData) {
  const token = cookies().get("token").value;
  const data = {
    classroom_id: formData.get('classroom_id'),
    record_id: formData.get('record_id'),
    record_code: formData.get('record_code'),
  }

  const res = await fetch(`http://v1.attendance-sys.me/api/presents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  revalidatePath('/')
  redirect(`/classrooms/${formData.get('classroom_id')}`)
}