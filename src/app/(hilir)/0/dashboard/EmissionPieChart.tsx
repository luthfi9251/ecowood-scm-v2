'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

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

// const chartData = [
//     { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//     { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//     { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//     { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//     { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];
const chartData = [
  {
    mode: 'transportation',
    emission: 575,
    fill: 'var(--color-transportation)',
  },
  { mode: 'production', emission: 400, fill: 'var(--color-production)' },
];

const chartConfig = {
  emission: {
    label: 'Emmission',
  },
  transportation: {
    label: 'Transportation',
    color: 'hsl(var(--chart-1))',
  },
  production: {
    label: 'Production',
    color: 'hsl(var(--chart-2))',
  },
};

export default function EmissionPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Emission by Type</CardTitle>
        <CardDescription>June - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="w-full  pb-0 h-full flex items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="emission"
              nameKey="mode"
              innerRadius={60}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="mode" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Emission up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Emission for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
