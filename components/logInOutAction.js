"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function login(prevState, formData){
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const res = await fetch("http://v1.attendance-sys.me/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json()
    console.log(msg)
    return { message: msg.errors}
  }

  const resData = await res.json();

  cookies().set("token", resData.token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  redirect('/classrooms')
}

export async function logout(){
  cookies().delete("token")
  redirect('/')
}

export async function register(prvState, formData){
  const data = {
    name: formData.get('name'),
    gender: formData.get('gender'),
    email: formData.get('email'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  }

  const res = await fetch("http://v1.attendance-sys.me/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json()
    console.log(msg)
    return { message: msg.errors}
  }

  const resData = await res.json();

  cookies().set("token", resData.token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  redirect('/classrooms')
}