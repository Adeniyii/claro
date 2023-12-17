"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProviderWrapper = ({
  children,
  ...props
}: ThemeProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem {...props}>
      {children}
    </ThemeProvider>
  );
};