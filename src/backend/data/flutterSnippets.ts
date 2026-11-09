import { SnippetItem } from "@/frontend/types/snippet";

export const flutterSnippets: SnippetItem[] = [
  {
    id: "flt-google-login",
    title: "Google Sign-In with Firebase Auth",
    description: "Production ready Google OAuth sign-in flow for Flutter with error handling.",
    category: "Authentication",
    technology: "Flutter",
    level: "Intermediate",
    tags: ["Flutter", "Firebase", "Google Login", "OAuth"],
    author: "Rana Sheikh",
    isPublic: true,
    copyCount: 142,
    starsCount: 39,
    createdAt: "2026-11-01",
    files: [
      {
        filename: "google_auth_service.dart",
        language: "dart",
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
      {
        filename: "pubspec.yaml",
        language: "yaml",
        code: `dependencies:
  flutter:
    sdk: flutter
  firebase_auth: ^5.0.0
  google_sign_in: ^6.2.0`
      }
    ]
  },
  {
    id: "flt-revenuecat",
    title: "RevenueCat In-App Purchases & Subscriptions",
    description: "Complete initialization, paywall offerings fetch, and purchase listener.",
    category: "Payment Gateway",
    technology: "Flutter",
    level: "Advanced",
    tags: ["Flutter", "RevenueCat", "In-App Purchases", "Subscription"],
    author: "Rana Sheikh",
    isPublic: true,
    copyCount: 98,
    starsCount: 27,
    createdAt: "2026-11-03",
    files: [
      {
        filename: "purchase_service.dart",
        language: "dart",
        code: `import 'dart:io';
import 'package:purchases_flutter/purchases_flutter.dart';

class PurchaseService {
  static Future<void> initPlatformState() async {
    final apiKey = Platform.isAndroid ? 'goog_api_key' : 'appl_api_key';
    await Purchases.configure(PurchasesConfiguration(apiKey));
  }

  static Future<CustomerInfo?> purchasePackage(Package package) async {
    try {
      final purchaseResult = await Purchases.purchasePackage(package);
      return purchaseResult;
    } catch (e) {
      return null;
    }
  }
}`
      }
    ]
  }
];

