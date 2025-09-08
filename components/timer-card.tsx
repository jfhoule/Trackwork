'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/lib/data';
import { Project } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import { Input } from './ui/input';

export function TimerCard() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const toggle = async () => {
    if (running) {
      setRunning(false);
      const { error } = await supabase.from('time_entries').insert({
        project_id: selectedProject,
        duration: seconds,
        description: description,
        date: new Date().toISOString(),
      });
      if (error) {
        console.error('Error creating time entry:', error);
      }
      setSeconds(0);
      setDescription('');
      setSelectedProject('');
    } else {
      setRunning(true);
    }
  };

  const reset = () => {
    setSeconds(0);
    setRunning(false);
  };

  const time = new Date(seconds * 1000).toISOString().substring(11, 19);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <select
          className="h-9 rounded-md border px-2 py-1"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="w-24 font-mono text-2xl">{time}</div>
        <Button onClick={toggle} disabled={!selectedProject}>{running ? 'Stop' : 'Start'}</Button>
        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}

