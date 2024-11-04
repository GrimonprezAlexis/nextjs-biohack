"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Check, Droplets, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Méditer pendant 10 minutes", completed: false },
    { id: 2, text: "Faire 30 minutes d'exercice", completed: true },
    { id: 3, text: "Lire 20 pages", completed: false },
    { id: 4, text: "Préparer un repas équilibré", completed: true },
  ]);

  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomoderoActive, setIsPomodoroActive] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [goalProgress, setGoalProgress] = useState(65);
  const [waterIntake, setWaterIntake] = useState(0);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startPomodoro = () => {
    setIsPomodoroActive(true);
    const interval = setInterval(() => {
      setPomodoroTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          setIsPomodoroActive(false);
          return 25 * 60;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const breakPomodoro = () => {
    setIsPomodoroActive(false);
    clearInterval(pomodoroTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Tâches du jour</CardTitle>
          <CardDescription>
            Gérez vos tâches quotidiennes et améliorez votre productivité.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Nouvelle tâche"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={addTask}>
              <PlusCircle className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-2 bg-secondary rounded"
              >
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    task.completed ? "text-green-500" : "text-gray-400"
                  }
                  onClick={() => toggleTask(task.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-4">
              {formatTime(pomodoroTime)}
            </div>
            <div className="inline-flex gap-2">
              <Button onClick={startPomodoro} disabled={isPomoderoActive}>
                {isPomoderoActive ? "En cours..." : "Démarrer"}
              </Button>
              {isPomoderoActive && (
                <Button onClick={breakPomodoro}>Pause</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progression des objectifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Méditation quotidienne</span>
              <span>{goalProgress}%</span>
            </div>
            <Progress value={goalProgress} className="w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Suivi de l&apos;eau</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Objectif : 2L</span>
              <span>{waterIntake}L</span>
            </div>
            <Progress value={(waterIntake / 2) * 100} className="w-full" />
            <Button
              onClick={() => setWaterIntake((prev) => Math.min(prev + 0.25, 2))}
            >
              <Droplets className="mr-2 h-4 w-4" />
              Ajouter 250ml
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
