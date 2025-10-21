
"use client"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useParams } from "next/navigation";
const WorkSpaceIdPage = () => {

    const workspaceId=useWorkspaceId();
    const {data}=useGetWorkspace({id:workspaceId})
    
    return (<div>

   Workspace id page
    </div> );
}
 
export default WorkSpaceIdPage;