import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CirclePlay, Info } from "lucide-react";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const DEMO_URL = "https://demo.archcore.ai";

export function DemoSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer id="demo">
      <SectionHeader
        title={_(msg`Try Archcore in Action`)}
        description={_(msg`Interactive scenarios on a public repository. Read-only tour.`)}
      />

      <div className="flex flex-col items-center gap-8">
        {/* Demo GIF with Overlay */}
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden border shadow-lg block cursor-pointer"
        >
          <img src="/images/archcore-demo.gif" alt={_(msg`Archcore demo`)} className="w-full h-auto" />
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center gap-3 text-white transition-transform duration-200 group-hover:scale-110">
              <CirclePlay className="h-16 w-16" />
              <span className="text-lg font-semibold">{_(msg`Run demo`)}</span>
            </div>
          </div>
        </a>
      </div>

      {/* <Alert className="mt-8 border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm">
          {_(msg`This is a read-only tour on a public repository. To create/modify Architecture Record — install self-hosted.`)}
        </AlertDescription>
      </Alert> */}
    </SectionContainer>
  );
}
