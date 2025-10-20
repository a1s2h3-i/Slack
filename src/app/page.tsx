"use client"
import Image from "next/image";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { useAuthActions } from "@convex-dev/auth/react";
import { UserButton } from "@/features/auth/components/user-button";


export default function Home() {
  const {signOut}=useAuthActions();
  return (
 <>
<div>
<UserButton/>
</div>
 </>
 
  );
}
