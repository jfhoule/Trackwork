import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Time Tracking Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This page is under construction. Reports functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}