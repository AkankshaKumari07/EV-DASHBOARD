import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="md:text-lg text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="md:text-3xl text-2xl font-bold mb-1">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

