import {
  component$,
  useStyles$,
  useClientEffect$,
  useStore,
  useContextProvider,
  createContext,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { supabase } from "./utils/supabase";
import axios from "axios";

import globalStyles from "./global.css?inline";

export const UserSessionContext = createContext("user-session");

export default component$(() => {
  const userSession: any = useStore({ userId: "", isLoggedIn: false });

  useStyles$(globalStyles);

  useClientEffect$(async () => {
    const { data } = await supabase.auth.getUser();
    if (data && data?.user?.id) {
      console.log(data)
      // Set Auth State Context
      userSession.userId = data.user.id;
      userSession.isLoggedIn = true;
    } else {
      // Set Auth State Context
      userSession.userId = "";
      userSession.isLoggedIn = false;
    }
  });

  useClientEffect$(async () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log(event);

        if (
          event === "SIGNED_IN" &&
          session?.access_token &&
          session?.refresh_token
        ) {
          // Send cookies to server
          const body = {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
          };

          // Send request to server
          await axios
            .post("/api_v1/store-auth", body, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data);

              // Set Auth State Context
              userSession.userId = session?.user?.id;
              userSession.isLoggedIn = true;
            })
            .catch((err) => {
              console.log(err);
            });
        }

        if (event === "SIGNED_OUT") {
          // Sign out user on server
          await axios
            .get("/api_v1/logout")
            .then((res) => {
              console.log(res.data);

              // Set Auth State Context
              userSession.userId = "";
              userSession.isLoggedIn = false;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    );

    // Cleanup event listener
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  });

  // Pass state to children via context
  useContextProvider(UserSessionContext, userSession);
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
