const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb+srv://rana6424sheikh_db_user:PipNKvfiCI6lMKWn@cluster0.xlabvh8.mongodb.net/devvault?retryWrites=true&w=majority";

const SnippetFileSchema = new mongoose.Schema({
  filename: String, language: String, code: String,
});

const SnippetSchema = new mongoose.Schema({
  title: String, description: String, category: String, technology: String,
  level: String, tags: [String], files: [SnippetFileSchema], author: String,
  isPublic: Boolean, copyCount: Number, starsCount: Number,
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: String, slug: String, content: String, excerpt: String,
  category: String, tags: [String], author: String, readTime: String, isPublished: Boolean,
}, { timestamps: true });

const CommunitySchema = new mongoose.Schema({
  name: String, slug: String, hashtag: String, description: String,
  icon: String, creatorName: String, membersCount: Number, members: [String], snippetsCount: Number,
}, { timestamps: true });

const Snippet = mongoose.models.Snippet || mongoose.model("Snippet", SnippetSchema);
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
const Community = mongoose.models.Community || mongoose.model("Community", CommunitySchema);

const realSnippets = [
  {
    title: "Google Sign-In with Firebase Auth",
    description: "Production ready Google OAuth sign-in flow for Flutter with error handling.",
    category: "Authentication", technology: "Flutter", level: "Intermediate",
    tags: ["Flutter", "Firebase", "Google Login", "OAuth", "#flutter-artisans"],
    author: "Rana Sheikh", isPublic: true, copyCount: 142, starsCount: 39,
    files: [
      {
        filename: "google_auth_service.dart", language: "dart",
        code: `import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class GoogleAuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  Future<UserCredential?> signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
    if (googleUser == null) return null;

    final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
    final OAuthCredential credential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    return await _auth.signInWithCredential(credential);
  }
}`
      },
      { filename: "pubspec.yaml", language: "yaml", code: "dependencies:\n  flutter:\n    sdk: flutter\n  firebase_auth: ^5.0.0\n  google_sign_in: ^6.2.0" }
    ]
  },
  {
    title: "RevenueCat In-App Purchases & Subscriptions",
    description: "Complete initialization, paywall offerings fetch, and purchase listener.",
    category: "Payment Gateway", technology: "Flutter", level: "Advanced",
    tags: ["Flutter", "RevenueCat", "In-App Purchases", "Subscription", "#flutter-artisans"],
    author: "Rana Sheikh", isPublic: true, copyCount: 98, starsCount: 27,
    files: [
      {
        filename: "purchase_service.dart", language: "dart",
        code: `import 'dart:io';
import 'package:purchases_flutter/purchases_flutter.dart';

class PurchaseService {
  static Future<void> initPlatformState() async {
    final apiKey = Platform.isAndroid ? 'goog_api_key' : 'appl_api_key';
    await Purchases.configure(PurchasesConfiguration(apiKey));
  }

  static Future<CustomerInfo?> purchasePackage(Package package) async {
    try {
      return await Purchases.purchasePackage(package);
    } catch (e) {
      return null;
    }
  }
}`
      }
    ]
  },
  {
    title: "Apple Sign-In with Cryptographic Nonce",
    description: "Secure Apple authorization with raw nonce hash for iOS & macOS.",
    category: "Authentication", technology: "Flutter", level: "Intermediate",
    tags: ["Flutter", "Apple Sign-In", "iOS", "Security", "#flutter-artisans"],
    author: "Rana Sheikh", isPublic: true, copyCount: 76, starsCount: 19,
    files: [
      {
        filename: "apple_auth_handler.dart", language: "dart",
        code: `import 'package:sign_in_with_apple/sign_in_with_apple.dart';
import 'package:firebase_auth/firebase_auth.dart';

Future<UserCredential> signInWithApple() async {
  final appleCredential = await SignInWithApple.getAppleIDCredential(
    scopes: [AppleIDAuthorizationScopes.email, AppleIDAuthorizationScopes.fullName],
  );
  final OAuthProvider oAuthProvider = OAuthProvider('apple.com');
  final AuthCredential credential = oAuthProvider.credential(
    idToken: appleCredential.identityToken,
    accessToken: appleCredential.authorizationCode,
  );
  return await FirebaseAuth.instance.signInWithCredential(credential);
}`
      }
    ]
  },
  {
    title: "Brutalist Custom TextField Widget",
    description: "Form input with solid 2px black border, 3px hard offset shadow and clear button.",
    category: "UI Components", technology: "Flutter", level: "Beginner",
    tags: ["Flutter", "TextField", "UI Component", "Brutalist", "#flutter-artisans"],
    author: "Rana Sheikh", isPublic: true, copyCount: 210, starsCount: 54,
    files: [
      {
        filename: "custom_text_field.dart", language: "dart",
        code: `import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final IconData? prefixIcon;

  const CustomTextField({
    super.key, required this.controller, required this.hintText, this.prefixIcon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black, width: 2),
        boxShadow: const [BoxShadow(color: Colors.black, offset: Offset(3, 3))],
      ),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          hintText: hintText,
          prefixIcon: prefixIcon != null ? Icon(prefixIcon, color: Colors.black) : null,
          border: InputBorder.none,
          contentPadding: const EdgeInsets.all(14),
        ),
      ),
    );
  }
}`
      }
    ]
  },
  {
    title: "Express JWT Authentication Middleware",
    description: "Bearer token extractor and verification middleware for Express.js APIs.",
    category: "Authentication", technology: "Backend", level: "Intermediate",
    tags: ["Node.js", "Express", "JWT", "Security", "#backend-ninjas"],
    author: "Rana Sheikh", isPublic: true, copyCount: 185, starsCount: 42,
    files: [
      {
        filename: "authMiddleware.ts", language: "typescript",
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
    title: "Next.js 15 Server Action with Zod Validation",
    description: "Type-safe server action handler with schema error parsing.",
    category: "Backend API", technology: "Next.js", level: "Intermediate",
    tags: ["Next.js", "Server Action", "Zod", "TypeScript", "#nextjs-react-masters"],
    author: "Rana Sheikh", isPublic: true, copyCount: 125, starsCount: 36,
    files: [
      {
        filename: "createPostAction.ts", language: "typescript",
        code: `'use server';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(3, 'Title too short'),
  content: z.string().min(10, 'Content must be 10+ chars'),
});

export async function createPostAction(prevState: any, formData: FormData) {
  const parsed = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }
  return { success: true, data: parsed.data };
}`
      }
    ]
  },
  {
    title: "useClipboard Copy-to-Clipboard React Hook",
    description: "Lightweight hook for copying text with auto-resetting copied status.",
    category: "UI Components", technology: "React", level: "Beginner",
    tags: ["React", "Custom Hook", "Clipboard", "UI", "#nextjs-react-masters"],
    author: "Rana Sheikh", isPublic: true, copyCount: 130, starsCount: 31,
    files: [
      {
        filename: "useClipboard.ts", language: "typescript",
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

const realBlogs = [
  {
    title: "Complete Guide to Google Sign-In with Firebase in Flutter",
    slug: "flutter-google-signin-guide",
    excerpt: "Learn how to configure SHA-1 keys, OAuth consent, and write clean authentication services in Flutter with GetX or Bloc.",
    category: "Flutter", tags: ["Flutter", "Firebase", "Authentication", "OAuth"],
    author: "Rana Sheikh", readTime: "6 min read", isPublished: true,
    content: `### Overview\nSetting up Google Sign-In on Flutter requires configuring the Google Developer Console, generating SHA-1 / SHA-256 fingerprints, and connecting with Firebase Authentication.\n\n### Key Steps:\n1. **Add Google Service JSON / Plist**: Download google-services.json for Android and GoogleService-Info.plist for iOS.\n2. **Configure SHA Fingerprints**: Run cd android && ./gradlew signingReport to grab your debug and release fingerprints.\n3. **Handle User Credentials**: Always verify googleAuth.idToken and exchange it with FirebaseAuth.`
  },
  {
    title: "Implementing RevenueCat In-App Subscriptions in Mobile Apps",
    slug: "revenuecat-subscriptions-mobile",
    excerpt: "Step-by-step tutorial on fetching offerings, handling paywalls, and managing customer entitlements cross-platform.",
    category: "Mobile Architecture", tags: ["Flutter", "In-App Purchases", "RevenueCat", "Monetization"],
    author: "Rana Sheikh", readTime: "8 min read", isPublished: true,
    content: `### Why RevenueCat?\nHandling StoreKit 2 and Google Play Billing directly leads to complicated receipt validation servers. RevenueCat abstracts this into a unified cross-platform API.\n\n### Implementation Checklist:\n- Set up Products and Entitlements in the RevenueCat dashboard.\n- Link Apple App Store Connect Shared Secret & Google Service Account credentials.\n- Call Purchases.getCustomerInfo() on app launch to unlock premium content.`
  },
  {
    title: "Next.js 15 Clean Architecture & Folder Structure",
    slug: "nextjs-clean-architecture",
    excerpt: "A practical guide on organizing frontend components, domain services, database repositories, and API routes cleanly.",
    category: "Backend", tags: ["Next.js", "Clean Architecture", "TypeScript", "Best Practices"],
    author: "Rana Sheikh", readTime: "7 min read", isPublished: true,
    content: `### The Principle\nSeparate Presentation (Frontend UI) from Domain (Business Logic) and Infrastructure (Database / APIs).\n\n1. **src/frontend**: UI components, styling, hooks, and views.\n2. **src/backend**: Mongoose models, data repositories, and service functions.\n3. **src/app/api**: Thin API controllers that delegate directly to backend services.`
  }
];

const realCommunities = [
  {
    name: "Flutter Artisans & Mobile",
    slug: "flutter-artisans",
    hashtag: "#flutter-artisans",
    description: "The community for clean Flutter widgets, Bloc/GetX patterns, and native iOS/Android bridge code.",
    icon: "💙",
    creatorName: "Rana Sheikh",
    membersCount: 43,
    members: ["rofikul6424islam@gmail.com"],
    snippetsCount: 5,
  },
  {
    name: "Fullstack & Backend Ninjas",
    slug: "backend-ninjas",
    hashtag: "#backend-ninjas",
    description: "Production Node.js, Express, Go, Python, and MongoDB database architecture snippets.",
    icon: "⚡",
    creatorName: "Dev Team",
    membersCount: 29,
    members: [],
    snippetsCount: 1,
  },
  {
    name: "Next.js & React Masters",
    slug: "nextjs-react-masters",
    hashtag: "#nextjs-react-masters",
    description: "Custom hooks, modern Tailwind designs, server actions, and frontend UI components.",
    icon: "⚛️",
    creatorName: "Dev Team",
    membersCount: 35,
    members: [],
    snippetsCount: 2,
  },
  {
    name: "Python & Machine Learning Hub",
    slug: "python-ml-hub",
    hashtag: "#python-ml-hub",
    description: "FastAPI endpoints, PyTorch utilities, data preprocessing pipelines, and clean scripts.",
    icon: "🐍",
    creatorName: "Rana Sheikh",
    membersCount: 24,
    members: [],
    snippetsCount: 0,
  }
];

async function runSeed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  await Snippet.deleteMany({});
  await Blog.deleteMany({});
  await Community.deleteMany({});

  await Snippet.insertMany(realSnippets);
  await Blog.insertMany(realBlogs);
  await Community.insertMany(realCommunities);

  console.log("Seeding complete with accurate counts and hashtags!");
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
