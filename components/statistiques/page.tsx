import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Zap,
  Utensils,
  Moon,
  BookOpen,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { ChartContainer, ChartLegend, ChartTooltip } from "../ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function StatistiqueBoard() {
  const productivityData = [
    { day: "Lun", score: 65 },
    { day: "Mar", score: 70 },
    { day: "Mer", score: 75 },
    { day: "Jeu", score: 72 },
    { day: "Ven", score: 80 },
    { day: "Sam", score: 85 },
    { day: "Dim", score: 78 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Score de Productivité
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78%</div>
          <Progress value={78} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            +2% par rapport à la semaine dernière
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tâches Complétées
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24/30</div>
          <Progress value={80} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            80% des tâches prévues
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Score de Sommeil
          </CardTitle>
          <Moon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <Progress value={85} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            7.5 heures en moyenne
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Économies</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">350 €</div>
          <Progress value={70} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            70% de l&apos;objectif mensuel
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Évolution de la Productivité</CardTitle>
          <CardDescription>
            Votre score de productivité sur les 7 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              score: {
                label: "Score",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip />
                <ChartLegend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-score)"
                  name="Score de Productivité"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prochaines Actions</CardTitle>
          <CardDescription>
            Tâches prioritaires pour aujourd&apos;hui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>Méditation matinale</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>Réunion d&apos;équipe à 10h</span>
            </li>
            <li className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-500" />
              <span>Finaliser le rapport mensuel</span>
            </li>
          </ul>
          <Button className="w-full mt-4">Voir toutes les tâches</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Nutrition</CardTitle>
          <CardDescription>
            Résumé de vos habitudes alimentaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Utensils className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium">Calories consommées</p>
              <p className="text-2xl font-bold">1850 / 2000</p>
            </div>
          </div>
          <Progress value={92.5} className="mt-4" />
          <Button variant="outline" className="w-full mt-4">
            Planifier les repas
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Apprentissage</CardTitle>
          <CardDescription>Progrès dans vos cours en ligne</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <BookOpen className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium">Cours actuel</p>
              <p className="text-lg font-bold">Productivité Avancée</p>
            </div>
          </div>
          <Progress value={65} className="mt-4" />
          <p className="text-sm text-muted-foreground mt-2">65% complété</p>
          <Button variant="outline" className="w-full mt-4">
            Continuer le cours
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
