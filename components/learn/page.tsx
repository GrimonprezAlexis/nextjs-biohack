"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "../ui/progress";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LearnBoard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Productivité Avancée",
      progress: 75,
      duration: "2h 30min",
      completed: false,
    },
    {
      id: 2,
      title: "Biohacking 101",
      progress: 40,
      duration: "1h 45min",
      completed: false,
    },
    {
      id: 3,
      title: "Gestion du Stress",
      progress: 100,
      duration: "1h 15min",
      completed: true,
    },
    {
      id: 4,
      title: "Nutrition Optimale",
      progress: 10,
      duration: "3h",
      completed: false,
    },
  ]);

  const startCourse = (topic) => {
    toast({
      title: "Cours commencé",
      description: `Vous avez commencé le cours sur ${topic}.`,
    });
  };

  const buyBook = () => {
    toast({
      title: "Livre acheté",
      description:
        "Merci pour votre achat ! Le livre sera bientôt disponible dans votre bibliothèque.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apprentissage</CardTitle>
        <CardDescription>
          Explorez de nouveaux sujets et développez vos compétences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Productivité",
              "Santé",
              "Finances",
              "Développement personnel",
            ].map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{topic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => startCourse(topic)}>
                    Commencer le cours
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="p-4 bg-secondary rounded">
            <h4 className="font-semibold mb-2">Suggestion de lecture :</h4>
            <p>"Atomic Habits" par James Clear</p>
            <Button className="mt-2" onClick={buyBook}>
              Acheter le livre
            </Button>
          </div>
        </div>
      </CardContent>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 max-w-4xl"
      >
        <h1 className="text-3xl font-bold mb-6">Apprentissage</h1>
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {course.title}
                  {course.completed && (
                    <CheckCircle className="text-green-500" />
                  )}
                </CardTitle>
                <CardDescription className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span>Progression</span>
                  <Badge variant={course.completed ? "secondary" : "default"}>
                    {course.progress}%
                  </Badge>
                </div>
                <Progress value={course.progress} className="mb-4" />
                <Button
                  onClick={() => startCourse(course.id)}
                  className="w-full"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {course.completed
                    ? "Revoir"
                    : course.progress > 0
                    ? "Continuer"
                    : "Commencer"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </Card>
  );
}

// ========= v2

// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { BookOpen, CheckCircle, Clock } from "lucide-react"

// export default function Learn() {
//   const [courses, setCourses] = useState([
//     { id: 1, title: "Productivité Avancée", progress: 75, duration: "2h 30min", completed: false },
//     { id: 2, title: "Biohacking 101", progress: 40, duration: "1h 45min", completed: false },
//     { id: 3, title: "Gestion du Stress", progress: 100, duration: "1h 15min", completed: true },
//     { id: 4, title: "Nutrition Optimale", progress: 10, duration: "3h", completed: false },
//   ])

//   const startCourse = (id: number) => {
//     // Logic to start or continue a course
//     console.log(`Starting course ${id}`)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto p-4 max-w-4xl"
//     >
//       <h1 className="text-3xl font-bold mb-6">Apprentissage</h1>

//       <div className="grid gap-6">
//         {courses.map((course) => (
//           <Card key={course.id}>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 {course.title}
//                 {course.completed && <CheckCircle className="text-green-500" />}
//               </CardTitle>
//               <CardDescription className="flex items-center">
//                 <Clock className="mr-2 h-4 w-4" />
//                 {course.duration}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between mb-2">
//                 <span>Progression</span>
//                 <Badge variant={course.completed ? "secondary" : "default"}>
//                   {course.progress}%
//                 </Badge>
//               </div>
//               <Progress value={course.progress} className="mb-4" />
//               <Button onClick={() => startCourse(course.id)} className="w-full">
//                 <BookOpen className="mr-2 h-4 w-4" />
//                 {course.completed ? "Revoir" : course.progress > 0 ? "Continuer" : "Commencer"}
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </motion.div>
//   )
// }
