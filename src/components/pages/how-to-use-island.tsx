import { LocaleProvider } from "@/hooks/use-locale";
import { HowToUsePage } from "./how-to-use";

export default function PageIsland() {
  return (
    <LocaleProvider>
      <HowToUsePage />
    </LocaleProvider>
  );
}
