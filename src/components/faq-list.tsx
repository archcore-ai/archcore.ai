import { faqOpenHandler } from "@/lib/analytics";

interface Props {
  faqs: { question: string; answer: string }[];
  surface: string;
  /** Wrapper classes. The home page fills its column instead of centring. */
  className?: string;
}

/** Native disclosures expose the same FAQ to readers and crawlers before hydration. */
export function FaqList({ faqs, surface, className }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <div className={className ?? "w-full max-w-3xl mx-auto"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className="faq-disclosure"
          onToggle={(event) => {
            if (event.currentTarget.open)
              faqOpenHandler(faqs, surface)(`item-${index}`);
          }}
        >
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
