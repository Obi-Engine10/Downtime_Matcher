import { type DowntimeCode } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DowntimeCodeCardProps {
  code: DowntimeCode;
}

export function DowntimeCodeCard({ code }: DowntimeCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (category: string) => {
    // Simple hashing for consistent colors
    const hash = category.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-blue-500/10 text-blue-700 border-blue-500/20",
      "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
      "bg-amber-500/10 text-amber-700 border-amber-500/20",
      "bg-purple-500/10 text-purple-700 border-purple-500/20",
      "bg-rose-500/10 text-rose-700 border-rose-500/20",
    ];
    return colors[hash % colors.length];
  };

  return (
    <Card className="group overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {code.code}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={cn("px-3 py-1 font-medium border", getCategoryColor(code.category))}
        >
          {code.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="text-muted-foreground leading-relaxed">
          {code.description}
        </p>
      </CardContent>
    </Card>
  );
}
