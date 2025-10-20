"use client"
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useState } from "react";



export const CreateWorkspaceModal=()=>{
    const [open,setOpen]=useCreateWorkspaceModal();
    const [name,setName]=useState("")
    const {mutate,isPending}=useCreateWorkspace();
    const router = useRouter();



    const handleClose=()=>{
        setOpen(false);
        setName("");
    }
const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    mutate({name},{
onSuccess(id){
    toast.success("workspace created")
    router.push(`/workspace/${id}`);
    handleClose();
}
    })
  
}

    return (

        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a Workspace
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={name} onChange={(e)=>setName(e.target.value)} disabled={isPending} required autoFocus minLength={3} placeholder="Workspace name e.g. 'Work','Personal'"/>
                     <div className="flex justify-end">
                        <Button disabled={isPending}>Create</Button>
                     </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}