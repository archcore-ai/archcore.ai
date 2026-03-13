import { Trans } from "@lingui/react/macro";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  FileText,
  Shield,
  Check,
  ArrowRight,
} from "lucide-react";

export function DeterminismVisual() {
  return (
    <Card className="mt-8">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold mb-6 text-center">
          <Trans>Traceable reasoning: No black box</Trans>
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="text-center">
            <MessageCircle className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">
              <Trans>Question</Trans>
            </p>
            <p className="text-xs text-muted-foreground">
              <Trans>"Why microservices?"</Trans>
            </p>
          </div>

          <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground rotate-90 md:rotate-0" />

          <div className="text-center">
            <FileText className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">
              <Trans>Sources used</Trans>
            </p>
            <p className="text-xs text-muted-foreground">
              <Trans>ADR-042, RFC-15</Trans>
            </p>
          </div>

          <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground rotate-90 md:rotate-0" />

          <div className="text-center">
            <Shield className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">
              <Trans>Rules applied</Trans>
            </p>
            <p className="text-xs text-muted-foreground">
              <Trans>Access policy, versioning</Trans>
            </p>
          </div>

          <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground rotate-90 md:rotate-0" />

          <div className="text-center">
            <Check className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">
              <Trans>Answer</Trans>
            </p>
            <p className="text-xs text-muted-foreground">
              <Trans>With citations</Trans>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
