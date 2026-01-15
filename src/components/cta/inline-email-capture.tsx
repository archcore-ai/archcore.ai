import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InlineEmailCaptureProps {
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  className?: string;
}

export function InlineEmailCapture({
  placeholder = "Enter your work email",
  buttonLabel = "Get Updates",
  successMessage = "Thanks! We'll be in touch.",
  className,
}: InlineEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("access_key", "5116e32b-5848-4db9-bf0c-382f161dddb7");
      formData.append("email", email);
      formData.append("subject", "New Email Signup");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email");
      setStatus("error");
      return;
    }

    setStatus("loading");
    void submitEmail();
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className ?? ""}`}>
        <Check className="h-4 w-4 text-primary" />
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className ?? ""}`}>
      <div className="flex-1">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          className="w-full"
        />
        {status === "error" && <p className="text-xs text-destructive mt-1">{errorMessage}</p>}
      </div>
      <Button type="submit" disabled={status === "loading"} className="gap-2">
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
