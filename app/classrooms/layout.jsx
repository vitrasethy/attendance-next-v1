import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  if (!cookies().has("token")) redirect("/login");

  return <section>{children}</section>;
}
