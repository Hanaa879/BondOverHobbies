import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bot, MessageSquare, ShoppingBag, Smile } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  const heroStampImage = PlaceHolderImages.find(p => p.id === 'hero-background');

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="relative">
              <div
                className="absolute -top-8 -left-8 w-48 h-48 bg-no-repeat"
                style={{ backgroundImage: "url('/stars.svg')" }}
              />
              <div className="relative z-10 p-4 bg-white border-8 border-gray-800" style={{borderImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cstyle%3Epath%7Bfill:%231f2937%7D%3C/style%3E%3Cpath d=\'M0 10 V0 H10 L10 10 Z\'/%3E%3Cpath d=\'M90 10 V0 H100 L100 10 Z\'/%3E%3Cpath d=\'M0 90 V100 H10 L10 90 Z\'/%3E%3Cpath d=\'M90 90 V100 H100 L100 90 Z\'/%3E%3Cpath d=\'M10 0 H90 V10 H10 Z\'/%3E%3Cpath d=\'M10 90 H90 V100 H10 Z\'/%3E%3Cpath d=\'M0 10 H10 V90 H0 Z\'/%3E%3Cpath d=\'M90 10 H100 V90 H90 Z\'/%3E%3Crect x=\'10\' y=\'10\' width=\'80\' height=\'80\'/%3E%3C/svg%3E") 10 / 10px / 0 round' }}>
                {heroStampImage && (
                  <Image
                    src={heroStampImage.imageUrl}
                    alt={heroStampImage.description}
                    width={1200}
                    height={600}
                    className="object-cover w-full h-auto"
                    data-ai-hint={heroStampImage.imageHint}
                  />
                )}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <p className="font-bold text-lg text-white font-headline">experience</p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.17 15.17c-.41.41-1.07.41-1.48 0-.41-.41-.41-1.07 0-1.48l3.48-3.48-3.48-3.48c-.41-.41-.41-1.07 0-1.48s1.07-.41 1.48 0l4.24 4.24c.41.41.41 1.07 0 1.48l-4.24 4.24z" fill="white"/>
                    </svg>
                </div>
              </div>

               <div className="absolute -bottom-10 right-10 md:right-20 z-20 transform -translate-y-1/2">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10 H90 V70 H60 L40 90 V70 H10 Z" fill="white" stroke="black" strokeWidth="4"/>
                    <circle cx="30" cy="40" r="4" fill="black"/>
                    <circle cx="50" cy="40" r="4" fill="black"/>
                    <circle cx="70" cy="40" r="4" fill="black"/>
                </svg>
               </div>
            </div>
          </div>
        </section>

        <section className="bg-red-600 text-white">
           <div className="container mx-auto px-4 md:px-6 py-12">
              <h2 className="text-4xl font-bold text-center mb-8 font-headline">HobbySphere</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="bg-pink-100/90 text-red-900 p-6 rounded-lg flex items-center gap-4 shadow-lg">
                    <div className="flex-shrink-0 bg-gray-800/10 p-3 rounded-md">
                        {feature.icon}
                    </div>
                    <p className="font-medium">{feature.text}</p>
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
              <Button size="lg" className="mt-8 bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="#">
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
