export function getMessageFromError(error: unknown): string {
  const message = 'An unexpected error occurred.';
  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'number') {
    return error.toString();
  }

  if (error && typeof error === 'object') {
    const e = error as { message?: string; shortMessage?: string };
    return e.shortMessage || e.message || message;
  }

  return message;
}

export const copyToClipboard = (text?: string) => text && navigator.clipboard.writeText(text);
