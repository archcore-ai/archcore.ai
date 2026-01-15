import { useState, useEffect, useCallback } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExitIntentBannerProps {
  message?: string
  buttonLabel?: string
  onButtonClick?: () => void
  className?: string
}

const STORAGE_KEY = 'archcore-exit-intent-shown'

function getInitialHasShown() {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(STORAGE_KEY) === 'true'
}

export function ExitIntentBanner({
  message = 'Before you go - have questions? Talk to our engineers.',
  buttonLabel = 'Get in Touch',
  onButtonClick,
  className,
}: ExitIntentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(getInitialHasShown)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves toward top of viewport (exit intent)
    if (e.clientY <= 0 && !hasShown) {
      setIsVisible(true)
      setHasShown(true)
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }
  }, [hasShown])

  useEffect(() => {
    if (hasShown) return

    // Only add listener on desktop (exit intent doesn't work well on mobile)
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [handleMouseLeave, hasShown])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  const handleCTAClick = () => {
    onButtonClick?.()
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-primary text-primary-foreground',
        'transform transition-transform duration-300 ease-out',
        'animate-in slide-in-from-top',
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <MessageCircle className="h-5 w-5 flex-shrink-0 hidden sm:block" />
          <p className="text-sm font-medium">{message}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCTAClick}
          >
            {buttonLabel}
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="hover:bg-primary-foreground/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
