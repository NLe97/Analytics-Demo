import { notFound } from 'next/navigation';
import { BlockRenderer } from '../components/Renderer/BlockRenderer';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { getPageBySlug } from '../lib/contentful-page';
import { getNavigation } from '../lib/contentful-navigation';

const HOME_PAGE_SLUG = '/';

const Home = async () => {
  const navigationPromise = getNavigation();
  const page = await getPageBySlug(HOME_PAGE_SLUG);

  if (!page) {
    notFound();
  }

  const [navigation] = await Promise.all([navigationPromise]);

  if (!page) {
    return (
      <div id="my-app">
        <Navigation fields={navigation?.fields} />
        <main>
          <p>No sections available for this page.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div id="my-app">
      <Navigation fields={navigation?.fields} />
      <main>
        {page.fields.sections?.length ? (
          <BlockRenderer block={page.fields.sections} />
        ) : (
          <p>No sections available for this page.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
