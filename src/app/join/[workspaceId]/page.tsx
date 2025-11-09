"use client"


import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import VerificationInput from "react-verification-input"
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info'
import { Id } from '../../../../convex/_generated/dataModel'
import { Loader } from 'lucide-react'
import { useJoin } from '@/features/workspaces/api/use-join'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'



const JoinPage = () => {
    const router=useRouter();
  const workspaceId = useWorkspaceId();

// Only call the query if we have a valid workspaceId
// const { data, isLoading } = useGetWorkspaceInfo(
//   workspaceId ? { id: workspaceId } : "skip"
// );
const {data,isLoading}=useGetWorkspaceInfo({id:workspaceId});


const isMember=useMemo(()=>
    data?.isMember

,[data?.isMember])

useEffect(()=>{
if(isMember){
    router.push(`/workspace/${workspaceId}`)
}
},[])
const {mutate,isPending}=useJoin();
console.log("workspace id :" ,workspaceId)

const handleComplete=(value:string)=>{
    mutate({workspaceId,joinCode:value},{
        onSuccess:(id)=>{
            router.replace(`/workspace/${id}`)
            toast.success("Workspace joined")
        },
        onError:()=>{
            toast.error("Failed to join workspace")
        }
    })
}

if(isLoading){
    return (
        <div className='flex items-center justify-center h-screen'>
            <Loader className='size-6 animate-spin text-muted-foreground justify-center'/>

        </div>
    )
}






  return (
    <div className='min-h-screen h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md'>JoinPage
    
   <Image src="/hashtag-svgrepo-com.svg" width={60} height={60} alt="Logo"/> 
   <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
    <div className='flex flex-col gap-y-2 items-center justify-center'>

        <h1 className='text-2xl font-bold'>

            Join {data?.name}
        </h1>
        <p className='text-md text-muted-foreground'>
            Enter workspace code to join
        </p>
    </div>
    <VerificationInput onComplete={handleComplete} length={6} classNames={{container:cn("flex-gap-2",isPending&&"opacity-50 cursor-not-allowed"),character:"uppercase-h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",characterInactive
        :"bg-muted",characterSelected:"bg-white text-black",characterFilled:"bg-white text-black"
    }} autoFocus/>
   </div>

   <div className='flex gap-x-4'>

    <Button size="lg" variant="outline" asChild>
        <Link href="/">Back to Home</Link>
    </Button>
   </div>
    </div>

  )
}

export default JoinPage