"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RecentProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          clients (
            name
          ),
          tasks (
            id
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tasks</TableHead>
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
            <TableCell>{project.tasks?.length || 0}</TableCell>
            <TableCell>
              <Link href={`/projects/${project.id}`}>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}