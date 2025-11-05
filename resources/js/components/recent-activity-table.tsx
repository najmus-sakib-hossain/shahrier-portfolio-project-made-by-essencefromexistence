import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: number
  resource: string
  action: string
  title: string
  date: string
  user: string
}

interface RecentActivityTableProps {
  data: Activity[]
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No recent activity
                  </TableCell>
                </TableRow>
              ) : (
                data.slice(0, 10).map((activity) => (
                  <TableRow key={`${activity.resource}-${activity.id}-${activity.date}`}>
                    <TableCell className="font-medium">
                      {activity.resource}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={activity.action === "Created" ? "default" : "secondary"}
                        className="whitespace-nowrap"
                      >
                        {activity.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate @[800px]/card:max-w-none">
                      {activity.title}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(activity.date)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
