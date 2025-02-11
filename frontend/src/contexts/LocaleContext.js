'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const LocaleContext = createContext()

// Locale Provider component
export const LocaleProvider = ({ children }) => {
  // Get the initial locale from localStorage or default to 'en'
  const initialLocale =
    typeof window !== 'undefined'
      ? localStorage.getItem('locale') || 'en'
      : 'en'
  const [locale, setLocale] = useState(initialLocale)

  // Whenever the locale changes, update localStorage
  useEffect(() => {
    if (locale) {
      localStorage.setItem('locale', locale)
    }
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

// Custom hook to use the Locale context
export const useLocaleContext = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider')
  }
  return context
}
