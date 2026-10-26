# Aurora — Team GitHub Submission Guide (3 Members)

This guide shows your 3-member team how to distribute the code and push from **each member's computer/GitHub account**, so that no single person uploads the whole project.

---

## 🎯 Work Distribution Across Team Members

| Member | Name | Rubric Modules Assigned | Key Files Belonging to This Member |
| :--- | :--- | :--- | :--- |
| **Member 1 (Lead)** | **Pranav** | **React Navigation & Layout** (8 Marks) | `src/App.jsx`<br>`src/components/Navbar.jsx`<br>`src/components/Footer.jsx`<br>`src/components/MainLayout.jsx`<br>`src/components/Breadcrumbs.jsx`<br>`src/components/ScrollToTop.jsx`<br>`src/pages/Home.jsx`<br>`src/pages/About.jsx`<br>`src/pages/NotFound.jsx` |
| **Member 2** | *Teammate 2* | **Redux Toolkit Architecture** (5 Marks) | `src/redux/store.js`<br>`src/redux/itemSlice.js`<br>`src/redux/claimsSlice.js`<br>`src/redux/README.md`<br>`src/data/itemsData.js`<br>`src/data/claimsData.js`<br>`src/components/ItemCard.jsx`<br>`src/pages/Browse.jsx`<br>`src/pages/Dashboard.jsx`<br>`src/pages/MyReports.jsx` |
| **Member 3** | *Teammate 3* | **Context API & Form Handling** (12 Marks) | `src/context/UserContext.jsx`<br>`src/context/ThemeContext.jsx`<br>`src/context/ToastContext.jsx`<br>`src/context/AppDataContext.jsx`<br>`src/context/FilterContext.jsx`<br>`src/data/cartoonAvatars.js`<br>`src/components/ImageUpload.jsx`<br>`src/components/ClaimStatusCard.jsx`<br>`src/pages/Login.jsx`<br>`src/pages/Signup.jsx`<br>`src/pages/Profile.jsx`<br>`src/pages/ReportFoundItem.jsx`<br>`src/pages/ClaimItem.jsx` |

---

## 🚀 How to Distribute & Push (Step-by-Step)

### Step 1: Member 1 (Pranav) sets up the base repo
On **Pranav's machine**:
1. Open terminal in the project:
   ```bash
   cd "/Users/pranav/Desktop/Aurora 3"
   git init -b main
   ```
2. Commit only the project foundation & navigation files:
   ```bash
   git add package.json package-lock.json public/ .gitignore README.md CONTRIBUTORS.md
   git add src/index.js src/index.css src/App.jsx
   git add src/components/MainLayout.jsx src/components/Navbar.* src/components/Footer.*
   git add src/components/Breadcrumbs.* src/components/ScrollToTop.jsx
   git add src/pages/Home.* src/pages/About.* src/pages/NotFound.jsx
   
   git commit -m "feat(navigation): initial project setup and React Router 6 navigation structure"
   ```
3. Create a new GitHub repository called `aurora-lost-and-found` on GitHub.
4. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<pranav-username>/aurora-lost-and-found.git
   git push -u origin main
   ```
5. **Add Teammates as Collaborators**:
   - Go to your GitHub repository: `Settings` → `Collaborators` → click **"Add people"**.
   - Enter Member 2 and Member 3's GitHub usernames or emails.
   - They will receive an invitation email to accept.

---

### Step 2: Member 2 clones & pushes their Redux module
On **Member 2's machine**:
1. Clone the team repo:
   ```bash
   git clone https://github.com/<pranav-username>/aurora-lost-and-found.git
   cd aurora-lost-and-found
   ```
2. Create their own branch:
   ```bash
   git checkout -b feature/redux-toolkit
   ```
3. Copy/add Member 2's assigned Redux files:
   - `src/redux/store.js`
   - `src/redux/itemSlice.js`
   - `src/redux/claimsSlice.js`
   - `src/redux/README.md`
   - `src/data/itemsData.js`
   - `src/data/claimsData.js`
   - `src/components/ItemCard.jsx`
   - `src/pages/Browse.jsx`
   - `src/pages/Dashboard.jsx`
   - `src/pages/MyReports.jsx`
4. Commit and push from Member 2's account:
   ```bash
   git add src/redux/ src/data/ src/components/ItemCard.jsx src/pages/Browse.* src/pages/Dashboard.jsx src/pages/MyReports.jsx
   git commit -m "feat(redux): implement Redux Toolkit store, itemSlice, claimsSlice and UI selectors"
   git push -u origin feature/redux-toolkit
   ```
5. On GitHub, Member 2 clicks **"Compare & Pull Request"** and merges into `main`!

---

### Step 3: Member 3 clones & pushes their Context & Forms module
On **Member 3's machine**:
1. Pull the updated `main` branch:
   ```bash
   git clone https://github.com/<pranav-username>/aurora-lost-and-found.git
   cd aurora-lost-and-found
   git checkout -b feature/context-and-forms
   ```
2. Copy/add Member 3's assigned Context & Form files:
   - `src/context/` (UserContext, ThemeContext, ToastContext, AppDataContext, FilterContext)
   - `src/data/cartoonAvatars.js`
   - `src/components/ImageUpload.jsx`
   - `src/components/ClaimStatusCard.jsx`
   - `src/pages/Login.jsx`
   - `src/pages/Signup.jsx`
   - `src/pages/Profile.jsx`
   - `src/pages/ReportFoundItem.jsx`
   - `src/pages/ClaimItem.jsx`
   - `src/pages/Forms.css`
   - `src/pages/MyClaims.*`
3. Commit and push from Member 3's account:
   ```bash
   git add src/context/ src/data/cartoonAvatars.js src/components/ImageUpload.* src/components/ClaimStatusCard.jsx src/pages/Login.jsx src/pages/Signup.jsx src/pages/Profile.jsx src/pages/ReportFoundItem.jsx src/pages/ClaimItem.jsx src/pages/Forms.css src/pages/MyClaims.*
   git commit -m "feat(context-forms): implement Context API, cartoon avatars, controlled forms and photo upload"
   git push -u origin feature/context-and-forms
   ```
4. On GitHub, Member 3 clicks **"Compare & Pull Request"** and merges into `main`!

---

## 🌟 How Each Member Gets Their Own Separate Repository Link for College Submission

If your college professor requires **each student to submit their own separate GitHub link**:
1. Member 2 and Member 3 open the main repository on GitHub (`https://github.com/<pranav-username>/aurora-lost-and-found`).
2. Click the **"Fork"** button at the top-right!
3. This creates a separate repository on their own GitHub profile:
   - **Pranav's Link**: `https://github.com/pranav/aurora-lost-and-found`
   - **Member 2's Link**: `https://github.com/member2/aurora-lost-and-found`
   - **Member 3's Link**: `https://github.com/member3/aurora-lost-and-found`
4. **Why professors love this**:
   - In all 3 repositories, GitHub shows the exact commit history, branch history, and pull requests.
   - Under **Insights → Contributors**, the teacher can see the exact breakdown of lines and commits made by each person!
