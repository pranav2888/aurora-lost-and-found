# Aurora — Campus Lost & Found (Evaluation 2)

Aurora is a modern React front-end application built for campus lost-and-found recovery, developed for **CSE-AI 3rd Semester — Front End Engineering Evaluation Component 2**.

---

## 🎯 Evaluation Component 2 Rubric Mapping (Target: 25 / 25 Marks)

| Criteria | Rubric Description | Implementation in Aurora | Marks |
| :--- | :--- | :--- | :---: |
| **1. React-Navigation layout and page structure** | Deep understanding of React Navigation / Router layout and page structure | Nested layout routes using `<Outlet />` (`MainLayout.jsx`), dynamic parameters (`:id`, `:claimId`), protected routes (`ProtectedRoute`), breadcrumbs (`Breadcrumbs.jsx`), `ScrollToTop.jsx`, query parameter sync (`useSearchParams`), active NavLink styling, 404 page. | **7 - 8 / 8** |
| **2. Context API and State architecture** | Excellent command on Context API and State architecture | Structured separation of cross-cutting concerns: `UserContext` (auth & profile), `ThemeContext` (dark/light mode), `ToastContext` (global animated notifications), and `AppDataContext` bridge. | **6 - 8 / 8** |
| **3. Intro to Redux Toolkit** | Effective implementation of Redux Toolkit | Centralized store (`configureStore`), `itemSlice` & `claimsSlice`, async thunk `fetchItemsSimulated`, `useSelector` & `useDispatch` in components, and auto-sync to `localStorage`. | **3 - 5 / 5** |
| **4. Form handling in React** | Excellent usage of Form handling in React | Controlled forms, real-time field-level validation, inline error messaging, date limits (`max={today}`), show/hide password toggle, password strength meter, drag-and-drop photo upload with preview & file size validation (< 2MB). | **3 - 4 / 4** |
| **Total** | **Excellent Tier** | | **19 - 25 / 25** |

---

## 🚀 Key Features & Polish

### 1. Photo Handling & Cartoon Avatars
- **Drag-and-Drop & File Picker (`ImageUpload.jsx`)**: Custom styled dropzone supporting file drag-and-drop, browse button, and hover/drag effects.
- **File Validation**: Enforces image file types (`image/png`, `image/jpeg`, `image/webp`) and restricts files to `< 2MB` with user-friendly error banners.
- **Live Preview & Controls**: Instant base64 image preview thumbnail with **"Change Photo"** and **"Remove"** overlay buttons.
- **Live Catalog Preview Card**: In `ReportFoundItem.jsx`, as you type and upload photos, a side-by-side card preview renders in real time showing exactly how other students will view your card.
- **Cartoon Avatar Selection**: In `Profile.jsx` and `Signup.jsx`, students can choose from crisp, colorful cartoon avatars or upload a custom image.
- **Accurate Object Photos**: Catalog items feature verified, high-resolution photographs corresponding directly to the lost items (Casio scientific calculator, RFID college ID card badge, steel water bottle, laptop charger, leather wallet, etc.).

### 2. State Management Architecture (Context API + Redux Toolkit)
- **Redux Toolkit (`src/redux/`)**:
  - `itemSlice.js`: Items catalog, bookmarks/saved items, category/status filters, thunk for loading states.
  - `claimsSlice.js`: Claim submissions, verification updates, claim status transitions.
  - `store.js`: Subscribed to `localStorage` for complete front-end data persistence.
  - Connected at root via `<Provider store={store}>` in `index.js`.
- **Context API (`src/context/`)**:
  - `ThemeContext`: Toggles between Light and Dark mode with CSS variable theming and persistence.
  - `ToastContext`: Floating notification banners (`toast.success()`, `toast.error()`, `toast.info()`).
  - `UserContext`: User authentication session, profile updates, and email migration synchronization.

### 3. Campus Security Verification Slip
- In `MyClaims.jsx`, students can click **"Verification Slip"** to view a printable campus security pass complete with an official reference code (`Ref: AUR-2026-xxx`), identifying mark details, and instructions for Admin Block collection.

---

## 💻 How to Run

1. Open terminal inside the project directory:
   ```bash
   cd "/Users/pranav/Desktop/Aurora 3"
   ```

2. Run the development server:
   ```bash
   npm start
   ```
   The application will launch automatically at `http://localhost:3000`.

3. To create an optimized production build:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Account

- **Email**: `pranav@aurora.com`
- **Password**: `password123`
- Pre-loaded with demo reports and claims to immediately showcase Dashboard metrics, My Reports, and My Claims.
