"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectOverview({ project }: any) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium">Description</dt>
              <dd className="text-muted-foreground">{project.description}</dd>
            </div>
            <div>
              <dt className="font-medium">Start Date</dt>
              <dd className="text-muted-foreground">
                {new Date(project.start_date).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="font-medium">End Date</dt>
              <dd className="text-muted-foreground">
                {new Date(project.end_date).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium">Name</dt>
              <dd className="text-muted-foreground">{project.client?.name}</dd>
            </div>
            <div>
              <dt className="font-medium">Email</dt>
              <dd className="text-muted-foreground">{project.client?.email}</dd>
            </div>
            <div>
              <dt className="font-medium">Phone</dt>
              <dd className="text-muted-foreground">{project.client?.phone}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}