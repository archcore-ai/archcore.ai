import { useState } from "react";

export function useCTAState() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const openContactDialog = () => {
    setContactDialogOpen(true);
  };

  return {
    contactDialogOpen,
    setContactDialogOpen,
    openContactDialog,
  };
}
