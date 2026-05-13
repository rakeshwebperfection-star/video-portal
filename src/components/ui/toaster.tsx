"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { state, setOpen } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      <Toast open={state.open} onOpenChange={setOpen}>
        <div className="grid gap-1">
          <ToastTitle>{state.title}</ToastTitle>
          {state.description ? (
            <ToastDescription>{state.description}</ToastDescription>
          ) : null}
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
