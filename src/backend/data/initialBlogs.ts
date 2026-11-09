import { BlogPost } from "@/frontend/types/blog";

export const initialBlogs: BlogPost[] = [
  {
    id: "blog-flutter-google-auth",
    title: "Complete Guide to Google Sign-In with Firebase in Flutter",
    slug: "flutter-google-signin-guide",
    excerpt: "Learn how to configure SHA-1 keys, OAuth consent, and write clean authentication services in Flutter with GetX or Bloc.",
    category: "Flutter",
    tags: ["Flutter", "Firebase", "Authentication", "OAuth"],
    author: "Rana Sheikh",
    readTime: "6 min read",
    isPublished: true,
    likes: [],
    comments: [],
    createdAt: "2026-11-05",
    content: `
### Overview
Setting up Google Sign-In on Flutter requires configuring the Google Developer Console, generating SHA-1 / SHA-256 fingerprints, and connecting with Firebase Authentication.

### Key Steps:
1. **Add Google Service JSON / Plist**: Download \`google-services.json\` for Android and \`GoogleService-Info.plist\` for iOS.
2. **Configure SHA Fingerprints**: Run \`cd android && ./gradlew signingReport\` to grab your debug and release fingerprints.
3. **Handle User Credentials**: Always verify \`googleAuth.idToken\` and exchange it with FirebaseAuth.
    `.trim(),
  },
  {
    id: "blog-revenuecat-setup",
    title: "Implementing RevenueCat In-App Subscriptions in Mobile Apps",
    slug: "revenuecat-subscriptions-mobile",
    excerpt: "Step-by-step tutorial on fetching offerings, handling paywalls, and managing customer entitlements cross-platform.",
    category: "Mobile Architecture",
    tags: ["Flutter", "In-App Purchases", "RevenueCat", "Monetization"],
    author: "Rana Sheikh",
    readTime: "8 min read",
    isPublished: true,
    likes: [],
    comments: [],
    createdAt: "2026-11-07",
    content: `
### Why RevenueCat?
Handling StoreKit 2 and Google Play Billing directly leads to complicated receipt validation servers. RevenueCat abstracts this into a unified cross-platform API.

### Implementation Checklist:
- Set up Products and Entitlements in the RevenueCat dashboard.
- Link Apple App Store Connect Shared Secret & Google Service Account credentials.
- Call \`Purchases.getCustomerInfo()\` on app launch to unlock premium content.
    `.trim(),
  },
];
