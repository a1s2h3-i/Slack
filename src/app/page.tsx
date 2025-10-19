"use client"
import Image from "next/image";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";


export default function Home() {
  const {signOut}=useAuthActions();
  return (
 <>
Logged In
<Button onClick={()=>signOut()}>
Sign Out

</Button>
 </>
 
  );
}
