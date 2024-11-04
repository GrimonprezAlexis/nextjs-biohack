"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

export default function Sleepboard() {
  const [sleepHours, setSleepHours] = useState(7);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi du Sommeil</CardTitle>
        <CardDescription>
          Analysez et améliorez la qualité de votre sommeil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Durée de sommeil :</h4>
            <div className="flex items-center space-x-2">
              <Slider
                value={[sleepHours]}
                onValueChange={(value) => setSleepHours(value[0])}
                max={12}
                step={0.5}
              />
              <span>{sleepHours} heures</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Qualité du sommeil :</h4>
            <Progress value={(sleepHours / 8) * 100} className="w-full" />
          </div>
          <div className="p-4 bg-secondary rounded">
            <h4 className="font-semibold mb-2">Recommandations :</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Maintenez une routine de sommeil régulière</li>
              <li>Évitez les écrans 1 heure avant le coucher</li>
              <li>Pratiquez des exercices de relaxation avant de dormir</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ======= v2
// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { ChartContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"
// import { Moon, Sun, Zap } from "lucide-react"

// export default function Sleep() {
//   const [sleepScore, setSleepScore] = useState(85)
//   const [sleepDuration, setSleepDuration] = useState(7.5)
//   const [deepSleepPercentage, setDeepSleepPercentage] = useState(20)

//   const sleepData = [
//     { date: "Lun", duration: 7.2, quality: 80 },
//     { date: "Mar", duration: 6.8, quality: 75 },
//     { date: "Mer", duration: 7.5, quality: 85 },
//     { date: "Jeu", duration: 8, quality: 90 },
//     { date: "Ven", duration: 7, quality: 78 },
//     { date: "Sam", duration: 7.8, quality: 88 },
//     { date: "Dim", duration: 8.5, quality: 92 },
//   ]

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto p-4 max-w-4xl"
//     >
//       <h1 className="text-3xl font-bold mb-6">Suivi du Sommeil</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Score de Sommeil</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-center">
//               <Moon className="h-6 w-6 mr-2 text-primary" />
//               <span className="text-4xl font-bold">{sleepScore}</span>
//             </div>
//             <Progress value={sleepScore} className="mt-2" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Durée de Sommeil</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-center">
//               <Sun className="h-6 w-6 mr-2 text-primary" />
//               <span className="text-4xl font-bold">{sleepDuration}h</span>
//             </div>
//             <Progress value={(sleepDuration / 9) * 100} className="mt-2" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Sommeil Profond</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-center">
//               <Zap className="h-6 w-6 mr-2 text-primary" />
//               <span className="text-4xl font-bold">{deepSleepPercentage}%</span>
//             </div>
//             <Progress value={deepSleepPercentage} className="mt-2" />
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Historique du Sommeil</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer
//             config={{
//               duration: {
//                 label: "Durée",
//                 color: "hsl(var(--chart-1))",
//               },
//               quality: {
//                 label: "Qualité",
//                 color: "hsl(var(--chart-2))",
//               },
//             }}
//             className="h-[300px]"
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={sleepData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Line yAxisId="left" type="monotone" dataKey="duration" stroke="var(--color-duration)" name="Durée (h)" />
//                 <Line yAxisId="right" type="monotone" dataKey="quality" stroke="var(--color-quality)" name="Qualité (%)" />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recommandations pour un Meilleur Sommeil</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="list-disc list-inside space-y-2">
//             <li>Maintenez un horaire de sommeil régulier</li>
//             <li>Évitez les écrans au moins 1 heure avant le coucher</li>
//             <li>Assurez-vous que votre chambre est sombre, fraîche et calme</li>
//             <li>Pratiquez des techniques de relaxation avant de dormir</li>
//             <li>Limitez la caféine et l'alcool en fin de journée</li>
//           </ul>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }
