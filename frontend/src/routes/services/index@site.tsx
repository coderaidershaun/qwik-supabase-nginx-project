import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <h1 class="h-screen">
      Services Page
    </h1>
  );
});

export const head: DocumentHead = {
  title: 'Services',
  meta: [
    {
      name: 'description',
      content: 'Code downloads, consulting, apps and more',
    },
  ],
};