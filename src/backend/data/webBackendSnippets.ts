import { SnippetItem } from "@/frontend/types/snippet";

export const webBackendSnippets: SnippetItem[] = [
  {
    id: "node-jwt-auth",
    title: "Express JWT Authentication Middleware",
    description: "Bearer token extractor and verification middleware for Express.js APIs.",
    category: "Authentication",
    technology: "Backend",
    level: "Intermediate",
    tags: ["Node.js", "Express", "JWT", "Security"],
    author: "Rana Sheikh",
    isPublic: true,
    copyCount: 185,
    starsCount: 42,
    createdAt: "2026-11-06",
    files: [
      {
        filename: "authMiddleware.ts",
        language: "typescript",
        code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};`
      }
    ]
  },
  {
    id: "react-copy-hook",
    title: "useClipboard Copy-to-Clipboard React Hook",
    description: "Lightweight hook for copying text with auto-resetting copied status.",
    category: "UI Components",
    technology: "React",
    level: "Beginner",
    tags: ["React", "Custom Hook", "Clipboard", "UI"],
    author: "Rana Sheikh",
    isPublic: true,
    copyCount: 130,
    starsCount: 31,
    createdAt: "2026-11-07",
    files: [
      {
        filename: "useClipboard.ts",
        language: "typescript",
        code: `import { useState, useCallback } from 'react';

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeout);
      return true;
    } catch {
      return false;
    }
  }, [timeout]);

  return { hasCopied, copy };
}`
      }
    ]
  }
];

