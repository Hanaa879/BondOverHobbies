
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
        <section className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative flex justify-center items-center">
              
              {/* Stars top-left */}
              <div
                className="absolute -top-12 -left-12 w-36 h-36 bg-no-repeat opacity-50"
                style={{ backgroundImage: "url('/stars.svg')" }}
              />
              
              {/* Arrow bottom-right */}
              <svg width="100" height="100" className="absolute -bottom-16 -right-12 text-gray-800 opacity-30 transform scale-x-[-1] rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
              
              <div className="relative p-4 bg-white transform -rotate-3" style={{boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'}}>
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={800}
                    height={1000}
                    className="object-cover w-full h-auto"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-headline text-glow">
                        Discover Your Next Passion
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-md">
                        Connect with fellow hobbyists, join events, and explore a world of creativity.
                    </p>
                    <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground animate-button-bounce" asChild>
                        <Link href="/signup">
                        Join Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
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
