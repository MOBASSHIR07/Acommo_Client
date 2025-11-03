# 📚 Acommo Client


### Live : https://acommoclient.web.app/
#### Admin: toyemaf765@filipx.com,  Password:123456
Host: Email: rovir13905@fixwap.com , Password:123456
---

## 1. Executive Summary

The **Acommo Client** is the front-end application interface for the **Acommo Property Rental Platform**.  
It is a **Single-Page Application (SPA)** built on **React (Vite)**, utilizing **Tailwind CSS** for styling and **Firebase** for primary authentication.

The core architectural strength lies in its **Role-Based Access Control (RBAC)**, powered by seamless integration between Firebase, custom Axios hooks, and React Query for secure state management and data synchronization with the backend API.

---

## 📁 Project Structure

```
├── .eslintrc.cjs
├── .firebase
│   └── hosting.ZGlzdA.cache
├── .firebaserc
├── .gitignore
├── README.md
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.png
│   ├── rooms.json
│   └── vite.svg
├── src
│   ├── api
│   │   └── utils
│   │       └── index.js
│   ├── assets
│   │   └── images
│   │       ├── logo.png
│   │       └── placeholder.jpg
│   ├── components
│   │   ├── Categories
│   │   │   ├── Categories.jsx
│   │   │   ├── CategoriesData.js
│   │   │   └── CategoryBox.jsx
│   │   ├── Dashboard
│   │   │   ├── Menu.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Form
│   │   │   ├── AddRoomForm.jsx
│   │   │   └── CheckoutForm.jsx
│   │   ├── Home
│   │   │   ├── Card.jsx
│   │   │   └── Rooms.jsx
│   │   ├── Modal
│   │   │   └── HostRequestModal.jsx
│   │   ├── RoomDetails
│   │   │   ├── BookingModal.jsx
│   │   │   └── RoomReservation.jsx
│   │   └── Shared
│   │       ├── Button
│   │       │   └── Button.jsx
│   │       ├── Container.jsx
│   │       ├── EmptyState.jsx
│   │       ├── Footer
│   │       │   └── Footer.jsx
│   │       ├── Heading.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── Navbar
│   │           └── Navbar.jsx
│   ├── firebase
│   │   └── firebase.config.js
│   ├── hooks
│   │   ├── useAuth.js
│   │   ├── useAxiosCommon.jsx
│   │   ├── useAxiosSecure.jsx
│   │   └── useRole.js
│   ├── index.css
│   ├── layouts
│   │   ├── DashBoardLayout.jsx
│   │   └── Main.jsx
│   ├── main.jsx
│   ├── pages
│   │   ├── Dashboard
│   │   │   ├── Admin
│   │   │   │   ├── AdminStatistic.jsx
│   │   │   │   └── ManageUsers.jsx
│   │   │   ├── Common
│   │   │   │   ├── ChangePasswordModal.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Statistic.jsx
│   │   │   │   └── UpdateProfileModal.jsx
│   │   │   ├── Guest
│   │   │   │   ├── BecomeHost.jsx
│   │   │   │   ├── BookingDataRow.jsx
│   │   │   │   ├── GuestStatistic.jsx
│   │   │   │   └── MyBooking.jsx
│   │   │   └── Host
│   │   │       ├── AddRoom.jsx
│   │   │       ├── EditRoomModal.jsx
│   │   │       ├── HostStatistic.jsx
│   │   │       ├── ManageBooking.jsx
│   │   │       ├── MyListings.jsx
│   │   │       └── RoomCard.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── Home
│   │   │   └── Home.jsx
│   │   ├── Login
│   │   │   └── Login.jsx
│   │   ├── RoomDetails
│   │   │   └── RoomDetails.jsx
│   │   └── SignUp
│   │       └── SignUp.jsx
│   ├── providers
│   │   └── AuthProvider.jsx
│   └── routes
│       ├── AdminRoute.jsx
│       ├── HostRoute.jsx
│       ├── PrivateRoute.jsx
│       └── Routes.jsx
├── tailwind.config.js
└── vite.config.js
```


## 2. Core Technology Stack

| **Category** | **Technology** | **Version / Tool** | **Purpose** |
|---------------|----------------|--------------------|--------------|
| **Frontend Framework** | React.js | Vite | High-performance user interface development |
| **Styling** | Tailwind CSS | Utility-First | Rapid and scalable component styling |
| **Data Fetching** | React Query | @tanstack/react-query | Server state management, caching, and background synchronization |
| **Authentication** | Firebase Auth | Google, Email/Password | Secure user identity management |
| **Routing** | React Router DOM | v6+ | Client-side navigation and protected routing logic |
| **Payments** | Stripe | @stripe/react-stripe-js | Secure, PCI-compliant payment collection |
| **Data Visualization** | Recharts | NPM Package | Rendering dashboard statistical charts |

---

## 3. Architecture and Security Model (RBAC Flow)

The application enforces strict **Role-Based Access Control (RBAC)**, ensuring that user privileges (`Guest`, `Host`, `Admin`) are verified client-side via a secured, asynchronous flow.

### 3.1. Authentication and Token Handling (`AuthProvider.jsx`)

- **Firebase Login**  
  The user initiates sign-in via Firebase (e.g., Google Popup).

- **Initial Backend Sync**  
  Upon successful Firebase authentication, the `onAuthStateChanged` observer is triggered.  
  It performs two critical, cross-origin requests to the backend:

  1. **JWT Acquisition:**  
     Calls the backend `/jwt` endpoint to obtain a secure, HTTP-only JWT cookie.  
     This cookie is crucial for subsequent secure API calls.

  2. **User Persistence:**  
     Calls the backend `/user` endpoint to ensure the user's base record (`role: 'guest'`) is created/updated in the MongoDB database.

---

### 3.2. Secure API Communication (`useAxiosSecure.jsx`)

- The `useAxiosSecure` custom hook creates an Axios instance configured with `withCredentials: true`, ensuring the HTTP-only JWT cookie is automatically attached to every request.

- **Interceptor Logic:**  
  A response interceptor monitors HTTP status codes:
  - If a response returns **401 (Unauthorized)** or **403 (Forbidden)**, it triggers a **secure logout flow**:
    - Clears the Firebase session.  
    - Calls the backend `/logout` endpoint to remove the cookie.  
    - Redirects the user to `/login`.

---

### 3.3. Role Determination (`useRole.js`)

- Uses **React Query** (`['role', user?.email]`) to fetch the current user's role from the backend `/user/:email` endpoint via `useAxiosSecure`.
- The returned role (`admin`, `host`, or `guest`) is cached and used by routing components and dashboard menus to dynamically adjust UI and access rights.

---

## 4. Feature Implementation Details

### 4.1. Dashboard Structure (`DashBoardLayout.jsx`)

- The **Dashboard** acts as the central hub for user-specific functionality.  
- The `Statistic.jsx` component intelligently renders the correct statistics page:
  - `AdminStatistic`
  - `HostStatistic`
  - `GuestStatistic`  
  (Based on the role returned by `useRole()`.)

- **Host View Toggle:**  
  `Sidebar.jsx` allows hosts to dynamically switch between their **Host Dashboard** and **Guest Dashboard** (`/dashboard?view=guest`), improving platform usability for multi-role users.

---

### 4.2. Room Listing Management (Host)

| **Endpoint** | **File** | **Role** | **Mechanism** |
|---------------|----------|----------|---------------|
| **Creation** | `AddRoom.jsx` | Host | Uses `imageUpload` utility (ImgBB API) for image processing. Posts form data via React Mutation for instant UI feedback. |
| **Listing** | `MyListings.jsx` | Host | Fetches rooms filtered by host email (`/my-rooms/:email`). Implements optimistic UI updates for DELETE and PUT via separate mutations. |
| **Editing** | `EditRoomModal.jsx` | Host | Manages complex form state, re-uploads images, and converts numeric inputs (`price`, `guests`, etc.) before performing PUT request to backend. |

---

### 4.3. Booking and Payment Flow

The client handles secure payment and reservation in **three stages**:

1. **Date Selection (`RoomReservation.jsx`)**  
   - Fetches existing bookings (`/bookings/:roomId`)  
   - Disables occupied dates in `react-date-range` component to prevent double-booking.  

2. **Payment Intent Creation (`CheckoutForm.jsx`)**  
   - Calls authenticated backend endpoint `/create-payment-intent` with calculated price.  
   - Initiates the secure payment transaction via Stripe.

3. **Finalization**  
   - Upon successful Stripe confirmation, posts finalized payment info (including `transactionId` and guest details) to backend `/bookings` endpoint to complete reservation.

---

## 5. Routing and Protection Matrix

All dashboard paths are wrapped with `PrivateRoute` and further secured by role-based middlewares.

| **Path** | **Primary Component** | **Protection Middleware** | **Permitted Roles** |
|-----------|-----------------------|----------------------------|----------------------|
| `/` | Home | Public | All Users |
| `/room/:id` | RoomDetails | PrivateRoute | Authenticated Users |
| `/dashboard` | Statistic | PrivateRoute | All Authenticated Roles |
| `/dashboard/manage-users` | ManageUsers | AdminRoute | Admin Only |
| `/dashboard/addroom` | AddRoom | HostRoute | Host Only |
| `/dashboard/mylistings` | MyListings | HostRoute | Host Only |
| `/dashboard/managebooking` | ManageBooking | HostRoute | Host Only |
| `/dashboard/mybooking` | MyBooking | PrivateRoute | All Authenticated Roles |

---
