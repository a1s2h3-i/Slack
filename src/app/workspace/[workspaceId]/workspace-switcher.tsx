import { Button } from "@/components/ui/button"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";


export const WorkSpaceSwitcher=()=>{
    const router=useRouter();
    const workspaceId=useWorkspaceId();
    const [_open,setOpen]=useCreateWorkspaceModal();

    const {data:workspace,isLoading:workspaceLoading}=useGetWorkspace({id:workspaceId});

    const {data:workspaces,isLoading:workspacesLoading}=useGetWorkspaces();


    const filteredWorkspaces=workspaces?.filter((workspace)=>workspace?._id!==workspaceId);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
            {workspaceLoading?(
                <Loader className="size-5 animate-spin shrink-0"/>
            ):(
                workspace?.name.charAt(0).toUpperCase()
            )}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64 bg-white rounded-md shadow-md p-2 space-y-1">
                <DropdownMenuItem
                onClick={()=>router.push(`/workspace/${workspaceId}`)}
                className="cursor-pointer flex flex-col items-start p-2 rounded hover:bg-gray-100">
                    <span className="font-medium capitalize">{workspace?.name}</span>
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
                </DropdownMenuItem>
                {filteredWorkspaces?.map((workspace)=>(
                    <DropdownMenuItem key={workspace._id} className="cursor-pointer capitalize flex items-center gap-3 p-2 rounded hover:bg-gray-100" onClick={()=>router.push(`/workspace/${workspace._id}`)}>
                <div>

                    {workspace.name.charAt(0).toUpperCase()}
                </div>
                <div className=" truncate size-9 relative overflow-hidden bg-[#616061] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                    {workspace.name.charAt(0).toUpperCase()}
                </div>
                <p className="truncate"> {workspace.name}</p>

                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="cursor-pointer flex items-center gap-3 p-2 rounded hover:bg-gray-100 " onClick={()=>setOpen(true)}>
                    <div className="size-9 relative overflow-hidden bg-[F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                        <Plus/>
                    </div>
                    <span>
                    Create a new workspace 
                    </span>
                </DropdownMenuItem>

                 </DropdownMenuContent>
            </DropdownMenu>
    )
}