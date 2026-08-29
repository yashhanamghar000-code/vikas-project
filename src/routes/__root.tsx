import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vikas Engineering Works — Precision Bushes, Pins & Engineering Components, Pune" },
      { name: "description", content: "Manufacturer of precision bushes, guide pins, dowel pins, metal bolts, piston rods & custom machined components in Pune since 1989." },
      { name: "author", content: "Vikas Engineering Works" },
      { name: "keywords", content: "bush manufacturer Pune, guide pin manufacturer Pune, brass bush manufacturer Maharashtra, industrial bush supplier India, precision engineering components Pune, mechanical component manufacturer Pune" },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "Vikas Engineering Works — Precision Bushes, Pins & Engineering Components, Pune" },
      { property: "og:description", content: "Manufacturer of precision bushes, guide pins, dowel pins, metal bolts, piston rods & custom machined components in Pune since 1989." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vikas Engineering Works" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vikas Engineering Works — Precision Bushes, Pins & Engineering Components, Pune" },
      { name: "twitter:description", content: "Manufacturer of precision bushes, guide pins, dowel pins, metal bolts, piston rods & custom machined components in Pune since 1989." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ef332a3b-71b5-4e86-84a6-1a3772872505/id-preview-d1676710--a403b8c4-7c28-4953-b42d-2c63634a1fa3.lovable.app-1781358552648.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ef332a3b-71b5-4e86-84a6-1a3772872505/id-preview-d1676710--a403b8c4-7c28-4953-b42d-2c63634a1fa3.lovable.app-1781358552648.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&family=Montserrat:wght@400;600;700;800;900&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Manufacturer",
          name: "Vikas Engineering Works",
          founder: "Shivaji Tidake",
          foundingDate: "1989",
          description: "Manufacturer of precision bushes, guide pins, dowel pins, metal bolts, piston rods and custom engineering components.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Near Savali Dhaba, Sinhagad Road, Nanded Phata",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            postalCode: "411068",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light')}}catch(e){}`,
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
