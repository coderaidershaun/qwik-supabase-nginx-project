import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <h1 class="h-screen">
      About Page
    </h1>
  );
});

export const head: DocumentHead = {
  title: 'About',
  meta: [
    {
      name: 'description',
      content: 'Learn all about the Code Raiders initialive',
    },
  ],
};