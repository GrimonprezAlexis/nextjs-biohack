"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Droplets, List, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Line,
  CartesianGrid as RechartsCartesianGrid,
  Legend as RechartsLegend,
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "../ui/chart";
import { Switch } from "../ui/swtich";

export default function DashboardHome() {
  const [productivityScore, setProductivityScore] = useState(75);
  const [sleepScore, setSleepScore] = useState(80);
  const [hydrationScore, setHydrationScore] = useState(60);
  const [completedTasks, setCompletedTasks] = useState(15);
  const [totalTasks] = useState(20);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const trendData = [
    { day: "Lun", productivity: 70, sleep: 75, hydration: 55 },
    { day: "Mar", productivity: 75, sleep: 80, hydration: 60 },
    { day: "Mer", productivity: 72, sleep: 78, hydration: 58 },
    { day: "Jeu", productivity: 78, sleep: 82, hydration: 62 },
    { day: "Ven", productivity: 80, sleep: 85, hydration: 65 },
    { day: "Sam", productivity: 76, sleep: 79, hydration: 59 },
    { day: "Dim", productivity: 73, sleep: 77, hydration: 57 },
  ];

  useEffect(() => {
    // Simuler la mise à jour des scores toutes les 5 secondes
    const interval = setInterval(() => {
      setProductivityScore((prev) =>
        Math.min(100, prev + Math.floor(Math.random() * 5))
      );
      setSleepScore((prev) =>
        Math.min(100, prev + Math.floor(Math.random() * 3))
      );
      setHydrationScore((prev) =>
        Math.min(100, prev + Math.floor(Math.random() * 4))
      );
      setCompletedTasks((prev) => Math.min(totalTasks, prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalTasks]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{productivityScore}%</span>
            </div>
            <Progress value={productivityScore} className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sommeil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <Moon className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{sleepScore}%</span>
            </div>
            <Progress value={sleepScore} className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hydratation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{hydrationScore}%</span>
            </div>
            <Progress value={hydrationScore} className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tâches complétées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <List className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <Progress
              value={(completedTasks / totalTasks) * 100}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tendances</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              productivity: {
                label: "Productivité",
                color: "hsl(var(--chart-1))",
              },
              sleep: {
                label: "Sommeil",
                color: "hsl(var(--chart-2))",
              },
              hydration: {
                label: "Hydratation",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={trendData}>
                <RechartsCartesianGrid strokeDasharray="3 3" />
                <RechartsXAxis dataKey="day" />
                <RechartsYAxis />
                <RechartsTooltip />
                <RechartsLegend />
                <RechartsLine
                  type="monotone"
                  dataKey="productivity"
                  stroke="var(--color-productivity)"
                  name="Productivité"
                />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="var(--color-sleep)"
                  name="Sommeil"
                />
                <Line
                  type="monotone"
                  dataKey="hydration"
                  stroke="var(--color-hydration)"
                  name="Hydratation"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Activer les notifications</span>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Mode sombre</span>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
