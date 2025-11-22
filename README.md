# Abdullah Almofleh - Personal Resume

This is a personal resume website built with [Next.js](https://nextjs.org) and configured for deployment on [Cloudflare Workers](https://workers.cloudflare.com/) using [OpenNext.js](https://opennext.js.org/cloudflare/get-started).

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
- `npm run build` - Build the Next.js application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run preview` - Build and preview locally in Workers runtime
- `npm run deploy` - Build and deploy to Cloudflare Workers
- `npm run upload` - Build and upload new version to Cloudflare Workers
- `npm run cf-typegen` - Generate Cloudflare types

## 🌐 Deployment on Cloudflare Workers

This project uses [OpenNext.js](https://opennext.js.org/cloudflare/get-started) for deployment on Cloudflare Workers. You can deploy it in several ways:

### Option 1: Automatic Deployment via GitHub Actions

1. Fork this repository to your GitHub account
2. Go to your Cloudflare Dashboard and get your API token
3. In your GitHub repository, go to Settings → Secrets and variables → Actions
4. Add this secret:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
5. Push to the `main` branch to trigger automatic deployment

### Option 2: Manual Deployment via CLI

1. Install dependencies: `npm install`
2. Login to Cloudflare: `npx wrangler login`
3. Deploy: `npm run deploy`

### Option 3: Preview Locally

Test your app in the Workers runtime locally:

```bash
npm run preview
```

## 🛠️ Technology Stack

- **Framework**: Next.js 16
- **Runtime**: Cloudflare Workers
- **Adapter**: OpenNext.js for Cloudflare
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
│   └── _headers          # Cloudflare static asset caching
├── .github/workflows/     # GitHub Actions
├── next.config.ts         # Next.js configuration
├── open-next.config.ts    # OpenNext.js configuration
├── wrangler.toml         # Cloudflare Worker configuration
├── .dev.vars             # Development environment variables
├── package.json          # Dependencies
└── README.md             # This file
```

## 🔧 Configuration Files

- **`wrangler.toml`**: Cloudflare Worker configuration with Node.js compatibility
- **`open-next.config.ts`**: OpenNext.js configuration for caching and optimization
- **`.dev.vars`**: Local development environment variables
- **`public/_headers`**: Static asset caching headers for optimal performance

## 📧 Contact

- **Email**: abdullah@abdullah-almofleh.com
- **Email**: almofleh.abdullah@gmail.com
- **LinkedIn**: [abdullah-almofleh](https://www.linkedin.com/in/abdullah-almofleh/)

---

⚡ Powered by Next.js and Cloudflare Workers via OpenNext.js
