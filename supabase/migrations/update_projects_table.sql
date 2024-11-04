-- Drop the existing projects table if it exists
DROP TABLE IF EXISTS projects CASCADE;

-- Create the projects table with all required columns
CREATE TABLE projects (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT,
    client_id BIGINT REFERENCES clients(id),
    status TEXT NOT NULL DEFAULT 'Planning',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);