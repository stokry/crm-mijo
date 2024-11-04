"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export default function ProjectTasks({ projectId, tasks }: any) {
  const { toast } = useToast();
  const [projectTasks, setProjectTasks] = useState(tasks || []);

  const addTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          project_id: projectId,
          name: "New Task",
          status: "pending",
        },
      ])
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
      return;
    }

    setProjectTasks([...projectTasks, data[0]]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button onClick={addTask} size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        {projectTasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No tasks yet</p>
        ) : (
          <div className="space-y-4">
            {projectTasks.map((task: any) => (
              <div
                key={task.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-muted-foreground">{task.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}