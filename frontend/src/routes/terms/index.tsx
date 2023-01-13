import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Terms</div>
});

export const head: DocumentHead = {
  title: "Terms",
  meta: [
    {
      name: "description",
      content:
        "Terms of use",
    },
  ],
};
