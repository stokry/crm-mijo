"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, LayoutDashboard, Users, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Navbar() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/auth');
      toast({
        title: "Success",
        description: "You have been logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6" />
              <span className="font-bold text-xl">ProjectFlow</span>
            </Link>
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/projects" 
                  className="flex items-center space-x-2 text-sm font-medium hover:text-primary"
                >
                  <FolderKanban className="h-4 w-4" />
                  <span>Projects</span>
                </Link>
                <Link 
                  href="/clients" 
                  className="flex items-center space-x-2 text-sm font-medium hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  <span>Clients</span>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-muted-foreground hidden md:block">
                {user.email}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("light")}
              className="hidden dark:inline-flex"
            >
              <Sun className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("dark")}
              className="inline-flex dark:hidden"
            >
              <Moon className="h-5 w-5" />
            </Button>
            {user && (
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}