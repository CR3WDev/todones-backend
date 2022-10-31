create schema todones;

create table todones.tasks(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text not null,
    content text not null,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);