"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartData } from "../types/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"


interface BarChartProps {
  data: ChartData[]
  title: string
  description: string
}

export function BarChartComponent({ data, title, description }: BarChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
            <Bar dataKey="value" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

