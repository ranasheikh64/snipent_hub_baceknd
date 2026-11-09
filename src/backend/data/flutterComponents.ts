import { SnippetItem } from "@/frontend/types/snippet";

export const flutterComponents: SnippetItem[] = [
  {
    id: "flt-apple-login",
    title: "Apple Sign-In with Cryptographic Nonce",
    description: "Secure Apple authorization with raw nonce hash for iOS & macOS.",
    category: "Authentication",
    technology: "Flutter",
    level: "Intermediate",
    tags: ["Flutter", "Apple Sign-In", "iOS", "Security"],
    author: "Rana Sheikh",
    isPublic: true,
    copyCount: 76,
    starsCount: 19,
    createdAt: "2026-11-04",
    files: [
      {
        filename: "apple_auth_handler.dart",
        language: "dart",
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
    id: "flt-custom-textfield",
    title: "Brutalist Styled Custom TextField",
    description: "Custom TextFormField with solid black border, prefix icon and clear button.",
    category: "UI Components",
    technology: "Flutter",
    level: "Beginner",
    tags: ["Flutter", "TextField", "UI Component", "Form"],
    author: "Rana Sheikh",
    isPublic: true,
    copyCount: 210,
    starsCount: 54,
    createdAt: "2026-11-05",
    files: [
      {
        filename: "custom_text_field.dart",
        language: "dart",
        code: `import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final IconData? prefixIcon;

  const CustomTextField({
    super.key,
    required this.controller,
    required this.hintText,
    this.prefixIcon,
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
  }
];

