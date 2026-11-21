import React, { createContext, useContext, useState, useCallback } from 'react';

const InquiryContext = createContext(null);

export function InquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState({
    productInterest: [],
    propertyType: '',
    sourceLabel: '',
  });

  const openInquiry = useCallback((options = {}) => {
    const interests = [];
    if (options.product) {
      interests.push(options.product);
    }
    setPrefill({
      productInterest: interests,
      propertyType: options.journey || '',
      sourceLabel: options.sourceLabel || '',
    });
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <InquiryContext.Provider value={{ isOpen, prefill, openInquiry, closeInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
