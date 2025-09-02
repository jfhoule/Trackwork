'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function TimerCard() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const toggle = () => setRunning((r) => !r);
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
        <select className="h-9 rounded-md border px-2 py-1">
          <option>Select project</option>
        </select>
        <div className="w-24 font-mono text-2xl">{time}</div>
        <Button onClick={toggle}>{running ? 'Stop' : 'Start'}</Button>
        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
