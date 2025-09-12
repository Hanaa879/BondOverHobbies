
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ShowcasePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Creator Showcase</h1>
        <p>Explore a universe of creations from your fellow hobbyists and support their passion.</p>
      </main>
      <Footer />
    </div>
  );
}
