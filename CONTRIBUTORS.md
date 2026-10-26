# Team Contribution Statement — Aurora Lost & Found

**Course**: CSE (Artificial Intelligence & Machine Learning) — 3rd Semester  
**Subject**: Front-End Engineering  
**Component**: Evaluation Component 2 (25 Marks)  
**Project**: Aurora — Campus Lost & Found Platform  

---

## 👥 Team Overview & Work Distribution

| Member # | Name | Roll Number | Primary Responsibilities & Rubric Modules | Contribution % |
| :---: | :--- | :---: | :--- | :---: |
| **1 (Lead)** | **Pranav** | `23AI045` | **React-Navigation, Page Layout & Structure** (Rubric 1: 8 Pts) | **35%** |
| **2** | **Team Member 2** *(Update Name)* | `23AI0xx` | **Redux Toolkit (RTK) State Architecture** (Rubric 3: 5 Pts) | **33%** |
| **3** | **Team Member 3** *(Update Name)* | `23AI0yy` | **Context API & Form Handling** (Rubric 2 & 4: 12 Pts) | **32%** |
| **Total** | | | **All 4 Rubric Evaluation Criteria** | **100%** |

---

## 📌 Detailed Work Breakdown by Member

### 👤 Member 1: Pranav (Team Lead) — `23AI045`
* **Assigned Evaluation Criterion**: **React-Navigation layout and page structure (8 Marks)**
* **Modules & Features Implemented**:
  1. **Route Architecture & Layout**:
     - Configured modern React Router 6 nested routing with root layout (`MainLayout.jsx`) using `<Outlet />`.
     - Built header [`Navbar.jsx`](src/components/Navbar.jsx) with responsive mobile drawer, route links, and active state indicators using `NavLink`.
     - Implemented sticky [`Footer.jsx`](src/components/Footer.jsx) with 3-column campus info and quick links.
  2. **Navigation UX & Transitions**:
     - Implemented [`ScrollToTop.jsx`](src/components/ScrollToTop.jsx) to automatically reset viewport scroll upon route changes.
     - Created dynamic [`Breadcrumbs.jsx`](src/components/Breadcrumbs.jsx) that parses route segments (`Home / Browse / Item Details`) with clickable links.
     - Built [`NotFound.jsx`](src/pages/NotFound.jsx) for custom 404 error recovery.
  3. **Protected Navigation & Dynamic Parameters**:
     - Programmed `ProtectedRoute` wrapper in [`App.jsx`](src/App.jsx) with state retention (`location.state?.from`) so students return to their requested page after authentication.
     - Implemented dynamic route parameters (`/item/:id`, `/claim/:id`, `/edit-report/:id`, `/edit-claim/:claimId`).
     - Added URL query parameter synchronization in [`Browse.jsx`](src/pages/Browse.jsx) (`useSearchParams`) so category chips on Home (`/browse?category=Electronics`) immediately filter the catalog.

---

### 👤 Member 2: Team Member 2 — `23AI0xx`
* **Assigned Evaluation Criterion**: **Intro to Redux Toolkit (5 Marks)**
* **Modules & Features Implemented**:
  1. **Redux Store Architecture**:
     - Initialized and configured the centralized Redux store in [`src/redux/store.js`](src/redux/store.js) using `configureStore()`.
     - Connected `<Provider store={store}>` at root level in [`src/index.js`](src/index.js) so state is globally accessible.
  2. **Redux Slices & Reducers**:
     - Designed [`src/redux/itemSlice.js`](src/redux/itemSlice.js):
       - Actions: `addItem`, `updateItem`, `updateItemStatus`, `toggleSaveItem`, `changeItemOwnerEmail`, `setLoading`, `setError`.
       - Implemented asynchronous thunk `fetchItemsSimulated` using `createAsyncThunk()` to demonstrate the async request lifecycle (`pending`, `fulfilled`, `rejected`).
     - Designed [`src/redux/claimsSlice.js`](src/redux/claimsSlice.js):
       - Actions: `addClaim`, `updateClaim`, `updateClaimStatus`, `changeClaimOwnerEmail`.
  3. **Data Layer & Persistence**:
     - Integrated `store.subscribe()` to auto-sync Redux state with browser `localStorage` (`auroraItems`, `auroraSavedItems`, `auroraClaims`).
     - Replaced legacy prop drilling across [`Browse.jsx`](src/pages/Browse.jsx), [`ItemCard.jsx`](src/components/ItemCard.jsx), [`Dashboard.jsx`](src/pages/Dashboard.jsx), and [`MyReports.jsx`](src/pages/MyReports.jsx) with reactive `useSelector` and `useDispatch` hooks.
     - Created initial campus seed datasets in [`itemsData.js`](src/data/itemsData.js) and [`claimsData.js`](src/data/claimsData.js).

---

### 👤 Member 3: Team Member 3 — `23AI0yy`
* **Assigned Evaluation Criteria**: **Context API (8 Marks) & Form Handling in React (4 Marks)**
* **Modules & Features Implemented**:
  1. **Context API Layer (State Architecture)**:
     - Built [`UserContext.jsx`](src/context/UserContext.jsx): User authentication state (`user`), session persistence, login, signup, and profile credential management.
     - Built [`ThemeContext.jsx`](src/context/ThemeContext.jsx): Dark and Light theme toggle, synced with document attributes and persisted to `localStorage`.
     - Built [`ToastContext.jsx`](src/context/ToastContext.jsx): Global UI notification dispatcher (`toast.success()`, `toast.error()`, `toast.info()`) with auto-dismiss timers.
     - Maintained [`AppDataContext.jsx`](src/context/AppDataContext.jsx) as a hook bridge to ensure backward compatibility.
  2. **Form Handling in React**:
     - Built controlled forms across [`ReportFoundItem.jsx`](src/pages/ReportFoundItem.jsx), [`ClaimItem.jsx`](src/pages/ClaimItem.jsx), [`Login.jsx`](src/pages/Login.jsx), [`Signup.jsx`](src/pages/Signup.jsx), and [`Profile.jsx`](src/pages/Profile.jsx).
     - Implemented real-time field-level validation with touched states, inline error messages, and red focus borders.
     - Added date picker constraints (`max={today}`) preventing future dates for lost/found items.
     - Added password visibility toggles (Show/Hide 👁️) and real-time password strength indicators.
  3. **Photo Handling & Cartoon Avatars**:
     - Developed reusable [`ImageUpload.jsx`](src/components/ImageUpload.jsx) supporting drag-and-drop, file type validation, and 2MB size enforcement.
     - Created [`cartoonAvatars.js`](src/data/cartoonAvatars.js) providing crisp vector cartoon avatars for student accounts.
     - Built live catalog card preview in [`ReportFoundItem.jsx`](src/pages/ReportFoundItem.jsx) and flicker-free verification slip modal in [`ClaimStatusCard.jsx`](src/components/ClaimStatusCard.jsx) using React Portals (`createPortal`).

---

## 🔀 Git Branch & Commit Strategy

```
* Final Commit: Integrated polish, React Portal verification slip, responsive styles (All Members)
* Commit 6: Dynamic routing, URL search params sync & protected routes (Pranav - Member 1)
* Commit 5: UI components connected to Redux Toolkit via useSelector/useDispatch (Member 2)
* Commit 4: Controlled forms with real-time validation, photo drag-and-drop (Member 3)
* Commit 3: Context API architecture (User, Theme & Toast notification systems) (Member 3)
* Commit 2: Redux Toolkit store, itemSlice, claimsSlice & async thunks (Member 2)
* Commit 1: Project setup, React Router 6 navigation, nested layouts & page structure (Pranav - Member 1)
```

---

## 🎯 Verification Checklist for Evaluator
- [x] **React Navigation (Rubric 1)**: Verified in `App.jsx`, `MainLayout.jsx`, `Browse.jsx`
- [x] **Context API (Rubric 2)**: Verified in `UserContext.jsx`, `ThemeContext.jsx`, `ToastContext.jsx`
- [x] **Redux Toolkit (Rubric 3)**: Verified in `src/redux/store.js`, `itemSlice.js`, `claimsSlice.js`
- [x] **Form Handling (Rubric 4)**: Verified in `ReportFoundItem.jsx`, `ClaimItem.jsx`, `Profile.jsx`, `Signup.jsx`
- [x] **Git Contribution Graph**: Verified across team commits in git log
