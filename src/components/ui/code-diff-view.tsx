interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
}

interface CodeDiffViewProps {
  lines: DiffLine[];
  className?: string;
}

export function CodeDiffView({ lines, className = "" }: CodeDiffViewProps) {
  return (
    <div className={`rounded-md border overflow-hidden ${className}`}>
      <div className="font-mono text-sm">
        {lines.map((line, index) => {
          const bgColor =
            line.type === "added"
              ? "bg-green-50 dark:bg-green-950/20"
              : line.type === "removed"
                ? "bg-red-50 dark:bg-red-950/20"
                : "";

          const textColor =
            line.type === "added"
              ? "text-green-600 dark:text-green-400"
              : line.type === "removed"
                ? "text-destructive"
                : "text-muted-foreground";

          const prefix =
            line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";

          return (
            <div key={index} className={`flex ${bgColor}`}>
              <span className={`px-3 py-1 select-none ${textColor}`}>
                {prefix}
              </span>
              <span className={`px-3 py-1 flex-1 ${textColor}`}>
                {line.content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
