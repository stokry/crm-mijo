"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectOverview from "./ProjectOverview";
import ProjectTasks from "./ProjectTasks";
import ProjectFiles from "./ProjectFiles";

interface ProjectDetailsProps {
  project: {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    client: {
      name: string;
      email: string;
      phone: string;
    };
    tasks: any[];
    project_contents: any[];
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <ProjectOverview project={project} />
            </TabsContent>
            <TabsContent value="tasks">
              <ProjectTasks projectId={project.id} tasks={project.tasks} />
            </TabsContent>
            <TabsContent value="files">
              <ProjectFiles projectId={project.id} files={project.project_contents} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}