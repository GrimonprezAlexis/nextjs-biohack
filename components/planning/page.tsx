import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CalendarDays } from "lucide-react";
import { Textarea } from "../ui/text-area";
import { useState } from "react";

export default function PlanningBoard() {
  const [personalNote, setPersonalNote] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Planning</CardTitle>
        <CardDescription>
          Gérez votre agenda et prenez des notes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-secondary rounded">
            <span>Réunion d'équipe</span>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>14:00</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-secondary rounded">
            <span>Séance de méditation</span>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>08:00</span>
            </div>
          </div>
          <Textarea
            placeholder="Prenez des notes ici..."
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}
