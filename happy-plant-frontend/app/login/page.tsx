"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { searchUserByName, createUser } from "@/services/userService";

export default function CardWithForm() {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [userExists, setUserExists] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setError(null);

      const userData = await searchUserByName(name);
      if (userData) {
        setUserExists(true);
        // TODO: Load the dashboard page.
      }
    } catch (error) {
      try {
        const newUser = await createUser(name);
        setUserExists(true);
        // User created.
        // TODO: Load the dashboard page.
      } catch (createError) {
        setError("Failed creating user.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>What's your name?</CardTitle>
          <CardDescription>
            Pick a unique name. If you already have an account, we'll log you
            in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. BobbyB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
