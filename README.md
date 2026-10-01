# User Directory Management — Frontend Screening Task

A modern, responsive User Management Directory built with **Next.js (App Router)**, **React**, **TypeScript**, and **MUI (Material UI)**. This project was completed as part of a Frontend Developer Screening Task.

---

## 🚀 Features

- **📊 User Table Grid View**: Displays users fetched from static JSON data with columns for Avatar, First Name, Last Name, Email, and Actions.
- **➕ Add User**: "Add User" button opens a validated modal form. Submitting prepends the new user to the list, generates an avatar, and jumps to Page 1 for immediate feedback.
- **✏️ Edit User**: "Edit" button pre-fills modal form with the clicked record's details and updates the table row on save.
- **🛡️ Strict Form Validation**: Real-time validation for required fields (First Name, Last Name, Email) and email format regex checking with inline MUI error messages.
- **📄 Client-Side Pagination**: Custom pagination displaying current page, total pages, and a record range summary (e.g. `Showing 1 - 5 of 12 records`).
- **⚡ Skeleton Loading**: Table loading state using MUI Skeleton row placeholders.
- **📘 Strict TypeScript & Modern React**: 100% strict TypeScript types with zero `any` usage and updated React 19 event handlers (`SubmitEvent`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React.js](https://react.dev/)
- **UI Toolkit**: [MUI Material UI](https://mui.com/) & [@mui/icons-material](https://mui.com/material-ui/material-icons/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Avatar Generator**: [DiceBear API](https://api.dicebear.com/)

---

## 📁 Project Structure

```text
primis-fe-task/
├── app/
│   ├── layout.tsx         # Root layout with MUI & Theme setup
│   └── page.tsx           # Home page rendering UsersTable
├── components/
│   ├── UsersTable.tsx     # Main container component (State management, Pagination)
│   ├── TableEntries.tsx   # MUI Table layout and Skeleton loading component
│   └── ui/
│       └── Modal.tsx      # User Form Modal (Add/Edit mode, validation & submit logic)
├── public/
│   └── data.json          # Static JSON user dataset
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18+ recommended) and **npm** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd primis-fe-task
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🧪 Verification & Type Check

To verify TypeScript strictly without errors:

```bash
npx tsc --noEmit
```
