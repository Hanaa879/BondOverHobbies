
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
      icon: <MessageSquare className="w-8 h-8 text-black" />,
      text: "You can talk to people interested in the same stuff."
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-black" />,
      text: "You can buy from your favorite hobbyist."
    },
    {
      icon: <Smile className="w-8 h-8 text-black" />,
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
        <section className="bg-white py-10 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative flex justify-center items-center h-[70vh] w-full">
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

              {/* Foreground Content Collage */}
              <div className="absolute inset-0">
                  {/* Main Title */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white font-headline text-glow">
                        Discover Your Next Passion
                    </h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-md mx-auto">
                        Connect with fellow hobbyists, join events, and explore a world of creativity.
                    </p>
                  </div>
                  
                  {/* Top Left decorative text */}
                  <div className="absolute top-10 left-10 bg-gray-800 bg-opacity-70 p-4 border border-gray-500 rounded font-code">
                    <p className="text-white">DEPRIVING YOU</p>
                    <p className="text-white">DONT YOU FEEL</p>
                    <p className="text-white">ITS GOIN BAD</p>
                    <p className="text-white">FAKE SMILE</p>
                  </div>

                   {/* Bottom Right "Join" Button */}
                  <div className="absolute bottom-10 right-10 bg-white p-3 border-2 border-gray-400 rounded-md shadow-2xl">
                    <p className="font-bold mb-2">Ready to Dive In?</p>
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                        <Link href="/signup">
                        Join Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                  </div>
                  
                  {/* Bottom Left decorative text */}
                  <div className="absolute bottom-10 left-10 bg-pink-500 text-white p-3 font-bold text-lg border-2 border-pink-300 transform -rotate-6">
                    SAY YES TO EPIC LIFE!!! It's FREE!
                  </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground">
           <div className="container mx-auto px-4 md:px-6 py-12">
              <h2 className="text-4xl font-bold text-center mb-8 font-headline">BondOverHobbies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="bg-background/20 text-foreground p-6 rounded-lg flex items-center gap-4 shadow-lg">
                    <div className="flex-shrink-0 bg-gray-800/10 p-3 rounded-md">
                        {feature.icon}
                    </div>
                    <p className="font-medium text-primary-foreground">{feature.text}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Sign Up Section */}
        <section className="py-16 md:py-24 bg-gray-800 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Dive In?</h2>
              <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
                Join our community today and start connecting with people who share your passion.
              </p>
              <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/signup">
                  Join Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
