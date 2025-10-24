import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace"
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace"
import { useConfirm } from "@/hooks/use-confirm"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface PreferencesModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  initialValue: string
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
    const workspaceId=useWorkspaceId();
    const[ConfirmDialog,confirm]=useConfirm("Are you Sure","action is irreversible");
    
  const [value, setValue] = useState(initialValue)
  const [editOpen,setEditOpen]=useState(false);
  const router=useRouter();

  const {mutate:updateWorkspace,isPending:isUpdatingWorkspace}=useUpdateWorkspace();
   const {mutate:removeWorkspace,isPending:isRemovingWorkspace}=useRemoveWorkspace();
const handleRemove=async()=>{
    const ok=await confirm();
    if(!ok){
        return;
    }

  

    removeWorkspace({
        id:workspaceId
    },{
         onSuccess:()=>{

            toast.success("workspace removed");
         router.replace("/");

        },
        onError:()=>{
            toast.error("failed to remove workspace");
        }

    })

}
   const handleEdit=async(e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();
    const ok=await confirm();
    updateWorkspace({
        id:workspaceId,
        name:value,


    },{
        onSuccess:()=>{

            toast.success("workspace updated");
            setEditOpen(false);

        },
        onError:()=>{
            toast.error("failed to update workspace");
        }
    })
   }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <>
    <ConfirmDialog/>
   <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="p-0 bg-gray-50 overflow-hidden">
    <DialogHeader className="p-4 border-b bg-white">
      <DialogTitle>{value}</DialogTitle>
    </DialogHeader>

    <div className="px-4 pb-4 flex flex-col gap-y-2">
      {/* Edit (rename) dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <div className="px-5 py-4 bg-white rounded-lg border hover:bg-gray-50">
          {/* Row 1: Workspace name + Edit */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Workspace name</p>

            {/* ✅ Only this Edit text acts as DialogTrigger */}
            <DialogTrigger asChild>
              <p className="text-sm text-[#1264a3] hover:underline font-semibold cursor-pointer">
                Edit
              </p>
            </DialogTrigger>
          </div>

          {/* Row 2: Current workspace name */}
          <p className="text-sm text-gray-700 mb-4">{value}</p>

          {/* Row 3: Delete workspace button */}
          <div>
            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="w-full flex items-center justify-center gap-x-2 px-5 py-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </div>

        {/* Rename dialog content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename this workspace</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleEdit}>
            <Input
              value={value}
              disabled={isUpdatingWorkspace}
              onChange={(e) => setValue(e.target.value)}
              required
              autoFocus
              minLength={3}
              maxLength={80}
              placeholder="Workspace name, e.g. 'Work', 'Personal'"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isUpdatingWorkspace}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isUpdatingWorkspace}>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </DialogContent>
</Dialog>

    </>
  )
}
