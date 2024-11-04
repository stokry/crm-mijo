"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export default function ProjectFiles({ projectId, files }: any) {
  const { toast } = useToast();
  const [projectFiles, setProjectFiles] = useState(files || []);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${projectId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-files")
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
      return;
    }

    const { data: urlData } = supabase.storage
      .from("project-files")
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from("project_contents")
      .insert([
        {
          project_id: projectId,
          content: file.name,
          attachment_url: urlData.publicUrl,
        },
      ])
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save file information",
        variant: "destructive",
      });
      return;
    }

    setProjectFiles([...projectFiles, data[0]]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Files & Attachments</CardTitle>
        <div>
          <Input
            type="file"
            onChange={uploadFile}
            className="hidden"
            id="file-upload"
          />
          <Button asChild size="sm">
            <label htmlFor="file-upload" className="cursor-pointer">
              <PlusIcon className="h-4 w-4 mr-2" />
              Upload File
            </label>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {projectFiles.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No files uploaded yet</p>
        ) : (
          <div className="space-y-4">
            {projectFiles.map((file: any) => (
              <div
                key={file.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{file.content}</h4>
                  <a
                    href={file.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}