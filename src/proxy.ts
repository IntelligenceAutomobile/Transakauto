import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_LOCKED, ACCESS_USER, ACCESS_PASSWORD } from "@/lib/site-lock";

// Mur de connexion : quand SITE_LOCKED est vrai, le site entier exige
// une authentification (login + mot de passe) avant d'être visible.
export function proxy(request: NextRequest) {
  if (!SITE_LOCKED) return NextResponse.next();

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === ACCESS_USER && pass === ACCESS_PASSWORD) {
        return NextResponse.next();
      }
    } catch {
      // en-tête malformé -> on retombe sur la demande d'authentification
    }
  }

  return new NextResponse("Acces restreint - authentification requise.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="TransakAuto - acces restreint"',
    },
  });
}

// S'applique à tout le site sauf les fichiers internes de Next.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
