import type { CSSProperties } from "react";

export const hueStyle = (h: number) => ({ "--h": h }) as CSSProperties;

export const pad = (n: number) => String(n).padStart(2, "0");
