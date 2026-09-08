import { LocaleProvider } from "@/hooks/use-locale";
import { CLIPage } from "./cli";

export default function PageIsland() {
  return (
    <LocaleProvider>
      <CLIPage />
    </LocaleProvider>
  );
}
