import {
  component$,
  useStyles$,
  useClientEffect$,
  useStore,
  useContextProvider,
  createContext
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { supabase } from "./utils/supabase";

import globalStyles from "./global.css?inline";

export const UserSessionContext = createContext("user-session")

export default component$(() => {
  const userSession: any = useStore({ userId: "", isLoggedIn: false })

  useStyles$(globalStyles);

  useClientEffect$(async () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log(event);

        if (event === "SIGNED_IN") {
          // Send cookies to server !!!!!!!!
          
          // Set Auth State Context
          userSession.userId = session?.user?.id;
          userSession.isLoggedIn = true;
        }

        if (event === "SIGNED_OUT") {
          // Sign out user

          // Set Auth State Context
          userSession.userId = "";
          userSession.isLoggedIn = false;
        }
      }
    );

    // Cleanup event listener
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  });

  // Pass state to children via context
  useContextProvider(UserSessionContext, userSession)
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
