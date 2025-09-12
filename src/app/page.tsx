
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, MessageSquare, ShoppingBag, Smile } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {

  const heroFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      text: "You can talk to people interested in the same stuff."
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-primary" />,
      text: "You can buy from your favorite hobbyist."
    },
    {
      icon: <Smile className="w-8 h-8 text-primary" />,
      text: "No more loneliness or boredom, only discovering new fun and events."
    }
  ];

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background') || {
      imageUrl: "https://picsum.photos/seed/default-hero/800/1000",
      description: "Default placeholder image",
      imageHint: "abstract art"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative flex justify-center items-center h-[60vh] w-full rounded-lg overflow-hidden">
              {/* Background Image */}
              <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />

              {/* Foreground Content */}
              <div className="relative text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white font-headline text-glow">
                    Discover Your Next Passion
                </h1>
                <p className="mt-4 text-xl text-gray-200 max-w-xl mx-auto">
                    Connect with fellow hobbyists, join events, and explore a world of creativity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Dive In?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Join our community today and start connecting with people who share your passion.
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
