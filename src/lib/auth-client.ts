import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { usernameClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  fetchOptions: {
    onRequest(context) {
      const requestUrl = new URL(context.url, "http://localhost");
      if (!requestUrl.pathname.endsWith("/sign-out")) {
        return;
      }

      const body: unknown =
        typeof context.body === "string" && context.body
          ? JSON.parse(context.body)
          : context.body;

      return {
        ...context,
        body: JSON.stringify({
          ...(typeof body === "object" && body !== null && !Array.isArray(body)
            ? body
            : {}),
          callbackURL: "/sign-in",
        }),
      };
    },
    onSuccess({ data, request }) {
      const requestUrl = new URL(request.url, "http://localhost");
      if (!requestUrl.pathname.endsWith("/sign-out")) {
        return;
      }

      if (data?.url && data.redirect) {
        return;
      }

      if (typeof window !== "undefined") {
        window.location.replace("/sign-in");
      }
    },
  },
  plugins: [
    usernameClient(),
    inferAdditionalFields({
      user: {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
      },
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
