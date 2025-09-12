
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function AddHobbyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Add a Hobby</h1>
        <p>This page will contain a form to add a new hobby to your profile.</p>
      </main>
      <Footer />
    </div>
  );
}
