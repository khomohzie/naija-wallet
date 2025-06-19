# NaijaWallet

A modern digital wallet and banking app for Nigeria, built with Next.js, TypeScript, and Tailwind CSS. NaijaWallet enables users to securely manage their finances, send money to other wallets or bank accounts, and view recent transactions—all with a beautiful, responsive UI.

## Features

- **User Authentication**: Register and log in with email, phone, and password. OTP verification is supported.
- **Wallet Dashboard**: View wallet balance, recent transactions, and quick actions after login.
- **Send Money**: Transfer funds to other NaijaWallet users or to Nigerian bank accounts (mocked with Fineract, NIBSS, and Flutterwave integrations).
- **Transaction History**: See a list of recent debits and credits, including top-ups and transfers.
- **Responsive UI**: Built with styled-components and shadcn/ui, leveraging Tailwind CSS for rapid styling.
- **Mocked Backend Services**: All services (auth, wallet, payment, transaction) are mocked for demo purposes, simulating real-world APIs.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [styled-components](https://styled-components.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Component Library**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **State & Forms**: React Hooks, [react-hook-form](https://react-hook-form.com/)
- **Mocked Integrations**: Fineract (core banking), NIBSS (bank transfers), Flutterwave (payments)

## Project Structure

```
app/            # Next.js app directory (pages, layouts, routes)
components/     # Reusable UI and feature components
services/       # Mocked backend service logic (auth, wallet, payment, transaction)
hooks/          # Custom React hooks
lib/            # Utility functions
styles/         # Global styles (Tailwind, etc.)
public/         # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd wallet-app
   ```
2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   # or
   pnpm install
   ```
3. **Run the development server:**
   ```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
yarn build
yarn start
```

## Environment Variables

The app uses environment variables for mocked API endpoints (Fineract, NIBSS, Flutterwave). You can set these in a `.env.local` file:

```
NEXT_PUBLIC_FINERACT_URL=https://demo.fineract.dev
NEXT_PUBLIC_NIBSS_URL=https://api.nibss-plc.com.ng
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-mock-key
```

## Customization

- **UI**: Modify components in `components/` and styles in `styles/` or Tailwind config.
- **Mocked Logic**: Update or replace service logic in `services/` for real API integration.

## License

This project is for demonstration and educational purposes. Please adapt and extend as needed for production use.

---

**NaijaWallet** — Secure Digital Banking for Nigeria 🇳🇬
