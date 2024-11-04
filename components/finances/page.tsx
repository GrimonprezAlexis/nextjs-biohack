import { AlertTriangle, CreditCard } from "lucide-react";
import { LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import { ChartContainer, ChartLegend, ChartTooltip } from "../ui/chart";
import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function FinancesBoard() {
  const [bankConnected, setBankConnected] = useState(false);

  const financialData = [
    { month: "Jan", income: 3000, expenses: 2500, prediction: 2700 },
    { month: "Feb", income: 3200, expenses: 2700, prediction: 2900 },
    { month: "Mar", income: 3100, expenses: 2600, prediction: 2800 },
    { month: "Apr", income: 3500, expenses: 2800, prediction: 3000 },
    { month: "May", income: 3300, expenses: 2900, prediction: 3100 },
    { month: "Jun", income: 3700, expenses: 3000, prediction: 3200 },
  ];

  const connectBank = () => {
    setTimeout(() => {
      setBankConnected(true);
      toast({
        title: "Compte bancaire connecté",
        description:
          "Vos transactions seront maintenant analysées automatiquement.",
      });
    }, 2000);
  };

  return (
    <TabsContent value="finances">
      <Card>
        <CardHeader>
          <CardTitle>Suivi Financier</CardTitle>
          <CardDescription>Analysez vos revenus et dépenses.</CardDescription>
        </CardHeader>
        <CardContent>
          {!bankConnected && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Compte bancaire non connecté</AlertTitle>
              <AlertDescription>
                Connectez votre compte bancaire pour une analyse automatique des
                transactions.
              </AlertDescription>
              <Button className="mt-2" onClick={connectBank}>
                <CreditCard className="mr-2 h-4 w-4" />
                Connecter mon compte
              </Button>
            </Alert>
          )}
          <ChartContainer
            config={{
              income: {
                label: "Revenus",
                color: "hsl(var(--chart-1))",
              },
              expenses: {
                label: "Dépenses",
                color: "hsl(var(--chart-2))",
              },
              prediction: {
                label: "Prédiction",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <ChartLegend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--color-income)"
                  name="Revenus"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--color-expenses)"
                  name="Dépenses"
                />
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="var(--color-prediction)"
                  name="Prédiction"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 p-4 bg-secondary rounded">
            <h4 className="font-semibold mb-2">Recommandations :</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Augmentez vos économies de 10% ce mois-ci</li>
              <li>Envisagez d&apos;investir dans des fonds indiciels</li>
              <li>Réduisez les dépenses non essentielles de 5%</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
