
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function DiscoverPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Discover</h1>
        <p>This is where users can discover new hobbies, people, and communities.</p>
      </main>
      <Footer />
    </div>
  );
}
