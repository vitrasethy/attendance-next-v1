import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { logout } from "@/components/logInOutAction";

export default function DropDownNavBar({ user }) {
  return (
    <>
      <div className={"hidden lg:block"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{user.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={"#"}>Profile</Link>
              </DropdownMenuItem>
              <form action={logout}>
                <button className={"w-full"} type={"submit"}>
                  <DropdownMenuItem className={"cursor-pointer"}>
                    Log Out
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={"lg:hidden"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={"#"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"#"}>Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
