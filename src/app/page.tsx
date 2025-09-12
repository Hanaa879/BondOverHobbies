
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, ShoppingBag, Smile } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PixelatedStars } from '@/components/layout/pixelated-stars';

export default function Home() {

  const heroFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      text: "Connect with kindred spirits who share your enthusiasm in vibrant communities."
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-primary" />,
      text: "Discover and support unique creations from talented artisans in our creator marketplace."
    },
    {
      icon: <Smile className="w-8 h-8 text-primary" />,
      text: "Transform loneliness into connection. A universe of new friends and experiences awaits."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative flex justify-center items-center h-[60vh] w-full rounded-lg overflow-hidden">
              <PixelatedStars />
              <div className="absolute inset-0 bg-background/30" />

              {/* Foreground Content */}
              <div className="relative text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white font-headline text-glow">
                    Ignite Your Next Passion
                </h1>
                <p className="mt-4 text-xl text-gray-200 max-w-xl mx-auto">
                    Forge connections with fellow enthusiasts, embark on new adventures, and unlock a universe of creativity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Find Your Constellation?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Join our vibrant community and start forging bonds with people who share your passions. Your journey to wellness and connection starts here.
              </p>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/signup">
                  Join Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
        </section>

        <section className="bg-secondary text-secondary-foreground">
           <div className="container mx-auto px-4 md:px-6 py-12">
              <h2 className="text-4xl font-bold text-center mb-8 font-headline">BondOverHobbies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="bg-background/20 text-foreground p-6 rounded-lg flex items-center gap-4 shadow-lg">
                    <div className="flex-shrink-0 bg-primary/20 p-3 rounded-md">
                        {feature.icon}
                    </div>
                    <p className="font-medium text-foreground">{feature.text}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
