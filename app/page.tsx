import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Trackwork</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use the navigation to manage your time tracking.
        </p>
      </CardContent>
    </Card>
  )
}
