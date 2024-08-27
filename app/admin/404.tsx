// pages/404.tsx
"use client";

import { redirect } from 'next/navigation';

const determineRedirectUrl = (): string => {
  // Replace this with your actual logic
  const someCondition = true;
  return someCondition ? '/url1' : '/url2';
};

export default function NotFound() {
  const redirectUrl = determineRedirectUrl();

  // Perform redirection
  redirect(redirectUrl);

  return null;
}

