import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface InlineEmailCaptureProps {
  placeholder?: string
  buttonLabel?: string
  successMessage?: string
  formspreeId?: string
  className?: string
}

export function InlineEmailCapture({
  placeholder = 'Enter your work email',
  buttonLabel = 'Get Updates',
  successMessage = 'Thanks! We\'ll be in touch.',
  formspreeId,
  className,
}: InlineEmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submitEmail = async () => {
    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          body: JSON.stringify({ email, _subject: 'New Email Signup' }),
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        })

        if (response.ok) {
          setStatus('success')
          setEmail('')
        } else {
          setStatus('error')
          setErrorMessage('Something went wrong. Please try again.')
        }
      } catch {
        setStatus('error')
        setErrorMessage('Something went wrong. Please try again.')
      }
    } else {
      // Demo mode - simulate success
      console.log('Email capture:', email)
      setTimeout(() => {
        setStatus('success')
        setEmail('')
      }, 500)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email')
      setStatus('error')
      return
    }

    setStatus('loading')
    void submitEmail()
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className ?? ''}`}>
        <Check className="h-4 w-4 text-primary" />
        {successMessage}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className ?? ''}`}>
      <div className="flex-1">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          aria-invalid={status === 'error'}
          className="w-full"
        />
        {status === 'error' && (
          <p className="text-xs text-destructive mt-1">{errorMessage}</p>
        )}
      </div>
      <Button type="submit" disabled={status === 'loading'} className="gap-2">
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
