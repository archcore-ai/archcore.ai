import { useState } from 'react'

export function useCTAState() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [openDemoDialogOpen, setOpenDemoDialogOpen] = useState(false)

  const openContactDialog = () => {
    setContactDialogOpen(true)
  }

  const openDemoDialog = () => {
    setOpenDemoDialogOpen(true)
  }

  return {
    contactDialogOpen,
    setContactDialogOpen,
    openContactDialog,
    openDemoDialogOpen,
    setOpenDemoDialogOpen,
    openDemoDialog,
  }
}
