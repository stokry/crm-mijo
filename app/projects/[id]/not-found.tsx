import { Card, CardContent } from "@/components/ui/card";

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto p-6">
      <Card className="w-full text-center py-12">
        <CardContent>
          <h2 className="text-2xl font-semibold">Project not found</h2>
          <p className="text-muted-foreground mt-2">
            The project you're looking for doesn't exist or you don't have access to it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}