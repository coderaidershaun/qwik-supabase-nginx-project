import { component$, useSignal, useClientEffect$ } from "@builder.io/qwik";
import { useEndpoint, useNavigate } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { getUserProfile } from "~/utils/helpers";

interface SessionData {
  isSession: boolean;
  user: any;
  role: string;
}

// Server Side Get Session
export const onGet: RequestHandler<SessionData> = async ({
  response,
  cookie,
}) => {
  const profile = await getUserProfile(cookie);

  if (profile?.role !== "free") {
    throw response.redirect("/login", 300);
  }

  // Return profile
  return profile;
};

// Client Side Component
export default component$(() => {
  const sessionData = useEndpoint<SessionData>();
  const isShow = useSignal(false);
  const nav = useNavigate();

  useClientEffect$(async () => {
    const session = await sessionData?.value;
    if (!session?.isSession) {
      nav.path = "/login";
    } else {
      isShow.value = true;
    }
  });

  return (
    <main>
      {isShow.value && (
        <div class="text-gray-900">
          <div class="text-2xl">Welcome to the Dashboard Page</div>
          <Link href="/">
            <button class="text-sm text-sky-500 hover:text-sky-400">
              Home page
            </button>
          </Link>
        </div>
      )}
    </main>
  );
});

export const head: DocumentHead = {
  title: "Dashboard",
  meta: [
    {
      name: "description",
      content: "Members dashboard for Code Raiders",
    },
  ],
};
