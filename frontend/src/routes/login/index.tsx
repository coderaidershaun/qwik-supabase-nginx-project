import { component$, useStore, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { validateEmail } from "~/utils/helpers";
import { supabase } from "~/utils/supabase";
import { Message } from "~/components/ui/message";

export const REDIRECT_URL = "http://localhost:80/login/staging"

export default component$(() => {
  const message: any = useStore({ message: undefined, status: "error" });
  const isLoading = useSignal(false);
  // const loc = useLocation();

  // Handle GitHub Login
  const handleGitHubLogin = $(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: REDIRECT_URL,
      },
    });
    console.log(data);
    console.log("Error: ", error);
  });

  // Handle email signup
  const handleEmailLogin = $(async (event: any) => {
    // Initialize resets
    message.message = undefined;
    message.status = "error";
    isLoading.value = true;

    // Value extraction
    const email = event.target.email.value;
    const isEmailValid = validateEmail(email);

    // Email validation
    if (!isEmailValid) {
      message.message = "You must have a valid email";
      isLoading.value = false;
      return;
    }

    // Create user in supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: REDIRECT_URL,
      },
    });

    // Confirm login
    if (data && !error) {
      message.message = "Success. Please check your email/spam folder";
      message.status = "success";
      isLoading.value = false;
      return;
    } else {
      message.message =
        "There was a problem creating a user. " + error?.message;
      isLoading.value = false;
      return;
    }
  });

  return (
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <img class="w-24 h-24 mx-auto" src={"/img/icon.png"} />
        </Link>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Log in
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            href="/signup"
            class="font-medium text-sky-600 hover:text-sky-500"
          >
            create an account
          </Link>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-sm sm:px-10">
          <div class="">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span class="sr-only">Log in with Google</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="h-5 w-5"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
                  </svg>
                </a>
              </div>

              <div>
                <button
                  onClick$={handleGitHubLogin}
                  class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span class="sr-only">Log in with GitHub</span>
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="relative py-5">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-2 text-gray-500">
                  Or log in with email
                </span>
              </div>
            </div>
          </div>
          <form
            preventdefault:submit
            onSubmit$={handleEmailLogin}
            class="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  class="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            {/* <div>
              <label class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div> */}

            <div class="flex items-center justify-between">
              <div class="text-sm">
                <Link
                  href="/contact"
                  class="font-medium text-sky-600 hover:text-sky-500"
                >
                  Problems signing in?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="transition-all duration-300 flex w-full justify-center rounded-sm border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-500 disabled:hover:bg-gray-500 focus:ring-offset-2"
              >
                Log in
              </button>
              <p class="text-xs text-center text-gray-500 mt-1">
                No password required. Authorize via email.
              </p>
            </div>
          </form>
          <Message message={message} classText="mt-3" />
        </div>
      </div>
    </div>
  );
});
