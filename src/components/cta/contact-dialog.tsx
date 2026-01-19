import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ContactFormProps {
  onClose: () => void;
}

interface Web3FormsResponse {
  success: boolean;
}

function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid work email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    try {
      const submitData = new FormData();
      submitData.append("access_key", "471081aa-576f-454f-8b23-d151db2bd7aa");
      submitData.append("email", formData.email);
      submitData.append("company", formData.company);
      submitData.append("message", formData.message);
      submitData.append("subject", "Contact from Archcore Landing");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const data = (await response.json()) as Web3FormsResponse;
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("loading");
    void submitForm();
  };

  if (status === "success") {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">Message Sent</DialogTitle>
          <DialogDescription className="text-center">
            Thanks for reaching out. We'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogDescription>Have questions about Archcore? Our team is here to help.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Work Email <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company
          </label>
          <Input
            id="company"
            type="text"
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="message"
            placeholder="Tell us about your use case..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please try again.</p>}

        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </>
  );
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {/* Key forces re-mount when dialog opens, resetting form state */}
        {open && <ContactForm key="contact-form" onClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
}
