"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

export default function SocialBoard() {
  const congratulate = (name) => {
    toast({
      title: "Félicitations envoyées",
      description: `Vous avez félicité ${name} pour son accomplissement !`,
    });
  };

  const shareProgress = () => {
    toast({
      title: "Progrès partagés",
      description: "Vos progrès ont été partagés avec la communauté.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communauté</CardTitle>
        <CardDescription>
          Connectez-vous avec d'autres utilisateurs et partagez vos progrès.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe a atteint son objectif de méditation !</span>
            </div>
            <Button variant="outline" onClick={() => congratulate("John Doe")}>
              Féliciter
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <span>Jane Smith a économisé 500€ ce mois-ci !</span>
            </div>
            <Button
              variant="outline"
              onClick={() => congratulate("Jane Smith")}
            >
              Féliciter
            </Button>
          </div>
          <Button className="w-full" onClick={shareProgress}>
            Partager vos progrès
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
