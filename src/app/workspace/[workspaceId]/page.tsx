
interface WorkspaveIdPageProps{
    params:{workspaceId:string}
}
const WorkSpaceIdPage = ({params}:WorkspaveIdPageProps) => {
    return (<div>

        Id:{params.workspaceId}
    </div> );
}
 
export default WorkSpaceIdPage;