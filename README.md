# DesignMyCover

DesignMyCover is a Next.js ecommerce experience for creating custom phone
covers. Customers can upload an image, preview it on a phone case, position
and resize it, choose a case color and select an iPhone model.

## Features

- Responsive landing page for the custom phone-cover product
- Kinde authentication with sign-up, sign-in and sign-out flows
- Image-upload workflow with drag-and-drop support
- PNG and JPG/JPEG validation with upload progress and error toasts
- UploadThing image storage with a 4 MB, single-image upload limit
- Sharp-based image metadata extraction for uploaded image dimensions
- Interactive phone-case designer with:
  - Draggable and resizable image placement
  - Locked image aspect ratio
  - Case color selection (black, blue and rose)
  - iPhone model selection from iPhone X through iPhone 17
- Prisma 8 contract-first PostgreSQL data layer
- Persisted `User` and `Configuration` records
- ShadCN-style UI primitives and Tailwind CSS styling
- Headless UI radio controls and accessible dropdown interactions
- Lucide React icons throughout the interface
- Framer Motion dependency for UI animation support
- Next.js image optimization with UploadThing remote-image support

## Tech Stack

- **Framework:** Next.js 16, React 19 and TypeScript
- **Styling:** Tailwind CSS 4, `tw-animate-css` and ShadCN UI patterns
- **UI:** Headless UI, Base UI, Lucide React, class-variance-authority and `cn`
- **Authentication:** Kinde Auth for Next.js
- **Uploads:** UploadThing, React Dropzone and Sharp
- **Database:** PostgreSQL with Prisma 8 (`@prisma/orm-postgres`)
- **Interaction:** React RND for drag/resize behavior
- **Validation:** Zod
- **Package manager:** pnpm

## Project Structure

```text
src/
├── app/
│   ├── api/auth/              # Kinde auth route
│   ├── api/uploadthing/       # UploadThing route and file router
│   ├── configure/upload/      # Image upload step
│   ├── configure/design/      # Phone-cover designer
│   └── page.tsx               # Product landing page
├── components/                # Shared layout, marketing and UI components
├── lib/                       # UploadThing helpers and utilities
├── prisma/                    # Prisma 8 contract, emitted types and runtime
└── validators/                # Product option definitions
migrations/                    # Prisma 8 contract snapshots and migrations
public/                        # Product, testimonial and user images
```

## Prerequisites

- Node.js 20 or newer
- pnpm 11 or newer
- A PostgreSQL database
- A Kinde application for authentication
- An UploadThing application for image storage

## Setup

1. Clone the repository and enter the project directory:

	```bash
	git clone <repository-url>
	cd next-ecom-shop
	```

2. Install dependencies:

	```bash
	pnpm install
	```

3. Create a `.env` file in the project root and configure the required
	services:

	```env
	DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
	UPLOADTHING_TOKEN="your-uploadthing-token"
	ADMIN_EMAIL="admin@example.com"
	KINDE_CLIENT_ID="your-kinde-client-id"
	KINDE_CLIENT_SECRET="your-kinde-client-secret"
	KINDE_ISSUER_URL="https://your-kinde-domain.kinde.com"
	KINDE_SITE_URL="http://localhost:3000"
	KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000"
	KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
	```

	Register the local callback and logout URLs in Kinde as well. The Kinde
	Next.js SDK reads these values from `.env`.

4. Emit the Prisma 8 contract artifacts after changing the contract or when
	setting up a fresh checkout:

	```bash
	pnpm contract:emit
	```

5. Initialize the PostgreSQL database from the contract. For a new database,
	use the Prisma 8 database initialization command:

	```bash
	pnpm prisma db init
	```

6. Start the development server:

	```bash
	pnpm dev
	```

	Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production application |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm contract:emit` | Emit Prisma 8 contract JSON and TypeScript artifacts |

## Data Model

The Prisma contract currently contains:

- `User`: email, username, name and timestamps
- `Configuration`: original image URL, optional cropped image URL, image
  dimensions and timestamps

The upload callback creates a `Configuration` record and stores the uploaded
image dimensions. The design route loads that configuration by ID before
rendering the editor.

## License & Usage

This project is open-source and available under the **MIT License**. Feel free to clone it, fork it, and use the code for your own projects!

See [LICENSE](LICENSE) for the complete license text.
