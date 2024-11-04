"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
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
import HabitsBoard from "./habits/page";
import PlanningBoard from "./planning/page";
import TaskBoard from "./tasks/page";
import { ChartContainer } from "./ui/chart";
import { Switch } from "./ui/swtich";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FinancesBoard from "./finances/page";
import Sleepboard from "./sleep/page";
import LearnBoard from "./learn/page";
import SocialBoard from "./social/page";
import KitchenBoard from "./kitchen/page";
import BioHackBoard from "./biohack/page";
import { StatistiqueBoard } from "./statistiques/page";

export function MainDashboardComponent() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [productivityScore, setProductivityScore] = useState(75);
  const [sleepScore, setSleepScore] = useState(80);
  const [hydrationScore, setHydrationScore] = useState(60);
  const [completedTasks, setCompletedTasks] = useState(15);
  const [totalTasks] = useState(20);
  const [userLevel] = useState(5);
  const [userPoints] = useState(2500);
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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <header className="flex items-center justify-between mb-6">
        <motion.h1
          className="text-3xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <a href="/">BioProd Dashboard</a>
        </motion.h1>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Niveau {userLevel}</Badge>
          <Badge>{userPoints} pts</Badge>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* MENU =========== */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-flow-col gap-2">
          <TabsTrigger value="tasks">Tâches</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="habits">Habitudes</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
          <TabsTrigger value="biohack">BioHack</TabsTrigger>
          <TabsTrigger value="sleep">Sommeil</TabsTrigger>
          <TabsTrigger value="learn">Apprendre</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="kitchen">Cuisine</TabsTrigger>
          <TabsTrigger value="statistique">Statistique</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Productivité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold">
                    {productivityScore}%
                  </span>
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
        </TabsContent>

        <TabsContent value="tasks">
          <TaskBoard></TaskBoard>
        </TabsContent>

        <TabsContent value="planning">
          <PlanningBoard></PlanningBoard>
        </TabsContent>

        <TabsContent value="habits">
          <HabitsBoard></HabitsBoard>
        </TabsContent>

        <TabsContent value="finances">
          <FinancesBoard></FinancesBoard>
        </TabsContent>

        <TabsContent value="biohack">
          <BioHackBoard></BioHackBoard>
        </TabsContent>

        <TabsContent value="sleep">
          <Sleepboard></Sleepboard>
        </TabsContent>

        <TabsContent value="learn">
          <LearnBoard></LearnBoard>
        </TabsContent>

        <TabsContent value="social">
          <SocialBoard></SocialBoard>
        </TabsContent>

        <TabsContent value="kitchen">
          <KitchenBoard></KitchenBoard>
        </TabsContent>

        <TabsContent value="statistique">
          <StatistiqueBoard></StatistiqueBoard>
        </TabsContent>
      </Tabs>

      {/* <nav>
        <ul className="space-y-2">
          {[
            "Tâches",
            "Planning",
            "Habitudes",
            "Finances",
            "BioHack",
            "Sommeil",
            "Apprentissage",
            "Social",
          ].map((page, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="w-full justify-between">
                {page}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav> */}
    </motion.div>
  );
}
