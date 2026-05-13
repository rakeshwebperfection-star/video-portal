"use client";

import * as React from "react";

interface ToastState {
  open: boolean;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: (toast: Omit<ToastState, "open">) => void;
  state: ToastState;
  setOpen: (open: boolean) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ToastState>({
    open: false,
    title: "",
  });

  const toast = React.useCallback((nextToast: Omit<ToastState, "open">) => {
    setState({ ...nextToast, open: true });
  }, []);

  const setOpen = React.useCallback((open: boolean) => {
    setState((current) => ({ ...current, open }));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, state, setOpen }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastStateProvider");
  }

  return context;
}
