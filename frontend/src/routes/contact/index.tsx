import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Contact</div>
});

export const head: DocumentHead = {
  title: "Contact us",
  meta: [
    {
      name: "description",
      content:
        "Contact admin team at Code Raiders",
    },
  ],
};
