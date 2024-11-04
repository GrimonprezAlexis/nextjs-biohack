"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  ChevronRight,
  Utensils,
  ShoppingCart,
  History,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "../ui/use-toast";

export default function KitchenBoard() {
  const [mealPhoto, setMealPhoto] = useState<string | null>(null);
  const [nutritionAnalysis, setNutritionAnalysis] = useState<{
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const recetteDuJour = {
    nom: "Bol Buddha aux légumes grillés et quinoa",
    ingredients: [
      "Quinoa",
      "Patate douce",
      "Pois chiches",
      "Avocat",
      "Épinards",
      "Huile d'olive",
      "Citron",
    ],
    instructions:
      "1. Cuire le quinoa. 2. Rôtir la patate douce et les pois chiches. 3. Assembler le bol avec les ingrédients. 4. Assaisonner avec de l'huile d'olive et du jus de citron.",
  };

  const listeCourses = [
    "Quinoa",
    "Patate douce",
    "Pois chiches",
    "Avocat",
    "Épinards",
    "Citron",
    "Huile d'olive extra vierge",
    "Graines de chia",
    "Noix",
    "Baies fraîches",
  ];

  const conseilsNutritionnels = [
    "Privilégiez les aliments complets et non transformés",
    "Incluez une source de protéines à chaque repas",
    "Variez les couleurs dans votre assiette pour obtenir un large éventail de nutriments",
    "Limitez votre consommation de sucres ajoutés et de graisses saturées",
  ];

  const repasRecents = [
    { id: 1, nom: "Salade de quinoa aux légumes", date: "2024-11-03" },
    { id: 2, nom: "Smoothie vert protéiné", date: "2024-11-02" },
    { id: 3, nom: "Saumon grillé et légumes vapeur", date: "2024-11-01" },
  ];

  const uploadMealPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMealPhoto(e.target?.result as string);
        analyzeNutrition();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeNutrition = () => {
    // Simulation d'une analyse nutritionnelle
    setTimeout(() => {
      setNutritionAnalysis({
        protein: Math.floor(Math.random() * 30) + 10,
        carbs: Math.floor(Math.random() * 50) + 20,
        fat: Math.floor(Math.random() * 20) + 5,
      });
      toast({
        title: "Analyse nutritionnelle terminée",
        description: "Votre repas a été analysé avec succès.",
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <h1 className="text-3xl font-bold mb-6">Cuisine et Nutrition</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recette du Jour</CardTitle>
          <CardDescription>
            Une suggestion équilibrée pour votre prochain repas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">{recetteDuJour.nom}</h3>
          <h4 className="font-medium mb-1">Ingrédients :</h4>
          <ul className="list-disc list-inside mb-2">
            {recetteDuJour.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4 className="font-medium mb-1">Instructions :</h4>
          <p>{recetteDuJour.instructions}</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analyser votre repas</CardTitle>
          <CardDescription>
            Uploadez une photo de votre repas pour une analyse nutritionnelle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Button asChild>
              <label htmlFor="meal-photo">
                <Camera className="mr-2 h-4 w-4" />
                Prendre une photo
              </label>
            </Button>
            <Button variant="outline" asChild>
              <label htmlFor="meal-photo">
                <Upload className="mr-2 h-4 w-4" />
                Uploader une image
              </label>
            </Button>
            <Input
              id="meal-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadMealPhoto}
            />
          </div>
          {mealPhoto && (
            <div>
              <Image
                src={mealPhoto}
                alt="Repas"
                width={500}
                height={500}
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
            </div>
          )}
          {nutritionAnalysis && (
            <div className="space-y-2">
              <h4 className="font-medium">Analyse nutritionnelle :</h4>
              <div className="flex justify-between items-center">
                <span>Protéines</span>
                <Progress value={nutritionAnalysis.protein} className="w-1/2" />
                <Badge>{nutritionAnalysis.protein}g</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Glucides</span>
                <Progress value={nutritionAnalysis.carbs} className="w-1/2" />
                <Badge>{nutritionAnalysis.carbs}g</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Lipides</span>
                <Progress value={nutritionAnalysis.fat} className="w-1/2" />
                <Badge>{nutritionAnalysis.fat}g</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Liste de courses suggérée</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {listeCourses.map((item, index) => (
                <li key={index} className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conseils nutritionnels</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {conseilsNutritionnels.map((conseil, index) => (
                <li key={index} className="flex items-start">
                  <Utensils className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                  <span>{conseil}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des repas récents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {repasRecents.map((repas) => (
              <motion.li
                key={repas.id}
                className="flex items-center justify-between p-2 bg-secondary rounded"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <History className="mr-2 h-4 w-4" />
                  <span>{repas.nom}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">
                    {repas.date}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
