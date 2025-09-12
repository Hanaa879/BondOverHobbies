
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Chat Room</h1>
        <p>This is a placeholder for the chat room with ID: {params.id}.</p>
      </main>
      <Footer />
    </div>
  );
}
