import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import superjson from 'superjson';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformer = superjson;