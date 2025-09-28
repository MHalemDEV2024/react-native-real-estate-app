// src/lib/appwrite.ts
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";


// ✅ Use environment variables instead of hardcoded values
export const config = {
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID!,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID!,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID!,

};

// ✅ Initialize Appwrite client
export const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const account = new Account(client);
export const avatar = new Avatars(client);
export const databases = new Databases(client);

// ✅ Login with Google OAuth
export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    const authUrl = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

    if (!authUrl) throw new Error("Failed to generate OAuth URL");

    const browserResult = await openAuthSessionAsync(authUrl.toString(), redirectUri);
    if (browserResult.type !== "success") throw new Error("Login was cancelled or failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) throw new Error("OAuth credentials missing");

    const session = await account.createSession(userId, secret);
    return session;
  } catch (error: any) {
    console.error("[Appwrite Login Error]", error.message || error);
    throw new Error(error.message || "Login failed");
  }
}

// ✅ Logout
export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error: any) {
    console.error("[Appwrite Logout Error]", error.message || error);
    throw new Error("Logout failed");
  }
}

// ✅ Get Current User
export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      return {
        ...response,
        avatar: avatar.getInitials(response.name || "U", 100, 100).toString(),
      };
    }
    return null;
  } catch (error) {
    console.error("[Appwrite GetUser Error]", error);
    return null;
  }
}


// ✅ Fetch the latest properties (default: 5)
export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(5),
      ],
    );

    return result.documents;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[Appwrite GetLatestProperties Error]", error.message);
    } else {
      console.error("[Appwrite GetLatestProperties Error] Unexpected:", error);
    }
    return null;
  }
}

// ✅ Fetch properties with optional filters (type, search query, limit)
export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter?: string;
  query?: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ]),
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery,
    );

    return result.documents;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[Appwrite GetProperties Error]", error.message);
    } else {
      console.error("[Appwrite GetProperties Error] Unexpected:", error);
    }
    return null;
  }
}

// ✅ Fetch a property by ID with its agent, gallery, and reviews
export async function getPropertyById({ id }: { id: string }) {
  try {
    // 1. Fetch the property itself
    const property = await databases.getDocument(
      config.databaseId,
      config.propertiesCollectionId,
      id
    );

    // 2. Fetch the agent
    let agent = null;
    if (property.agent && typeof property.agent === "string") {
      // If only an ID is stored
      agent = await databases.getDocument(
        config.databaseId,
        config.agentsCollectionId,
        property.agent
      );
    } else {
      // If full object is already embedded
      agent = property.agent;
    }

    // 3. Fetch gallery (if stored in a separate collection)
    let gallery: any[] = [];
    if (property.galleryCollectionId) {
      const galleryRes = await databases.listDocuments(
        config.databaseId,
        property.galleryCollectionId
      );
      gallery = galleryRes.documents;
    } else {
      gallery = property.gallery || [];
    }

    // 4. Fetch reviews
    let reviews: any[] = [];
    if (property.reviews && Array.isArray(property.reviews)) {
      // If property stores an array of review IDs
      const fetched = await Promise.all(
        property.reviews.map((revId: string) =>
          databases.getDocument(config.databaseId, config.reviewsCollectionId, revId)
        )
      );
      reviews = fetched;
    } else if (property.reviewsCollectionId) {
      // If there is a dedicated collection
      const reviewsRes = await databases.listDocuments(
        config.databaseId,
        property.reviewsCollectionId
      );
      reviews = reviewsRes.documents;
    }

    // 5. Return combined data
    return {
      ...property,
      agent,
      gallery,
      reviews,
    };
  } catch (err) {
    console.error("❌ Failed to fetch property:", err);
    throw err;
  }
}