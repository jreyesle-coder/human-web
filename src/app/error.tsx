"use client";

import { ErrorScreen } from "@/components/ui/ErrorScreen";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorScreen onRetry={reset} />;
}
