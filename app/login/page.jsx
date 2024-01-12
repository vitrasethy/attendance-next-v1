import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
    <>
      <div className="flex flex-col space-y-4 items-center justify-center h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"
             viewBox="0 0 448 512">
          <path
            d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/>
        </svg>
        <Card className={'p-4 w-[24rem]'}>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Please enter your account info.</CardDescription>
          </CardHeader>
          <LoginForm/>
        </Card>
      </div>
    </>
  );
}
