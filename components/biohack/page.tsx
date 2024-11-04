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
import { Switch } from "@radix-ui/react-switch";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Activity, BookOpen, Brain, Plus, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "../ui/chart";

export default function BioHackBoard() {
  const [biomarkers, setBiomarkers] = useState({
    stress: 60,
    sleep: 75,
    energy: 80,
    focus: 70,
    recovery: 65,
  });

  const [routines, setRoutines] = useState([
    { id: 1, name: "Méditation matinale", duration: 15, completed: false },
    { id: 2, name: "Douche froide", duration: 5, completed: true },
    { id: 3, name: "Jeûne intermittent", duration: 960, completed: false },
  ]);

  const [supplements, setSupplements] = useState([
    { id: 1, name: "Oméga-3", dosage: "1000mg", frequency: "Quotidien" },
    { id: 2, name: "Vitamine D", dosage: "5000UI", frequency: "Quotidien" },
    {
      id: 3,
      name: "Magnésium",
      dosage: "400mg",
      frequency: "Avant le coucher",
    },
  ]);

  const [experimentLog, setExperimentLog] = useState([
    {
      id: 1,
      date: "2024-11-01",
      experiment: "Jeûne de 24h",
      results: "Augmentation de l'énergie, meilleure clarté mentale",
    },
    {
      id: 2,
      date: "2024-11-03",
      experiment: "Méditation 2x par jour",
      results: "Réduction du stress, amélioration du sommeil",
    },
  ]);

  const [connectedDevices, setConnectedDevices] = useState([
    { id: 1, name: "Oura Ring", connected: true },
    { id: 2, name: "Whoop", connected: false },
    { id: 3, name: "Biosense", connected: true },
  ]);

  const biomarkerHistory = [
    { date: "Lun", stress: 65, sleep: 70, energy: 75, focus: 68, recovery: 62 },
    { date: "Mar", stress: 62, sleep: 72, energy: 78, focus: 71, recovery: 64 },
    { date: "Mer", stress: 58, sleep: 76, energy: 82, focus: 73, recovery: 67 },
    { date: "Jeu", stress: 60, sleep: 75, energy: 80, focus: 70, recovery: 65 },
    { date: "Ven", stress: 59, sleep: 77, energy: 81, focus: 72, recovery: 66 },
    { date: "Sam", stress: 57, sleep: 78, energy: 83, focus: 74, recovery: 68 },
    { date: "Dim", stress: 56, sleep: 79, energy: 84, focus: 75, recovery: 69 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBiomarkers((prev) => ({
        stress: Math.max(
          0,
          Math.min(100, prev.stress + (Math.random() - 0.5) * 5)
        ),
        sleep: Math.max(
          0,
          Math.min(100, prev.sleep + (Math.random() - 0.5) * 5)
        ),
        energy: Math.max(
          0,
          Math.min(100, prev.energy + (Math.random() - 0.5) * 5)
        ),
        focus: Math.max(
          0,
          Math.min(100, prev.focus + (Math.random() - 0.5) * 5)
        ),
        recovery: Math.max(
          0,
          Math.min(100, prev.recovery + (Math.random() - 0.5) * 5)
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addRoutine = () => {
    const newRoutine = {
      id: Date.now(),
      name: "Nouvelle routine",
      duration: 10,
      completed: false,
    };
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
    toast({
      title: "Routine ajoutée",
      description: "Votre nouvelle routine a été ajoutée avec succès.",
    });
  };

  const toggleRoutineCompletion = (id: number) => {
    setRoutines((prevRoutines) =>
      prevRoutines.map((routine) =>
        routine.id === id
          ? { ...routine, completed: !routine.completed }
          : routine
      )
    );
  };

  const addSupplement = () => {
    const newSupplement = {
      id: Date.now(),
      name: "Nouveau supplément",
      dosage: "",
      frequency: "Quotidien",
    };
    setSupplements((prevSupplements) => [...prevSupplements, newSupplement]);
    toast({
      title: "Supplément ajouté",
      description: "Votre nouveau supplément a été ajouté avec succès.",
    });
  };

  const addExperiment = () => {
    const newExperiment = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      experiment: "",
      results: "",
    };
    setExperimentLog((prevLog) => [newExperiment, ...prevLog]);
    toast({
      title: "Expérience ajoutée",
      description: "Votre nouvelle expérience a été ajoutée au journal.",
    });
  };

  const toggleDeviceConnection = (id: number) => {
    setConnectedDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, connected: !device.connected } : device
      )
    );
    const device = connectedDevices.find((d) => d.id === id);
    if (device) {
      toast({
        title: device.connected ? "Appareil déconnecté" : "Appareil connecté",
        description: `${device.name} a été ${
          device.connected ? "déconnecté" : "connecté"
        } avec succès.`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <h1 className="text-3xl font-bold mb-6">BioHack Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Biomarqueurs</CardTitle>
          <CardDescription>
            Suivi en temps réel de vos indicateurs clés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(biomarkers).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <span className="text-lg font-semibold mb-2 capitalize">
                  {key}
                </span>
                <Progress value={value} className="w-full" />
                <span className="mt-1">{value.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Historique des biomarqueurs</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              stress: { label: "Stress", color: "hsl(var(--chart-1))" },
              sleep: { label: "Sommeil", color: "hsl(var(--chart-2))" },
              energy: { label: "Énergie", color: "hsl(var(--chart-3))" },
              focus: { label: "Concentration", color: "hsl(var(--chart-4))" },
              recovery: { label: "Récupération", color: "hsl(var(--chart-5))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={biomarkerHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="var(--color-stress)"
                  name="Stress"
                />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="var(--color-sleep)"
                  name="Sommeil"
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="var(--color-energy)"
                  name="Énergie"
                />
                <Line
                  type="monotone"
                  dataKey="focus"
                  stroke="var(--color-focus)"
                  name="Concentration"
                />
                <Line
                  type="monotone"
                  dataKey="recovery"
                  stroke="var(--color-recovery)"
                  name="Récupération"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Routines de Biohacking</CardTitle>
            <CardDescription>
              Planifiez et suivez vos routines quotidiennes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {routines.map((routine) => (
                <motion.li
                  key={routine.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={routine.completed ? "line-through" : ""}>
                    {routine.name} ({routine.duration}min)
                  </span>
                  <Switch
                    checked={routine.completed}
                    onCheckedChange={() => toggleRoutineCompletion(routine.id)}
                  />
                </motion.li>
              ))}
            </ul>
            <Button onClick={addRoutine} className="mt-4 w-full">
              <Plus className="mr-2 h-4 w-4" /> Ajouter une routine
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suppléments et Interventions</CardTitle>
            <CardDescription>
              Gérez vos suppléments et interventions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {supplements.map((supplement) => (
                <motion.li
                  key={supplement.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{supplement.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {supplement.dosage} - {supplement.frequency}
                  </span>
                </motion.li>
              ))}
            </ul>
            <Button onClick={addSupplement} className="mt-4 w-full">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un supplément
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recommandations Personnalisées</CardTitle>
          <CardDescription>Basées sur vos données et objectifs</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Zap className="mr-2 h-5 w-5 mt-0.5 text-yellow-500" />
              <span>
                Augmentez votre exposition à la lumière naturelle le matin pour
                améliorer votre cycle circadien.
              </span>
            </li>
            <li className="flex items-start">
              <Activity className="mr-2 h-5 w-5 mt-0.5 text-green-500" />
              <span>
                Intégrez des exercices de respiration profonde pour réduire
                votre niveau de stress.
              </span>
            </li>
            <li className="flex items-start">
              <Brain className="mr-2 h-5 w-5 mt-0.5 text-blue-500" />
              <span>
                Essayez la technique de Pomodoro pour améliorer votre
                concentration et votre productivité.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Journal d&apos;Expérimentation</CardTitle>
          <CardDescription>
            Enregistrez et analysez vos expériences de biohacking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {experimentLog.map((experiment) => (
              <motion.li
                key={experiment.id}
                className="p-2 bg-secondary rounded"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{experiment.experiment}</span>
                  <span className="text-sm text-muted-foreground">
                    {experiment.date}
                  </span>
                </div>
                <p className="text-sm">{experiment.results}</p>
              </motion.li>
            ))}
          </ul>
          <Button onClick={addExperiment} className="mt-4 w-full">
            <Plus className="mr-2 h-4 w-4" /> Ajouter une expérience
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Éducation Biohacking</CardTitle>
            <CardDescription>
              Ressources et articles pour approfondir vos connaissances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <motion.li
                className="flex items-center justify-between p-2 bg-secondary rounded cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Introduction au biohacking</span>
                <BookOpen className="h-4 w-4" />
              </motion.li>
              <motion.li
                className="flex items-center justify-between p-2 bg-secondary rounded cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Optimisation du sommeil</span>
                <BookOpen className="h-4 w-4" />
              </motion.li>
              <motion.li
                className="flex items-center justify-between p-2 bg-secondary rounded cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Nutrition et performance cognitive</span>
                <BookOpen className="h-4 w-4" />
              </motion.li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appareils Connectés</CardTitle>
            <CardDescription>
              Gérez vos appareils de santé connectés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {connectedDevices.map((device) => (
                <motion.li
                  key={device.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{device.name}</span>
                  <Switch
                    checked={device.connected}
                    onCheckedChange={() => toggleDeviceConnection(device.id)}
                  />
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
