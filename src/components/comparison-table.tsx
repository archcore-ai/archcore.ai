import { Card, CardContent } from "@/components/ui/card";
import { Search, Box } from "lucide-react";
import { Trans } from "@lingui/macro";

export function ComparisonTable() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Enterprise Search */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
              <h4 className="font-bold text-base md:text-lg"><Trans>Enterprise Search (like Onyx)</Trans></h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Trans>✓ Finds information across apps</Trans></li>
              <li><Trans>✓ Great for "what did we discuss?"</Trans></li>
              <li><Trans>✗ No architectural structure</Trans></li>
              <li><Trans>✗ Results vary by query phrasing</Trans></li>
              <li><Trans>✗ Can't enforce constraints</Trans></li>
            </ul>
          </div>

          {/* Archcore */}
          <div className="md:border-l-2 md:border-primary md:pl-8">
            <div className="flex items-center gap-2 mb-4">
              <Box className="h-6 w-6 text-primary" />
              <h4 className="font-bold text-base md:text-lg text-primary"><Trans>Archcore</Trans></h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="text-primary"><Trans>✓ Makes intent an enforceable contract</Trans></li>
              <li className="text-primary"><Trans>✓ Structured, governed, versioned</Trans></li>
              <li className="text-primary"><Trans>✓ Deterministic retrieval</Trans></li>
              <li className="text-primary"><Trans>✓ Traceable to sources</Trans></li>
              <li className="text-primary"><Trans>✓ AI follows architectural rules</Trans></li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
