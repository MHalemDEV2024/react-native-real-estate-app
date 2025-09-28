# Full‑Stack Real Estate Mobile App

![Project Status](https://img.shields.io/badge/status-In%20Progress-blue)
![React Native](https://img.shields.io/badge/React%20Native-Expo-green?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Yes-blue?logo=typescript)
![Appwrite](https://img.shields.io/badge/Appwrite-Yes-orange?logo=appwrite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Yes-38B2AC?logo=tailwind-css&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-Yes-4CAF50?logo=expo)
![Figma](https://img.shields.io/badge/Figma-Yes-F24E1E?logo=figma)
![GitHub](https://img.shields.io/badge/GitHub-Yes-181717?logo=github)

## 🏗 Project Overview

This project is a **full‑stack real estate mobile application** designed to provide a modern property discovery and rental experience. It is developed using **React Native** for the frontend and **Appwrite** for backend services, enabling quick integration of authentication, database, and file storage.

The application includes dynamic routing, Google Authentication, and scalable backend integrations.

---

## 🎯 Project Goals

* Deliver a smooth and visually appealing mobile property browsing experience.
* Implement secure authentication with Google.
* Utilize Appwrite for serverless backend (Auth, DB, Storage).
* Enable dynamic routing for seamless navigation between listings and details.
* Provide an extensible architecture for future features such as advanced search, booking, and payment.

---

## 🛠 Tech Stack

**Frontend (Mobile)**: React Native (Expo), NativeWind (Tailwind for React Native), TypeScript

**Backend**: Appwrite (Authentication, Database, Storage, Functions)

**Authentication**: Google OAuth via Appwrite

**Navigation & Routing**: Expo Router (dynamic routing)

**Design**: Figma for wireframes and style guide

**Version Control & CI/CD**: GitHub + GitHub Actions (optional)

---

## 🎨 UI/UX Design Planning

### 🎯 Design Goals

* Offer a clean and focused mobile‑first experience.
* Ensure intuitive navigation with dynamic routing.
* Provide consistent branding, typography, and color palette.
* Focus on fast performance, responsiveness, and accessibility.
* Minimize friction in sign‑in and property exploration.

## 🌟 Color Palette

| Usage                          | Color   | Hex       |
|--------------------------------|---------|-----------|
| Primary (CTA, highlights)     | 🔵      | `#0061FF` |
| Accent (secondary backgrounds) | ⚪      | `#FBFBFD` |
| Background                     | ⚪      | `#FFFFFF` |
| Text (Primary)                 | ⚫      | `#222222` |
| Text (Secondary)               | 🌫️     | `#717171` |
| Danger / Error                 | 🔴      | `#F75555` *(optional)* |

> Use **Primary** for buttons, links, and active elements.  
> Use **Accent** for cards, sheets, and light backgrounds.  
> Keep strong contrast for accessibility (WCAG AA+).

---

## 🅰️ Typography

**Font Family:** [Rubik](https://fonts.google.com/specimen/Rubik)

| Style                     | Tailwind Class       | Size     | Weight       |
|---------------------------|----------------------|----------|--------------|
| Headings (H1–H3)          | `font-rubik-extrabold` | 22–28 px | ExtraBold (800) |
| Sub-headings / Section titles | `font-rubik-bold`     | 18–20 px | Bold (700)      |
| Body Text                 | `font-rubik`          | 16 px    | Regular (400)   |
| Secondary Text / Labels   | `font-rubik-medium`   | 14 px    | Medium (500)    |
| Captions / Muted Text     | `font-rubik-light`    | 12–13 px | Light (300)     |

> * Stick to **Rubik ExtraBold / Bold** for headings to keep them impactful.  
> * Use **Rubik Medium / Regular** for most text.  
> * Apply **Rubik Light** for subdued helper text or captions.  
> * Maintain **line-height ≈ 1.4× font size** for readability.

---

## 💡 Notes

* Keep brand identity consistent by using **Rubik** across the whole app.

* Use **Primary (#0061FF)** for main buttons and links.
* Ensure text contrast meets **WCAG 4.5:1** minimum for accessibility.
* When designing in Figma, set text styles that map to Tailwind classes (`font-rubik-bold`, `font-rubik-medium`, etc.) for a seamless dev handoff.

---

## 🌟 Core Features (MVP)

1. **Google Authentication** — easy login for users.
2. **Dynamic Routing** — flexible navigation (Home → Property Details → Profile).
3. **Property Listing Screen** — shows available properties.
4. **Property Details Screen** — shows detailed info, gallery, location, price.
5. **Owner Avatar & Profile Screen** — lets property owners show their profiles.
6. **Explore Screen** — displays featured properties and categories.
7. **Favorites (optional)** — allow saving preferred properties.

---

## 📄 Primary Screens

| Screen               | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| **Home**             | Displays featured and popular properties with search and filter options.       |
| **Explore**          | Allows users to discover properties dynamically by categories, location, etc.  |
| **Property Details** | Shows property gallery, details, price, owner avatar, and contact/book option. |
| **Profile**          | Displays user profile data, including avatar, saved listings, and logout.      |
| **Auth**             | Google login and onboarding flow.                                              |

---

## 📦 Planned UI Components

* **Navbar / Header** — screen‑specific titles and action buttons.
* **PropertyCard** — summary of properties (image, title, location, price).
* **Avatar** — for property owners and logged‑in users.
* **SearchBar & Filters** — location, price range, property type.
* **Gallery** — carousel of property images.
* **Button, Input, Badge** — shared UI primitives.
* **Loader & Empty State Components** — for data fetching and UX clarity.

---

## 🔌 Appwrite Integration

### Auth

* **Google Sign‑In** with Appwrite’s OAuthProvider.
* Session management handled via Appwrite SDK.

### Database Collections

* **Properties** — title, description, price, location, images[]
* **Users** — name, email, avatar, role (buyer / owner)
* **Favorites** (optional) — userId, propertyId

### Storage

* Property images stored using Appwrite Storage Bucket.

### Functions (future)

* Price alerts, notifications, or automated property recommendations.

---

## 📂 Suggested Project Structure

```
react-native-real-estate-app/
├─ app/                # screens & dynamic routing
│  ├─ (tabs)/          # tab-based navigation screens
│  ├─ property/[id].tsx  # dynamic property details route
│  ├─ profile.tsx
│  └─ ...
├─ components/        # reusable UI components
├─ constants/         # colors, fonts, icons
├─ hooks/             # custom React hooks
├─ lib/               # Appwrite SDK setup & API calls
├─ types/             # TypeScript type definitions
├─ utils/             # helpers, formatters
├─ assets/            # images, fonts
└─ scripts/           # build, seed, etc.
```

---

## ⚙️ Development Setup

```bash
# Clone repo
 git clone https://github.com/MHalemDEV2024/react-native-real-estate-app
 cd react-native-real-estate-app

# Install dependencies
 npm install

# Start dev server
 npx expo start

# Environment variables (example)
 EXPO_PUBLIC_APPWRITE_ENDPOINT=...
 EXPO_PUBLIC_APPWRITE_PROJECT_ID=...
 EXPO_PUBLIC_APPWRITE_DATABASE_ID=...
```

---

## 🚀 Project Milestones

The roadmap below reflects completed and upcoming development phases.

---

### ✅ Sprint 1 — Setup & Authentication  

*(Sep 21 – Sep 27, 2025 — completed)*

* Project scaffolded with routes, NativeWind, fonts, and assets  
* Integrated Appwrite SDK and Google Sign-In  
* Implemented sign-in screen and authentication flow  
* Added profile screen with avatar upload  
* Established bottom-tab navigation for core sections

---

### ✅ Sprint 2 — Listings & Explore  

*(Sep 27 – Sep 28, 2025 — completed)*

* Configured Appwrite database and seeded initial property data  
* Built Home screen with featured and recent property listings  
* Developed Explore screen for browsing properties with filters  
* Integrated property queries and display of Appwrite data  
* Created reusable PropertyCard component and listings view

---

### 🚧 Sprint 3 — Property Details & Core UX  

*(Sep 29 – Oct 5, 2025 — upcoming)*

* Build **Property Details** screen  
  * Interactive photo gallery  
  * Owner avatar and profile link  
  * Map preview and booking button
* Enable **Dynamic Routing** for property details
* Complete **Portfolio / Profile** screen  
  * User-listed properties  
  * Profile editing and avatar update
* Deliver **Bookings** screen to show past and upcoming reservations
* Implement **Settings & Account** section  
  *(account, security, language, payments, notifications, help, invite)*
* Refine Home & Explore screens for responsiveness and accessibility
* Performance optimization and minor UX improvements

---

### 🟢 Sprint 4 — Onboarding & Final Polish  

*(Oct 6 – Oct 12, 2025 — planned)*

* Add **Splash Screen** and finalize app branding
* Introduce **Onboarding Flow** to guide new users
* Consolidate “More / Settings” menu for easy navigation
* Conduct final QA and resolve bugs
* Optimize image loading and caching
* Prepare demo build and store-ready assets
* Update documentation and screenshots for release

---

> 📌 **Current Status:** End of Sprint 2  
> 🟩 **Next Focus:** Sprint 3 — delivering Property Details, Portfolio/Profile, Bookings, and Settings screens  
> 🟦 **Following:** Sprint 4 — onboarding, splash, final polish, and release readiness

---

## ✅ Sample Code — Appwrite Config (`lib/appwrite.ts`)

```ts
import { Client, Account, Databases, Storage, OAuthProvider } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const loginWithGoogle = async () => {
  return account.createOAuth2Session(OAuthProvider.Google);
};
```

---

## 🔑 Key Advantages

* **Serverless backend** reduces DevOps overhead.
* **NativeWind** speeds up UI styling with Tailwind syntax.
* **Dynamic routing** improves code organization for scalable mobile navigation.
* **Google Auth** simplifies user onboarding.

---

## 📎 Next Steps

1. Document API endpoints for properties and favorites.
2. Create reusable component library with NativeWind styling.
3. Integrate unit testing for hooks and components.
4. Setup automated CI/CD workflow for Expo builds.

This plan aligns the team to build a reliable, scalable, and modern real estate mobile application.


