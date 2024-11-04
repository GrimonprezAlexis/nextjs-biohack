"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function HabitsBoard() {
  const [habits, setHabits] = useState([
    {
      name: "Méditation",
      days: [false, true, true, false, true, false, false],
    },
    { name: "Exercice", days: [true, true, false, true, true, false, true] },
    { name: "Lecture", days: [false, true, true, true, false, true, false] },
    { name: "Journaling", days: [true, false, true, true, true, false, false] },
  ]);

  const toggleHabitDay = (habitIndex, dayIndex) => {
    const newHabits = [...habits];
    newHabits[habitIndex].days[dayIndex] =
      !newHabits[habitIndex].days[dayIndex];
    setHabits(newHabits);
    toast({
      title: "Habitude mise à jour",
      description: `Vous avez ${
        newHabits[habitIndex].days[dayIndex] ? "complété" : "décoché"
      } ${newHabits[habitIndex].name} pour ${
        [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ][dayIndex]
      }.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi des Habitudes</CardTitle>
        <CardDescription>
          Développez de bonnes habitudes et suivez votre progression.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.map((habit, habitIndex) => (
            <div key={habitIndex} className="flex items-center justify-between">
              <span>{habit.name}</span>
              <div className="flex space-x-1">
                {habit.days.map((completed, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleHabitDay(habitIndex, dayIndex)}
                  >
                    <Button
                      variant={completed ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      {["L", "M", "M", "J", "V", "S", "D"][dayIndex]}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
