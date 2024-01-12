import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function NoData() {
  return (
    <Alert className={'w-[90vw] lg:w-[50vw] mx-auto'}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd"
              d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
              clipRule="evenodd"/>
      </svg>
      <AlertTitle>No student in this class</AlertTitle>
      <AlertDescription>
        Please share the code to your students.
      </AlertDescription>
    </Alert>
  )
}