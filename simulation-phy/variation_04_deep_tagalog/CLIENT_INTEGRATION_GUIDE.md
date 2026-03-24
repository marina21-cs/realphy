# Out Of Nines — Client Account Integration Guide

> **Prepared by:** Kenny Ivan Zamora (Developer)
> **Prepared for:** Antone Ferraris (Client / Business Owner)
> **Date:** February 11, 2026
> **Domain:** outofnine.com (owned by client, not yet configured)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Audit](#2-current-state-audit)
3. [What Needs to Transfer / Set Up](#3-what-needs-to-transfer--set-up)
4. [Phase 1: Email & Domain Setup](#phase-1-email--domain-setup-day-1)
5. [Phase 2: GitHub Organization](#phase-2-github-organization-day-1-2)
6. [Phase 3: Supabase Transfer](#phase-3-supabase-project-transfer-day-2-3)
7. [Phase 4: Vercel Deployment](#phase-4-vercel-deployment--domain-day-3-4)
8. [Phase 5: Expo / EAS Transfer](#phase-5-expo--eas-mobile-apps-day-4-5)
9. [Phase 6: App Store Submissions](#phase-6-app-store-submissions-day-5-10)
10. [Phase 7: DNS & Final Configuration](#phase-7-dns--final-configuration-day-4)
11. [Phase 8: Verification & Go-Live](#phase-8-verification--go-live-day-10-12)
12. [Realistic Timeline Summary](#realistic-timeline-summary)
13. [Cost Breakdown (Monthly)](#cost-breakdown-monthly-ongoing)
14. [Client Action Items Checklist](#client-action-items-checklist)
15. [Credentials & Secrets Inventory](#credentials--secrets-inventory)
16. [Risk & Contingency Notes](#risk--contingency-notes)

---

## 1. Executive Summary

The **Out Of Nines** loyalty system consists of **3 finished applications** and a **Supabase backend**, currently running under the developer's personal free-tier accounts. Everything needs to migrate to the client's own accounts for production ownership.

| Component                            | Current Host                                                 | Target                                           |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| **Admin Dashboard** (Next.js 14)     | Developer's Vercel (free)                                    | Client's Vercel → `admin.outofnine.com`          |
| **Customer App** (Expo/React Native) | Developer's Expo account                                     | Client's Expo org → Google Play / App Store      |
| **Scanner App** (Expo/React Native)  | Developer's Expo account                                     | Client's Expo org → Sideloaded APK or Play Store |
| **Backend/Database** (Supabase)      | Developer's Supabase (free) — project `ncbwpnwfwzhxarloriow` | Client's Supabase org (Pro plan)                 |
| **Source Code** (GitHub)             | `github.com/Keni-Dev/Nevabells` (private)                    | Client's GitHub org                              |
| **Domain**                           | `outofnine.com` (owned, not configured)                      | Configured with email + subdomains               |

### What the Client Has Right Now

- ✅ Domain: `outofnine.com` (registrar unknown — needs confirmation)
- ❌ No email configured (no `@outofnine.com` mailbox)
- ❌ No GitHub organization
- ❌ No Supabase organization
- ❌ No Expo/EAS organization
- ❌ No Vercel account
- ❌ No Google Play Developer / Apple Developer account

---

## 2. Current State Audit

### 2.1 Admin Dashboard (`@nevabells/admin`)

| Detail            | Value                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**     | Next.js 14 (App Router)                                                                                                              |
| **Hosting**       | Vercel (developer's free tier)                                                                                                       |
| **Region**        | `sin1` (Singapore — closest to Philippines)                                                                                          |
| **URL (current)** | Auto-generated Vercel URL                                                                                                            |
| **URL (target)**  | `admin.outofnine.com`                                                                                                                |
| **Auth**          | Supabase Auth (email/password + OAuth-ready)                                                                                         |
| **Role Access**   | `admin` and `owner` roles only (enforced by middleware)                                                                              |
| **Features**      | Dashboard analytics, staff CRUD, customer management, transaction logs with CSV export, point rules configuration, business settings |

### 2.2 Customer App (`@nevabells/customer`)

| Detail                | Value                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **Framework**         | Expo SDK 54 / React Native 0.81                                                                       |
| **App Name**          | "Out Of Nines"                                                                                        |
| **Bundle ID (iOS)**   | `com.nevabells.customer` → **needs update to `com.outofnine.customer`**                               |
| **Package (Android)** | `com.nevabells.customer` → **needs update to `com.outofnine.customer`**                               |
| **Slug**              | `nevabells-customer`                                                                                  |
| **Auth**              | Email/password + Google OAuth (ready) + Apple Sign-In (ready)                                         |
| **Features**          | QR code display, real-time balance updates, transaction history, tier progression, profile management |

### 2.3 Scanner App (`@nevabells/scanner`)

| Detail                | Value                                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| **Framework**         | Expo SDK 54 / React Native 0.81                                                  |
| **App Name**          | "Out Of Nines Scanner"                                                           |
| **Bundle ID (iOS)**   | `com.nevabells.scanner` → **needs update to `com.outofnine.scanner`**            |
| **Package (Android)** | `com.nevabells.scanner` → **needs update to `com.outofnine.scanner`**            |
| **Slug**              | `nevabells-scanner`                                                              |
| **Auth**              | Staff email/password (device setup) → PIN-based shift login                      |
| **Features**          | QR camera scanning, NevaCoin calculation, offline transaction queue, staff stats |

### 2.4 Supabase Backend

| Detail               | Value                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Project ID**       | `ncbwpnwfwzhxarloriow`                                                                                                 |
| **Plan**             | Free tier (developer's personal account)                                                                               |
| **Region**           | Needs confirmation (should be `ap-southeast-1` Singapore)                                                              |
| **Postgres Version** | 15                                                                                                                     |
| **Tables**           | 6 (`businesses`, `users`, `employee_pins`, `point_rules`, `transactions`, `qr_tokens`)                                 |
| **Edge Functions**   | 7 (calculate-nevacoins, create-transaction, generate-qr-token, validate-qr-token, login-with-pin, set-pin, verify-pin) |
| **RLS**              | Enabled on all tables with role-based policies                                                                         |
| **Realtime**         | Enabled on `users` and `transactions` tables                                                                           |
| **Migrations**       | 24+ migration files                                                                                                    |
| **Auth Redirects**   | Currently pointing to `localhost` and `admin.nevabells.com`                                                            |

### 2.5 GitHub Repository

| Detail           | Value                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Current Repo** | `github.com/Keni-Dev/Nevabells` (private)                                                      |
| **Owner**        | `Keni-Dev` (developer's personal GitHub)                                                       |
| **CI/CD**        | 3 GitHub Actions workflows (CI, Mobile Build, Admin Deploy)                                    |
| **Secrets Used** | `TURBO_TOKEN`, `TURBO_TEAM`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `EXPO_TOKEN`, `VERCEL_TOKEN` |

---

## 3. What Needs to Transfer / Set Up

| #   | Item                             | Action                                                | Owner            |
| --- | -------------------------------- | ----------------------------------------------------- | ---------------- |
| 1   | Email for `@outofnine.com`       | Client sets up email hosting                          | **Client**       |
| 2   | GitHub Organization              | Create org, transfer/fork repo                        | **Client + Dev** |
| 3   | Supabase Organization            | Create org, create new production project or transfer | **Client + Dev** |
| 4   | Vercel Account                   | Create account, link repo, add domain                 | **Client + Dev** |
| 5   | Expo Organization                | Create org, transfer projects                         | **Client + Dev** |
| 6   | Google Play Developer Account    | Register ($25 one-time)                               | **Client**       |
| 7   | Apple Developer Account          | Register ($99/year) — only if iOS needed              | **Client**       |
| 8   | Domain DNS Configuration         | Point subdomains, add email records                   | **Client + Dev** |
| 9   | Update app bundle IDs            | Change from `com.nevabells.*` to `com.outofnine.*`    | **Dev**          |
| 10  | Update all environment variables | Point to new Supabase project + production URLs       | **Dev**          |
| 11  | Update Supabase Auth redirects   | Add `outofnine.com` URLs, remove old ones             | **Dev**          |

---

## Phase 1: Email & Domain Setup (Day 1)

### Why Email First?

Every account (GitHub, Supabase, Vercel, Expo, Google Play, Apple) requires an email address. Setting up `@outofnine.com` email is the foundation for everything else.

### Option A: Google Workspace (Recommended) — $7.20/month

**Best for:** Professional email, calendar, Google Drive, works everywhere.

1. Go to [workspace.google.com](https://workspace.google.com)
2. Click "Get Started" → Enter business name: **Out Of Nines**
3. Enter domain: `outofnine.com`
4. Choose "Business Starter" plan ($7.20/month per user)
5. Create the primary admin email: **`admin@outofnine.com`**
6. Google will provide DNS records to add to your domain registrar:

| Record Type | Name   | Value                                              | Purpose          |
| ----------- | ------ | -------------------------------------------------- | ---------------- |
| **MX**      | `@`    | `aspmx.l.google.com` (priority 1)                  | Email routing    |
| **MX**      | `@`    | `alt1.aspmx.l.google.com` (priority 5)             | Backup email     |
| **MX**      | `@`    | `alt2.aspmx.l.google.com` (priority 5)             | Backup email     |
| **TXT**     | `@`    | `v=spf1 include:_spf.google.com ~all`              | Anti-spam        |
| **CNAME**   | `mail` | `ghs.googlehosted.com`                             | Webmail access   |
| **TXT**     | `@`    | Google verification string (provided during setup) | Domain ownership |

7. Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these records
8. Wait for DNS propagation (usually 15 minutes – 48 hours, typically ~1 hour)
9. Verify domain in Google Workspace admin console

**Suggested email addresses to create:**
| Email | Purpose |
|-------|---------|
| `admin@outofnine.com` | Primary business account (GitHub, Supabase, Vercel, etc.) |
| `noreply@outofnine.com` | Transactional emails (Supabase Auth, password resets) |
| `support@outofnine.com` | Customer support (app store listings) |
| `anton@outofnine.com` | Personal business email for the owner |

### Option B: Zoho Mail (Free for 1 user) — $0/month

If budget is a concern:

1. Go to [zoho.com/mail](https://www.zoho.com/mail/)
2. Sign up with domain `outofnine.com`
3. Follow DNS verification steps (similar MX records)
4. Free tier: 1 user, 5GB storage

### Option C: Cloudflare Email Routing (Free) + Gmail

If the domain is already on Cloudflare:

1. Go to Cloudflare Dashboard → Email → Email Routing
2. Set up catch-all or specific routes to forward `admin@outofnine.com` → personal Gmail
3. Configure Gmail "Send as" to reply from `admin@outofnine.com`
4. **Free but limited** — no dedicated mailbox, just forwarding

### ⏱️ Time Required

| Task                              | Time                                  |
| --------------------------------- | ------------------------------------- |
| Sign up for email provider        | 10 minutes                            |
| Add DNS records                   | 15 minutes                            |
| DNS propagation                   | 1-48 hours (usually ~1 hour)          |
| Create additional email addresses | 10 minutes                            |
| **Total**                         | **~1-2 hours active work + DNS wait** |

---

## Phase 2: GitHub Organization (Day 1-2)

### 2.1 Create GitHub Organization

1. Log into GitHub with `admin@outofnine.com` (create GitHub account first if needed)
2. Go to [github.com/organizations/plan](https://github.com/organizations/plan)
3. Choose **Free** plan (sufficient — private repos are free)
4. Organization name: `outofnine` (or `OutOfNines`)
5. Contact email: `admin@outofnine.com`
6. Add the developer (`Keni-Dev`) as a member with **Admin** role

### 2.2 Transfer Repository

**Option A — Transfer Ownership** (cleanest):

1. Developer goes to `github.com/Keni-Dev/Nevabells` → Settings → Danger Zone → Transfer ownership
2. Transfer to the `outofnine` organization
3. Rename the repo from `Nevabells` to `outofnine-loyalty` (optional)
4. All commit history, branches, issues, and PRs are preserved
5. GitHub automatically redirects the old URL for a period

**Option B — Fork + Fresh Start**:

1. Fork the repo into the new org
2. Keep the developer's original as a backup
3. Update the fork's remote and continue development there

### 2.3 Update GitHub Actions Secrets

After transfer, go to the new repo → Settings → Secrets and variables → Actions:

| Secret Name         | New Value                                                        | Source             |
| ------------------- | ---------------------------------------------------------------- | ------------------ |
| `TURBO_TOKEN`       | New Turborepo token (or remove if not using Vercel remote cache) | Vercel Dashboard   |
| `TURBO_TEAM`        | New Vercel team name                                             | Vercel Dashboard   |
| `SUPABASE_URL`      | New Supabase project URL                                         | Supabase Dashboard |
| `SUPABASE_ANON_KEY` | New anon key                                                     | Supabase Dashboard |
| `EXPO_TOKEN`        | New Expo access token                                            | Expo Dashboard     |
| `VERCEL_TOKEN`      | New Vercel token                                                 | Vercel Dashboard   |

### 2.4 Fix Known CI/CD Issue

> ⚠️ The `build-mobile.yml` workflow references `working-directory: apps/mobile` but the actual workspace has `apps/customer` and `apps/scanner` as separate directories. This needs to be fixed before running mobile builds through CI.

### ⏱️ Time Required

| Task                        | Time           |
| --------------------------- | -------------- |
| Create GitHub account + org | 15 minutes     |
| Transfer/fork repo          | 10 minutes     |
| Update secrets              | 20 minutes     |
| Fix CI workflows            | 30 minutes     |
| **Total**                   | **~1.5 hours** |

---

## Phase 3: Supabase Project Transfer (Day 2-3)

### Why a New Supabase Project?

The current project (`ncbwpnwfwzhxarloriow`) is on the developer's free tier. Supabase free tier has these limitations:

| Limit                     | Free Tier                        | Pro Plan ($25/month)  |
| ------------------------- | -------------------------------- | --------------------- |
| Database size             | 500 MB                           | 8 GB (then $0.125/GB) |
| Storage                   | 1 GB                             | 100 GB                |
| Edge Function invocations | 500K/month                       | 2M/month              |
| Realtime connections      | 200 concurrent                   | 500 concurrent        |
| Auth users                | 50,000                           | 100,000               |
| Daily backups             | None                             | ✅ 7-day retention    |
| Branching                 | None                             | ✅                    |
| SLA                       | None                             | 99.9% uptime          |
| Pausing                   | Auto-pause after 1 week inactive | Never pauses          |

**Recommendation:** Create a **new Supabase project** under the client's organization on the **Pro plan** ($25/month).

### 3.1 Create Supabase Organization

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign up / log in with `admin@outofnine.com`
3. Create a new organization: **Out Of Nines**
4. Select billing plan: **Pro** ($25/month)
5. Add payment method (credit card)

### 3.2 Create New Production Project

1. In the new org, click "New Project"
2. **Project name:** `outofnine-production`
3. **Database password:** Generate a strong password and save it securely
4. **Region:** `Southeast Asia (Singapore)` — closest to Philippines
5. Wait for project provisioning (~2 minutes)

### 3.3 Migrate Database Schema

The developer will run these commands to migrate:

```bash
# Link to new project
supabase link --project-ref <NEW_PROJECT_REF>

# Push all 24+ migrations to the new project
supabase db push

# Deploy all 7 edge functions
supabase functions deploy calculate-nevacoins
supabase functions deploy create-transaction
supabase functions deploy generate-qr-token
supabase functions deploy validate-qr-token
supabase functions deploy login-with-pin
supabase functions deploy set-pin
supabase functions deploy verify-pin
```

### 3.4 Configure Auth Settings

In the new Supabase project dashboard → Authentication → URL Configuration:

| Setting           | Value                                           |
| ----------------- | ----------------------------------------------- |
| **Site URL**      | `https://admin.outofnine.com`                   |
| **Redirect URLs** | `https://admin.outofnine.com/auth/callback`     |
|                   | `https://admin.outofnine.com`                   |
|                   | `outofnine-customer://auth/callback`            |
|                   | `outofnine-scanner://auth/callback`             |
|                   | `exp://localhost:8081` (dev only, remove later) |

### 3.5 Configure Email Templates

In Supabase Dashboard → Authentication → Email Templates:

| Template           | From                    | Subject                          |
| ------------------ | ----------------------- | -------------------------------- |
| **Confirm Signup** | `noreply@outofnine.com` | Welcome to Out Of Nines!         |
| **Reset Password** | `noreply@outofnine.com` | Reset your Out Of Nines password |
| **Magic Link**     | `noreply@outofnine.com` | Your Out Of Nines login link     |
| **Change Email**   | `noreply@outofnine.com` | Confirm your new email           |

### 3.6 Configure Custom SMTP (Required for Production)

Supabase's built-in email has a **4 emails/hour** rate limit. For production, configure custom SMTP.

**Option A: Use Google Workspace SMTP** (if using Google Workspace):

1. In Google Workspace Admin → Apps → Google Workspace → Gmail → Routing
2. Set up an app password for SMTP
3. In Supabase Dashboard → Project Settings → Auth → SMTP Settings:

| Setting              | Value                   |
| -------------------- | ----------------------- |
| **Sender email**     | `noreply@outofnine.com` |
| **Sender name**      | Out Of Nines            |
| **Host**             | `smtp.gmail.com`        |
| **Port**             | `465`                   |
| **Username**         | `noreply@outofnine.com` |
| **Password**         | App-specific password   |
| **Minimum interval** | `30` seconds            |

**Option B: Resend** (recommended for transactional emails — free up to 3,000/month):

1. Sign up at [resend.com](https://resend.com)
2. Add domain `outofnine.com` and verify DNS
3. Get API key and configure SMTP:

| Setting      | Value               |
| ------------ | ------------------- |
| **Host**     | `smtp.resend.com`   |
| **Port**     | `465`               |
| **Username** | `resend`            |
| **Password** | Your Resend API key |

### 3.7 Seed Production Data

```bash
# Create the initial business record
# Create the owner account
# Set initial point rules
```

The developer will prepare a production seed script specific to "Out Of Nines" business details.

### 3.8 Enable Realtime

In Supabase Dashboard → Database → Replication:

- Enable realtime for `users` table
- Enable realtime for `transactions` table

### ⏱️ Time Required

| Task                             | Time         |
| -------------------------------- | ------------ |
| Create Supabase org + project    | 15 minutes   |
| Migrate schema (24+ migrations)  | 30 minutes   |
| Deploy 7 edge functions          | 20 minutes   |
| Configure auth + email templates | 30 minutes   |
| Set up SMTP                      | 30 minutes   |
| Seed production data             | 15 minutes   |
| Test all edge functions          | 45 minutes   |
| **Total**                        | **~3 hours** |

---

## Phase 4: Vercel Deployment & Domain (Day 3-4)

### 4.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with `admin@outofnine.com` (or sign up with the new GitHub org)
3. Choose **Hobby** plan (free — sufficient for a single project)

> **Note:** If you later need team features, the Pro plan is $20/month per member.

### 4.2 Import Project

1. Click "Add New..." → "Project"
2. Import from the GitHub org's repository
3. **Root Directory:** `apps/admin`
4. **Framework:** Next.js (auto-detected)
5. **Build Command:** Override with `cd ../.. && pnpm turbo build --filter=@nevabells/admin`
6. **Install Command:** Override with `cd ../.. && pnpm install --frozen-lockfile`
7. **Output Directory:** `.next`

### 4.3 Add Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

| Variable                        | Value                                   | Environment                      |
| ------------------------------- | --------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://<NEW_PROJECT_REF>.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | New anon key                            | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY`     | New service role key                    | Production only                  |
| `NEXT_PUBLIC_APP_URL`           | `https://admin.outofnine.com`           | Production                       |
| `NEXT_PUBLIC_APP_ENV`           | `production`                            | Production                       |
| `QR_TOKEN_SECRET`               | Generate a new 32+ char secret          | Production                       |

### 4.4 Configure Custom Domain

1. In Vercel → Project → Settings → Domains
2. Add `admin.outofnine.com`
3. Vercel will provide a CNAME record to add:

| Record Type | Name    | Value                  |
| ----------- | ------- | ---------------------- |
| **CNAME**   | `admin` | `cname.vercel-dns.com` |

4. Add this to your domain registrar's DNS settings
5. SSL certificate is automatically provisioned by Vercel

### 4.5 (Optional) Root Domain Landing Page

If you want `outofnine.com` to show a landing page:

| Option       | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| **Vercel**   | Add a simple landing page project, point `outofnine.com` → Vercel   |
| **Redirect** | Add an A record to redirect `outofnine.com` → `admin.outofnine.com` |
| **Later**    | Build a marketing site later, keep domain parked for now            |

### ⏱️ Time Required

| Task                       | Time                             |
| -------------------------- | -------------------------------- |
| Create Vercel account      | 10 minutes                       |
| Import + configure project | 20 minutes                       |
| Add environment variables  | 15 minutes                       |
| Configure domain + DNS     | 15 minutes                       |
| Wait for DNS propagation   | 1-48 hours                       |
| Verify deployment works    | 30 minutes                       |
| **Total**                  | **~1.5 hours active + DNS wait** |

---

## Phase 5: Expo / EAS — Mobile Apps (Day 4-5)

### 5.1 Create Expo Account & Organization

1. Go to [expo.dev](https://expo.dev)
2. Sign up with `admin@outofnine.com`
3. Go to Settings → Organizations → Create Organization
4. Organization name: `outofnine`
5. Add developer (`keni-dev` or their Expo username) as a member

### 5.2 Code Changes Required (Developer)

Before building under the new org, the developer needs to update:

**Customer App (`apps/customer/app.json`):**

```json
{
  "expo": {
    "name": "Out Of Nines",
    "slug": "outofnine-customer",
    "owner": "outofnine",
    "scheme": "outofnine-customer",
    "ios": {
      "bundleIdentifier": "com.outofnine.customer"
    },
    "android": {
      "package": "com.outofnine.customer"
    }
  }
}
```

**Scanner App (`apps/scanner/app.json`):**

```json
{
  "expo": {
    "name": "Out Of Nines Scanner",
    "slug": "outofnine-scanner",
    "owner": "outofnine",
    "scheme": "outofnine-scanner",
    "ios": {
      "bundleIdentifier": "com.outofnine.scanner"
    },
    "android": {
      "package": "com.outofnine.scanner"
    }
  }
}
```

**Environment variables** in both apps:

```
EXPO_PUBLIC_SUPABASE_URL=https://<NEW_PROJECT_REF>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<new_anon_key>
EXPO_PUBLIC_APP_ENV=production
```

### 5.3 Update EAS Configuration

**Scanner `eas.json`** — update submit section:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "admin@outofnine.com",
        "ascAppId": "<from-app-store-connect>"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

**Create `apps/customer/eas.json`** (currently missing):

```json
{
  "cli": {
    "version": ">= 7.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "env": { "EXPO_PUBLIC_APP_ENV": "development" }
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "env": { "EXPO_PUBLIC_APP_ENV": "preview" },
      "channel": "customer-preview"
    },
    "production": {
      "android": { "buildType": "app-bundle" },
      "env": { "EXPO_PUBLIC_APP_ENV": "production" },
      "channel": "customer-production",
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### 5.4 Build APKs for Testing

```bash
# Build scanner APK (for staff devices)
cd apps/scanner
eas build --platform android --profile preview

# Build customer APK (for testing)
cd apps/customer
eas build --platform android --profile preview
```

### ⏱️ Time Required

| Task                           | Time                             |
| ------------------------------ | -------------------------------- |
| Create Expo account + org      | 15 minutes                       |
| Update app.json files (2 apps) | 30 minutes                       |
| Update/create eas.json files   | 20 minutes                       |
| Update environment variables   | 15 minutes                       |
| Build + test both APKs         | 1-2 hours (EAS build queue time) |
| **Total**                      | **~2-3 hours**                   |

---

## Phase 6: App Store Submissions (Day 5-10)

### 6.1 Google Play Store (Android)

**Prerequisites:**

1. **Google Play Developer Account** — Register at [play.google.com/console](https://play.google.com/console)
   - Cost: **$25 one-time fee**
   - Use `admin@outofnine.com`
   - Identity verification takes **2-7 business days**

2. **Create Google Cloud Service Account** (for EAS Submit):
   1. Go to [Google Cloud Console](https://console.cloud.google.com)
   2. Create project: `outofnine-play-store`
   3. Enable "Google Play Android Developer API"
   4. Create a service account with JSON key
   5. In Google Play Console → Settings → API access → Link this service account
   6. Save the JSON key as `google-service-account.json` in app directories

3. **Prepare Store Listing:**

| Asset               | Specification        | Needed For |
| ------------------- | -------------------- | ---------- |
| App icon            | 512 × 512 PNG        | Both apps  |
| Feature graphic     | 1024 × 500 PNG       | Both apps  |
| Screenshots (phone) | Min 2, 16:9 or 9:16  | Both apps  |
| Short description   | Max 80 characters    | Both apps  |
| Full description    | Max 4000 characters  | Both apps  |
| Privacy policy URL  | Must be a public URL | Both apps  |
| Content rating      | IARC questionnaire   | Both apps  |

**Customer App listing suggestion:**

- **Title:** Out Of Nines — Loyalty Rewards
- **Short desc:** Earn Nevacoins with every coffee purchase!
- **Category:** Food & Drink

**Scanner App listing suggestion:**

- **Title:** Out Of Nines Scanner (Staff)
- **Short desc:** Staff POS for Out Of Nines loyalty program
- **Category:** Business
- **Distribution:** Could be private/internal track (staff only)

4. **Submit for Review:**

   ```bash
   # Build production AAB (Android App Bundle)
   cd apps/customer
   eas build --platform android --profile production
   eas submit --platform android --profile production

   cd apps/scanner
   eas build --platform android --profile production
   eas submit --platform android --profile production
   ```

   Google Play review: **typically 1-3 days** for new apps (can take up to 7 days).

### 6.2 Apple App Store (iOS) — Optional / Later

| Requirement            | Detail                                                                      |
| ---------------------- | --------------------------------------------------------------------------- |
| **Cost**               | $99/year (Apple Developer Program)                                          |
| **Apple ID**           | Use `admin@outofnine.com`                                                   |
| **Device for Testing** | iPhone or iPad (for TestFlight)                                             |
| **DUNS Number**        | Required for organization enrollment (~1-2 weeks to obtain if not existing) |
| **Review Time**        | 1-7 days typically                                                          |

> **Recommendation:** Start with **Android only** (most Philippines users are on Android). Add iOS later when budget allows.

### ⏱️ Time Required

| Task                                  | Time                                      |
| ------------------------------------- | ----------------------------------------- |
| Register Google Play Developer        | 15 min + 2-7 days verification            |
| Create service account                | 30 minutes                                |
| Prepare store assets                  | 2-4 hours                                 |
| Build + submit both apps              | 1-2 hours                                 |
| Google Play review                    | 1-3 days                                  |
| (Optional) Apple Developer enrollment | 15 min + 1-2 weeks                        |
| **Total**                             | **~4-6 hours active + 3-10 days waiting** |

---

## Phase 7: DNS & Final Configuration (Day 4)

### Complete DNS Records

Add ALL these records to the domain registrar for `outofnine.com`:

#### Email (Google Workspace)

| Type | Name | Value                                 | Priority | TTL  |
| ---- | ---- | ------------------------------------- | -------- | ---- |
| MX   | `@`  | `aspmx.l.google.com`                  | 1        | 3600 |
| MX   | `@`  | `alt1.aspmx.l.google.com`             | 5        | 3600 |
| MX   | `@`  | `alt2.aspmx.l.google.com`             | 5        | 3600 |
| MX   | `@`  | `alt3.aspmx.l.google.com`             | 10       | 3600 |
| MX   | `@`  | `alt4.aspmx.l.google.com`             | 10       | 3600 |
| TXT  | `@`  | `v=spf1 include:_spf.google.com ~all` | —        | 3600 |

#### Admin Dashboard (Vercel)

| Type  | Name    | Value                  | TTL  |
| ----- | ------- | ---------------------- | ---- |
| CNAME | `admin` | `cname.vercel-dns.com` | 3600 |

#### (Optional) DKIM for email deliverability

Google Workspace will provide DKIM records during setup. Add them for better email deliverability.

#### (Optional) DMARC

| Type | Name     | Value                                                    | TTL  |
| ---- | -------- | -------------------------------------------------------- | ---- |
| TXT  | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:admin@outofnine.com` | 3600 |

#### (Optional) Resend — if using for transactional email

Resend will provide their own DNS verification records (CNAME + TXT).

### ⏱️ Time Required

| Task                | Time                              |
| ------------------- | --------------------------------- |
| Add all DNS records | 20 minutes                        |
| DNS propagation     | 1-48 hours                        |
| Verify all records  | 15 minutes                        |
| **Total**           | **~35 minutes active + DNS wait** |

---

## Phase 8: Verification & Go-Live (Day 10-12)

### Checklist Before Go-Live

#### Admin Dashboard

- [ ] `admin.outofnine.com` loads correctly with HTTPS
- [ ] Can log in with owner email/password
- [ ] Dashboard shows data from new Supabase project
- [ ] Can create/edit/deactivate staff members
- [ ] Can view customer list and details
- [ ] Can adjust customer balances
- [ ] Transaction history loads with filters
- [ ] CSV export works
- [ ] Point rules can be configured and saved
- [ ] Business settings can be updated
- [ ] Role-based access works (non-admin gets redirected)

#### Customer App

- [ ] Can sign up with email/password
- [ ] Can log in
- [ ] QR code generates and displays
- [ ] Balance shows correctly
- [ ] Real-time balance updates when coins earned (test with scanner)
- [ ] Transaction history displays
- [ ] Profile can be edited
- [ ] App doesn't crash on poor network

#### Scanner App

- [ ] Initial device login works (email/password)
- [ ] PIN login works for staff shifts
- [ ] Camera opens and scans QR codes
- [ ] NevaCoin preview calculation is correct
- [ ] Transaction creation works
- [ ] Success screen shows with correct amounts
- [ ] Offline mode works (queue transactions, sync when online)
- [ ] Transaction history shows today's transactions
- [ ] PIN lockout works after 5 failed attempts

#### Backend

- [ ] All 7 edge functions respond correctly
- [ ] RLS policies work (customers can't see other customers' data)
- [ ] Realtime subscriptions work
- [ ] Email sending works (password reset, etc.)
- [ ] Database backups are configured (Pro plan)

### End-to-End Test Flow

1. **Owner** logs into `admin.outofnine.com` → creates a staff member with PIN
2. **Staff** opens Scanner app → logs in with email → enters PIN
3. **Customer** opens Customer app → signs up → sees QR code
4. **Staff** scans customer's QR → enters purchase amount → confirms transaction
5. **Customer** sees real-time balance update with celebration animation
6. **Owner** sees the transaction in admin dashboard

---

## Realistic Timeline Summary

| Phase       | Tasks                 | Active Work | Waiting Time      | Calendar Days |
| ----------- | --------------------- | ----------- | ----------------- | ------------- |
| **Phase 1** | Email & Domain Setup  | 1-2 hours   | DNS: 1-48 hrs     | **Day 1**     |
| **Phase 2** | GitHub Organization   | 1.5 hours   | —                 | **Day 1-2**   |
| **Phase 3** | Supabase Transfer     | 3 hours     | —                 | **Day 2-3**   |
| **Phase 4** | Vercel Deployment     | 1.5 hours   | DNS: 1-48 hrs     | **Day 3-4**   |
| **Phase 5** | Expo / EAS Setup      | 2-3 hours   | Builds: 1-2 hrs   | **Day 4-5**   |
| **Phase 6** | App Store Submissions | 4-6 hours   | Review: 3-10 days | **Day 5-10**  |
| **Phase 7** | DNS Configuration     | 35 minutes  | DNS: 1-48 hrs     | **Day 4**     |
| **Phase 8** | Testing & Go-Live     | 3-4 hours   | —                 | **Day 10-12** |

### Total Estimated Timeline

| Metric                                                           | Estimate                                      |
| ---------------------------------------------------------------- | --------------------------------------------- |
| **Total active developer work**                                  | ~16-22 hours                                  |
| **Total active client work**                                     | ~3-5 hours (accounts, payments, store assets) |
| **Fastest possible** (everything goes smoothly)                  | **7-8 days**                                  |
| **Realistic estimate** (some delays)                             | **10-14 days**                                |
| **Worst case** (DNS issues, review rejections, Apple enrollment) | **3-4 weeks**                                 |

### Key Bottlenecks (Out of Our Control)

| Bottleneck                         | Typical Wait         | Worst Case             |
| ---------------------------------- | -------------------- | ---------------------- |
| DNS propagation                    | 1 hour               | 48 hours               |
| Google Play Developer verification | 2 days               | 7 days                 |
| Google Play app review             | 1-3 days             | 7 days                 |
| Apple Developer enrollment         | Instant (individual) | 2 weeks (organization) |
| Apple app review                   | 1-2 days             | 7 days                 |

---

## Cost Breakdown (Monthly Ongoing)

### Required Services

| Service              | Plan                         | Monthly Cost      | Annual Cost    |
| -------------------- | ---------------------------- | ----------------- | -------------- |
| **Supabase**         | Pro                          | $25/month         | $300/year      |
| **Google Workspace** | Business Starter (1 user)    | $7.20/month       | $86.40/year    |
| **Vercel**           | Hobby (free)                 | $0                | $0             |
| **Expo/EAS**         | Free (up to 30 builds/month) | $0                | $0             |
| **Domain**           | Renewal                      | ~$1/month         | ~$12/year      |
| **Google Play**      | Developer fee                | —                 | $25 one-time   |
| **Total (no iOS)**   |                              | **~$33.20/month** | **~$423/year** |

### Optional / Future Services

| Service                          | Plan                 | Monthly Cost | When Needed                    |
| -------------------------------- | -------------------- | ------------ | ------------------------------ |
| **Apple Developer**              | Annual               | $8.25/month  | If adding iOS ($99/year)       |
| **Resend** (transactional email) | Free tier (3K/month) | $0           | If email volume grows          |
| **Sentry** (error monitoring)    | Free tier            | $0           | Recommended for production     |
| **Vercel Pro** (team features)   | $20/member/month     | $20+         | If adding team members         |
| **Supabase** compute add-on      | Varies               | $5-25        | If needing more DB performance |

### First Month Total (One-Time + Monthly)

| Item                           | Cost              |
| ------------------------------ | ----------------- |
| Google Play Developer fee      | $25               |
| Google Workspace (first month) | $7.20             |
| Supabase Pro (first month)     | $25               |
| Domain (if renewing)           | ~$12              |
| **First month total**          | **~$69.20**       |
| **Subsequent months**          | **~$33.20/month** |

---

## Client Action Items Checklist

These are things **only the client (Antone)** can do:

### Immediate (Before Developer Can Proceed)

- [ ] **Confirm domain registrar** — Where is `outofnine.com` registered? (GoDaddy, Namecheap, Cloudflare, etc.)
- [ ] **Share domain registrar login** — Or add developer as collaborator for DNS changes
- [ ] **Set up email** — Follow Phase 1 instructions to create `admin@outofnine.com`
- [ ] **Create GitHub account** — Sign up at github.com with `admin@outofnine.com`
- [ ] **Payment method ready** — Credit card for Supabase ($25/month) and Google Workspace ($7.20/month)

### Before App Store Submission

- [ ] **Register Google Play Developer account** — $25, requires government ID
- [ ] **Provide store listing assets:**
  - [ ] App icon (512×512 PNG, or provide and developer will format)
  - [ ] At least 2 screenshots per app (or developer can take from demo)
  - [ ] Short description for each app
  - [ ] Full description for each app
  - [ ] Privacy policy URL (developer can generate a template)
- [ ] **Decide on Apple iOS** — Do you want to invest $99/year for App Store? Or Android-only for now?

### Optional

- [ ] **Business logo** — High-res vector (SVG or PNG) for app icons and admin dashboard
- [ ] **Brand guidelines** — If any beyond what's already implemented (orange #ff661a, neo-brutalist style)
- [ ] **Contact phone** — For app store listings and customer support

---

## Credentials & Secrets Inventory

> ⚠️ **IMPORTANT:** All of the following will be NEW values generated for the client's accounts. The developer's personal keys will be revoked after migration.

### Supabase (New Production Project)

| Secret                      | Used By                                            | Exposure                                 |
| --------------------------- | -------------------------------------------------- | ---------------------------------------- |
| `SUPABASE_URL`              | All 3 apps                                         | Public (safe)                            |
| `SUPABASE_ANON_KEY`         | All 3 apps                                         | Public (safe, protected by RLS)          |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin dashboard (server-side only), Edge Functions | **SECRET — never expose to client-side** |
| `DATABASE_URL`              | Migrations only                                    | **SECRET**                               |

### Vercel

| Secret         | Used By                   |
| -------------- | ------------------------- |
| `VERCEL_TOKEN` | GitHub Actions deployment |

### Expo / EAS

| Secret       | Used By                      |
| ------------ | ---------------------------- |
| `EXPO_TOKEN` | GitHub Actions mobile builds |

### App-Specific

| Secret                 | Used By          | Notes                                                  |
| ---------------------- | ---------------- | ------------------------------------------------------ |
| `QR_TOKEN_SECRET`      | Admin server     | 32+ char, for QR HMAC signing. Must match across apps. |
| `GOOGLE_CLIENT_ID`     | OAuth (optional) | From Google Cloud Console                              |
| `GOOGLE_CLIENT_SECRET` | OAuth (optional) | From Google Cloud Console                              |

### Accounts Created

| Account                | Email                 | Password    |
| ---------------------- | --------------------- | ----------- |
| GitHub (org owner)     | `admin@outofnine.com` | Client sets |
| Supabase (org owner)   | `admin@outofnine.com` | Client sets |
| Vercel                 | `admin@outofnine.com` | Client sets |
| Expo                   | `admin@outofnine.com` | Client sets |
| Google Play Console    | `admin@outofnine.com` | Client sets |
| Google Workspace Admin | `admin@outofnine.com` | Client sets |

---

## Risk & Contingency Notes

### 1. Bundle ID / Package Name Change

Changing from `com.nevabells.*` to `com.outofnine.*` means these are technically **new apps** on the app stores. This is fine since the apps haven't been published yet. But it means:

- No migration path is needed (fresh submission)
- Deep links and custom URL schemes will change (`outofnine-customer://` instead of `nevabells-customer://`)

### 2. Supabase Free Tier Auto-Pause

The current free-tier Supabase project **will auto-pause** after 1 week of inactivity. The new Pro-tier project will not have this issue. **Migration should be done promptly** after the new project is created.

### 3. Auth Token Compatibility

All active user sessions will be invalidated when switching Supabase projects (different JWT secrets). This is fine for a fresh production launch, but:

- Any test users will need to re-register
- Staff PINs will need to be re-created

### 4. Edge Function Cold Starts

Supabase Edge Functions on the free tier have cold start times (~500ms-2s). The Pro plan has better performance. Monitor the scanner app's QR validation and transaction creation speed.

### 5. Single Point of Failure

The `admin@outofnine.com` email is the master key to everything. **Strongly recommend:**

- Enable 2FA on all accounts
- Set up a recovery email (client's personal email)
- Document all account credentials in a password manager (1Password, Bitwarden)

### 6. Developer Access Post-Handoff

After migration, the developer should retain collaborator/member access (not owner) to:

- GitHub org (for bug fixes)
- Supabase project (for database migrations)
- Vercel project (for deployments)
- Expo org (for mobile builds)

This can be revoked at any time by the client.

### 7. Naming Note

The codebase internally uses `nevabells` as the package namespace (`@nevabells/admin`, `@nevabells/shared`, etc.). This is **internal only** — users never see these package names. Renaming the internal namespace is optional and not worth the effort unless the client specifically wants it. The user-facing brand "Out Of Nines" is already correctly applied everywhere visible.

---

## Appendix: Architecture Overview

```
                        outofnine.com (DNS)
                              │
                 ┌────────────┼────────────┐
                 │            │            │
          admin.outofnine.com │    (future: outofnine.com
          (Vercel / Next.js)  │     marketing site)
                 │            │
                 │     ┌──────┴──────┐
                 │     │  Supabase   │
                 │     │  (Pro Plan) │
                 │     │             │
                 │     │ • PostgreSQL│
                 │     │ • Auth      │
                 │     │ • Realtime  │
                 │     │ • 7 Edge Fn │
                 │     │ • Storage   │
                 │     └──────┬──────┘
                 │            │
          ┌──────┴──────┬─────┴──────┐
          │             │            │
   Admin Dashboard  Customer App  Scanner App
   (Next.js 14)    (Expo/RN)     (Expo/RN)
   • Staff CRUD    • QR Display   • QR Scan
   • Analytics     • Balance      • PIN Auth
   • Settings      • History      • Transactions
   • Customers     • Rewards      • Offline Queue
   • Transactions  • Profile      • Stats
```

---

_This document should be updated as each phase is completed. Check off items in the Client Action Items Checklist as they are done._
