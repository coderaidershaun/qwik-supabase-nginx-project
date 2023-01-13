import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Privacy</div>
});

export const head: DocumentHead = {
  title: "Privacy Policy",
  meta: [
    {
      name: "description",
      content:
        "Privacy Policy",
    },
  ],
};
