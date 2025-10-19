"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useState, useEffect } from "react";
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();
  const token = useAuthToken();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,seterror]=useState("");
  const [pending,setpending]=useState(false);

  const onPasswordSignIn=(e:React.FormEvent)=>{
    e.preventDefault();

    setpending(true);
    signIn("password",{email,password,flow:"signIn"}).catch(()=>{
   seterror("Invalid email or password");
    }).finally(()=>{
        setpending(false);
    })
  }

  // Redirect if already authenticated (i.e., token exists)
  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  const onProviderSignIn = (provider: "github" | "google") => {
    setpending(true);
    signIn(provider).finally(()=>{
        setpending(false);
    })
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Log In To Continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error&&(

        <div className="bg-destructive/15 p-3 rounded-md flex-items-center gap-x-2 text-sm text-destructive mb-6">
<TriangleAlert className="size-4"/>
<p>{error}</p>

        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form  onSubmit={onPasswordSignIn} className="space-y-4">
          <Input
          disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
          disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
          disabled={pending}
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignIn("google")}
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
          disabled={pending}
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignIn("github")}
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
