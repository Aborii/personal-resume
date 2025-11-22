# Abdullah Almofleh - Personal Resume

This is a personal resume website built with [Next.js](https://nextjs.org) and configured for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run pages:build` - Build for Cloudflare Pages
- `npm run preview` - Preview the Cloudflare Pages build locally
- `npm run deploy` - Deploy to Cloudflare Pages

## 🌐 Deployment on Cloudflare Pages

This project is configured for deployment on Cloudflare Pages. You can deploy it in two ways:

### Option 1: Automatic Deployment via GitHub Actions

1. Fork this repository to your GitHub account
2. Go to your Cloudflare Dashboard and get your API token and Account ID
3. In your GitHub repository, go to Settings → Secrets and variables → Actions
4. Add these secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID
5. Push to the `main` branch to trigger automatic deployment

### Option 2: Manual Deployment

1. Install dependencies: `npm install`
2. Build the project: `npm run pages:build`
3. Install Wrangler CLI: `npm install -g wrangler`
4. Login to Cloudflare: `wrangler login`
5. Deploy: `wrangler pages deploy .vercel/output/static --project-name=personal-resume`

### Option 3: Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Set the build command to: `npm run pages:build`
4. Set the build output directory to: `.vercel/output/static`
5. Deploy!

## 🛠️ Technology Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/             # Static assets
├── .github/workflows/  # GitHub Actions
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies
├── wrangler.toml       # Cloudflare configuration
└── README.md           # This file
```

## 📧 Contact

- **Email**: abdullah@abdullah-almofleh.com
- **Email**: almofleh.abdullah@gmail.com
- **LinkedIn**: [abdullah-almofleh](https://www.linkedin.com/in/abdullah-almofleh/)

---

⚡ Powered by Next.js and Cloudflare Pages
