"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartData } from "../types/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle   } from "./ui/card"

interface YearTrendChartProps {
  data: ChartData[]
}

export function YearTrendChart({ data }: YearTrendChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>EV Adoption Trend</CardTitle>
        <CardDescription>Number of EVs registered by year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Line type="monotone" dataKey="value" stroke="#adfa1d" strokeWidth={2} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

