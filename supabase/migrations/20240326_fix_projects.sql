-- Update the projects table structure
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS client_id BIGINT REFERENCES clients(id),
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Planning',
ADD COLUMN IF NOT EXISTS start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS end_date TIMESTAMP WITH TIME ZONE;

-- Create tasks table if it doesn't exist
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    assigned_to BIGINT REFERENCES users(id),
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_contents table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_contents (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    content TEXT,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_contents_project_id ON project_contents(project_id);