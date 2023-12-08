import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<WelcomeMssgFallback/>}>
      <WelcomeMssg />
    </Suspense>
  )

  async function WelcomeMssg() {
    const user = await currentUser();
    await wait(3000);
    if (!user) {
      return <div>sheeeeeshhh big error</div>
    }
    
    return(
      <div className="flex w-full">
        <h1 className="text-4xl font-bold">HELLO THERE, <br /> {user.firstName} {user.lastName}</h1>
      </div>
    );
  }

  function WelcomeMssgFallback() {
    return(
      <div className="flex w-full">
        <div className="text-4xl font-bold">
          <Skeleton className="w-[150px] h-[36px]" />
          <Skeleton className="w-[150px] h-[36px]" />
        </div>
      </div>
    );
  }
}
