"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import DashboardHome from "./dashboard/page";
import BioHackBoard from "./biohack/page";
import FinancesBoard from "./finances/page";
import HabitsBoard from "./habits/page";
import KitchenBoard from "./kitchen/page";
import LearnBoard from "./learn/page";
import PlanningBoard from "./planning/page";
import Sleepboard from "./sleep/page";
import SocialBoard from "./social/page";
import { StatistiqueBoard } from "./statistiques/page";
import TaskBoard from "./tasks/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

export function MainDashboardComponent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userLevel] = useState(5);
  const [userPoints] = useState(2500);

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
        <TabsList className="flex overflow-x-auto w-full space-x-2 lg:grid lg:grid-cols-4 xl:grid-cols-6 gap-2 p-2">
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
          <DashboardHome></DashboardHome>
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
