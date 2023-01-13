import { component$, Slot } from '@builder.io/qwik';
import { Navigation } from '~/components/site/navigation/navigation';
import { Footer } from '~/components/site/footer/footer';

export default component$(() => {
  return (
    <>
      <main>
        <Navigation />
        <section>
          <Slot />
        </section>
        <Footer />
      </main>
    </>
  );
});
