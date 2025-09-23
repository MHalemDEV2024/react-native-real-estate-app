// src/lib/appwrite.ts

import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

// ✅ Use environment variables instead of hardcoded values
export const config = {
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!, 
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};

// ✅ Initialize Appwrite client
export const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const account = new Account(client);
export const avatar = new Avatars(client);

// ✅ Login with Google OAuth
export async function login() {
  try {
    const redirectUri = Linking.createURL("/"); // redirect back to app
    const authUrl = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

    if (!authUrl) throw new Error("Failed to generate OAuth URL");

    const browserResult = await openAuthSessionAsync(authUrl.toString(), redirectUri);
    if (browserResult.type !== "success") throw new Error("Login was cancelled or failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) throw new Error("OAuth credentials missing");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create a session");

    return session;
  } catch (error) {
    console.error("[Appwrite Login Error]", error);
    return null;
  }
}

// ✅ Logout (delete current session)
export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("[Appwrite Logout Error]", error);
    return null;
  }
}

// ✅ Get currently logged-in user
export async function getUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      return {
        ...response,
        avatar: avatar.getInitials(response.name, 100, 100).toString(),
      };
    }
    return null;
  } catch (error) {
    console.error("[Appwrite GetUser Error]", error);
    return null;
  }
}
