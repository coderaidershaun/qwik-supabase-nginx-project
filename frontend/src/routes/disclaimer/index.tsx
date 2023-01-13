import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Disclaimer</div>
});

export const head: DocumentHead = {
  title: "Disclaimer",
  meta: [
    {
      name: "description",
      content:
        "Disclaimer",
    },
  ],
};
