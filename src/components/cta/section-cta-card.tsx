import { type LucideIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SectionCTACardProps {
  icon?: LucideIcon
  title: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
  className?: string
  /** Use 'featured' for the main conversion CTA with enhanced styling */
  variant?: 'default' | 'featured'
}

export function SectionCTACard({
  icon: Icon,
  title,
  description,
  buttonLabel = 'Learn More',
  onButtonClick,
  className,
  variant = 'default',
}: SectionCTACardProps) {
  if (variant === 'featured') {
    return (
      <div
        className={cn(
          'section-cta-featured group relative overflow-hidden rounded-xl p-px',
          className
        )}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-xl animate-border-gold" />

        {/* Card content */}
        <div className="relative rounded-[11px] bg-background px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <Button
              onClick={onButtonClick}
              className="gap-2 flex-shrink-0"
            >
              {buttonLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <style>{`
          @property --border-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }

          .animate-border-gold {
            background: conic-gradient(
              from var(--border-angle),
              #d4a574,
              #f4d03f,
              #c9a227,
              #8b6914,
              #c9a227,
              #f4d03f,
              #d4a574
            );
            animation: border-spin 3s linear infinite;
          }

          @keyframes border-spin {
            to {
              --border-angle: 360deg;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-border-gold {
              animation: none;
              background: linear-gradient(135deg, #d4a574, #f4d03f, #c9a227);
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <Card className={cn('bg-primary/5 border-primary/20', className)}>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {Icon && (
            <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button onClick={onButtonClick} className="gap-2 flex-shrink-0">
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
