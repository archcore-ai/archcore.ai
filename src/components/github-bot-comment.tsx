import { Bot, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface GitHubBotCommentProps {
  title: string;
  children: React.ReactNode;
  link?: {
    url: string;
    label: string;
  };
}

export function GitHubBotComment({
  title,
  children,
  link,
}: GitHubBotCommentProps) {
  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        {title && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight">{title}</h4>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </div>
          </div>
        )}
        <div className="space-y-3">{children}</div>
        {link && (
          <div className="pt-2 border-t">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
