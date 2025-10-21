"use client"
import { Toolbar } from "./toolbar";

interface WorkspaveIdLayoutProps{
    children:React.ReactNode
}
const WorkSpaceLayout = ({children}:WorkspaveIdLayoutProps) => {
    return (

        <div className="h-full"><Toolbar/>{children}</div>
      );
}
 
export default WorkSpaceLayout;