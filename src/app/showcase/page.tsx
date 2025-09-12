
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ShowcasePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Creator Showcase</h1>
        <p>This is where users can see and buy creations from fellow hobbyists.</p>
      </main>
      <Footer />
    </div>
  );
}
