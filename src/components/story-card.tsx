import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StoryCardProps {
  trigger: string;
  problem: string;
  solution: string;
  outcome: string;
  icon: LucideIcon;
  title: string;
}

export function StoryCard({ trigger, problem, solution, outcome, icon: Icon, title }: StoryCardProps) {
  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Icon */}
          <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
            <Icon className="h-8 w-8 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 w-full">
            <h3 className="text-xl md:text-2xl font-bold">{title}</h3>

            {/* Trigger */}
            <div>
              <Badge variant="outline" className="mb-2">Trigger</Badge>
              <p className="text-muted-foreground italic">"{trigger}"</p>
            </div>

            {/* Before/After Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-destructive">❌ What breaks</h4>
                <p className="text-sm text-muted-foreground">{problem}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-primary">✓ With Archcore</h4>
                <p className="text-sm text-muted-foreground">{solution}</p>
              </div>
            </div>

            {/* Outcome */}
            <div className="pt-4 border-t">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm md:text-base">
                <Target className="h-4 w-4" />
                {outcome}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
