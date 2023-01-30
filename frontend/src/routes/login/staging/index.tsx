import {
  component$,
  useClientEffect$,
  useSignal,
  useContext,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { supabase } from "~/utils/supabase";
import { UserSessionContext } from "~/root";
import axios from "axios";

export default component$(() => {
  const userSession: any = useContext(UserSessionContext);
  const isProtectedOk = useSignal(false);
  const nav = useNavigate();

  useClientEffect$(async () => {
    const timeout = setTimeout(async () => {
      const { data, error } = await supabase.auth.getUser();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
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

      if (data?.user?.id && !error) {
        isProtectedOk.value = true;
        userSession.userId = data?.user?.id;
        userSession.isLoggedIn = true;
        nav.path = "/members/dashboard";
      } else {
        console.error(error);
        userSession.userId = "";
        userSession.isLoggedIn = false;
        nav.path = "/login";
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <div>
        {isProtectedOk && (
          <>
            <span>Redirecting to </span>
            <Link href="/members/dashboard">
              <button class="text-sky-500 hover:text-sky-600">Dashboard</button>
            </Link>
          </>
        )}
        {!isProtectedOk && <>Please log in</>}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Staging",
  meta: [
    {
      name: "description",
      content: "Authorization check for Code Raiders",
    },
  ],
};
