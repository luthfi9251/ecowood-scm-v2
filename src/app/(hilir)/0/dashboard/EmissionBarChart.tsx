'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { month: 'June', transportation: 186, production: 80 },
  { month: 'July', transportation: 305, production: 200 },
  { month: 'August', transportation: 237, production: 120 },
  { month: 'September', transportation: 73, production: 190 },
  { month: 'October', transportation: 209, production: 130 },
  { month: 'November', transportation: 214, production: 140 },
];

const chartConfig = {
  transportation: {
    label: 'Transportation',
    color: 'hsl(var(--chart-1))',
  },
  production: {
    label: 'Production',
    color: 'hsl(var(--chart-2))',
  },
};

export default function EmissionBarChart() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Carbon Footprint</CardTitle>
        <CardDescription>June - November 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="transportation"
              stackId="a"
              fill="var(--color-transportation)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="production"
              stackId="a"
              fill="var(--color-production)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Emission up by 12% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total carbon footprint for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
