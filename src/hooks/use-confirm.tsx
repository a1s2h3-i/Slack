import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog";

import { JSX, useState } from "react"

export const useConfirm=(
    title:string,
    message:string,

):[()=>JSX.Element,()=>Promise<unknown>]=>{
    const [promise,setPromise]=useState<{resolve:(value:boolean)=>void}|null>(null);

    const confirm=()=>new Promise((resolve,reject)=>{
        setPromise({resolve});
    })

    const handleClose=()=>{
        setPromise(null);
        }
   

    const handleConfirm=()=>{
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel=()=>{
        promise?.resolve(false);
        handleClose();
    }
    const ConfirmDialog=()=>{
        return (
<Dialog open={promise!==null} onOpenChange={handleClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogDescription>
                {message}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">
                
Cancel
            </Button>
             <Button onClick={handleConfirm} variant="outline">
                
Confirm
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
        )
    }
     return [ConfirmDialog,confirm];
}
