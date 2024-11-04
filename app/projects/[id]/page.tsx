import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ListTodo, Paperclip } from "lucide-react";

async function getProject(id: string) {
  const { data: project } = await supabase
    .from("projects")
    .select(`
      *,
      client:clients (
        name,
        email,
        phone
      ),
      tasks (
        *
      ),
      project_contents (
        *
      )
    `)
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return project;
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{project.name}</CardTitle>
          <p className="text-muted-foreground">{project.description}</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">
                <FileText className="w-4 h-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <ListTodo className="w-4 h-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="files">
                <Paperclip className="w-4 h-4 mr-2" />
                Files & Attachments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Client Information</h3>
                  <p>Client: {project.client?.name}</p>
                  <p>Email: {project.client?.email}</p>
                  <p>Phone: {project.client?.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Project Status</h3>
                  <p>Status: {project.status}</p>
                  <p>Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                  {project.end_date && (
                    <p>End Date: {new Date(project.end_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <div className="space-y-4">
                {project.tasks?.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{task.name}</h4>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="mt-2">
                        <span className="text-sm bg-secondary px-2 py-1 rounded">
                          {task.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="files" className="mt-4">
              <div className="space-y-4">
                {project.project_contents?.map((content) => (
                  <Card key={content.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{content.content}</h4>
                          {content.attachment_url && (
                            <a 
                              href={content.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline"
                            >
                              View Attachment
                            </a>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(content.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}