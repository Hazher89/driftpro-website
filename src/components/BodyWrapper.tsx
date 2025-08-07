'use client'

import { useEffect } from 'react'

interface BodyWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function BodyWrapper({ children, className = '' }: BodyWrapperProps) {
  useEffect(() => {
    // Clean up any browser extension classes that might cause hydration issues
    const body = document.body
    if (body) {
      // Remove any classes that might be added by browser extensions
      const extensionClasses = [
        'clickup-chrome-ext_installed',
        'chrome-extension',
        'browser-extension'
      ]
      
      extensionClasses.forEach(extClass => {
        if (body.classList.contains(extClass)) {
          body.classList.remove(extClass)
        }
      })
      
      // Ensure our intended class is applied
      if (className && !body.classList.contains(className)) {
        body.classList.add(className)
      }
    }
  }, [className])

  return <>{children}</>
}
