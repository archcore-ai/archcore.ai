import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OpenDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demoUrl: string;
}

export function OpenDemoDialog({
  open,
  onOpenChange,
  demoUrl,
}: OpenDemoDialogProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = email.includes("@") && email.trim().length > 3;

  const submitEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("access_key", "e4d56a9a-6826-4b17-83f7-7373f362f231");
      formData.append("email", email);
      formData.append("subject", "Demo Access Request from Archcore Landing");

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
    } catch {
      // Silently fail - don't block demo access
      console.error("Failed to submit email");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail) {
      setError("Please enter a valid work email");
      return;
    }

    setIsSubmitting(true);
    await submitEmail();
    window.location.href = demoUrl;
  };

  const handleClose = () => {
    onOpenChange(false);
    setEmail("");
    setError("");
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Explore Archcore on a real application</DialogTitle>
          <DialogDescription>
            Enter your email to access the interactive demo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="user@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              disabled={isSubmitting}
              aria-invalid={!!error}
            />
            {error ? (
              <p className="text-xs text-destructive">{error}</p>
            ) : (
              <p className="text-xs font-medium text-muted-foreground">
                No registration. The demo will open immediately.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening Demo...
              </>
            ) : (
              <>
                Open Demo
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
