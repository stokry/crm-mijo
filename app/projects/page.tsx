"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          clients (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.clients?.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "success"
                      : project.status === "In Progress"
                      ? "default"
                      : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(project.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}