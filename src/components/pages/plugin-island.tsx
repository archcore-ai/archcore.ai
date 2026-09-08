import { LocaleProvider } from "@/hooks/use-locale";
import { PluginPage } from "./plugin";

export default function PageIsland() {
  return (
    <LocaleProvider>
      <PluginPage />
    </LocaleProvider>
  );
}
