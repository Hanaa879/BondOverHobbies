import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bot, Compass, Paintbrush, Users } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const communityImage = PlaceHolderImages.find(p => p.id === 'hobby-communities');
  const eventsImage = PlaceHolderImages.find(p => p.id === 'local-events');
  const showcaseImage = PlaceHolderImages.find(p => p.id === 'creator-showcase');

  const features = [
    {
      icon: <Users className="w-8 h-8 mb-4 text-primary" />,
      title: 'Hobby Communities',
      description: 'Find your tribe in dedicated forums for every interest imaginable. Share your progress, ask questions, and connect with fellow enthusiasts.',
      image: communityImage,
      rotation: 'transform -rotate-2 hover:rotate-0',
    },
    {
      icon: <Compass className="w-8 h-8 mb-4 text-primary" />,
      title: 'Local Events',
      description: 'Discover workshops, meetups, and conventions happening near you. Take your online connections offline and learn in person.',
      image: eventsImage,
      rotation: 'transform rotate-1 hover:rotate-0',
    },
    {
      icon: <Paintbrush className="w-8 h-8 mb-4 text-primary" />,
      title: 'Creator Showcase',
      description: 'Get inspired by the incredible work of others. Share your own creations, from paintings to code projects, and get valuable feedback.',
      image: showcaseImage,
      rotation: 'transform rotate-2 hover:rotate-0',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline text-glow">
              BondOverHobbies
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Connect, Create, and Conquer Loneliness. Your new favorite community is just a click away.
            </p>
            <Button size="lg" className="mt-8 animate-button-bounce" asChild>
              <Link href="/discover">
                Find Your Community <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-headline">A Place for Every Passion</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you're a seasoned pro or just starting out, HobbySphere has something for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {features.map((feature, index) => (
                <Card key={index} className={`shadow-lg hover:shadow-2xl transition-all duration-300 ${feature.rotation}`}>
                  <CardHeader className="items-center text-center">
                    {feature.icon}
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feature.image && (
                       <div className="aspect-[3/2] mb-4 overflow-hidden rounded-md">
                         <Image
                           src={feature.image.imageUrl}
                           alt={feature.image.description}
                           width={600}
                           height={400}
                           className="object-cover w-full h-full"
                           data-ai-hint={feature.image.imageHint}
                         />
                       </div>
                    )}
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <Bot className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-headline">Your Friendly AI Sidekick</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our AI is here to make your journey smoother. Get personalized hobby recommendations and even a little help breaking the ice in community chats.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 text-primary rounded-full p-2 flex-shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Hobby Discovery</h3>
                      <p className="text-muted-foreground">Tell us what you like, and we'll find new passions for you.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 text-primary rounded-full p-2 flex-shrink-0">
                       <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Conversation Starters</h3>
                      <p className="text-muted-foreground">Feeling shy? Our AI assistant provides prompts to get conversations flowing.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-card rounded-lg shadow-lg transform rotate-3">
                 <div className="relative aspect-video">
                    <div className="absolute top-2 left-2 flex space-x-1.5 z-10">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="h-full w-full bg-black/80 rounded-b-lg flex items-center justify-center p-4 pt-6">
                        <p className="font-code text-sm text-green-400">
                            <span className="text-green-400/50">$</span> gemini --recommend hobbies --interests "sci-fi, pixel art"
                            <br />
                            <br />
                            <span className="text-white">Analyzing... Found 3 great matches!</span>
                            <br />
                            <span className="text-white">1. Retro Game Development</span>
                            <br />
                            <span className="text-white">2. World-building for TTRPGs</span>
                            <br />
                            <span className="text-white">3. Building miniature dioramas</span>
                            <span className="animate-ping">_</span>
                        </p>
                    </div>
                 </div>
                 <p className="text-xs text-center mt-2 text-muted-foreground">A peek at our AI in action.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center p-8 border-4 border-dashed border-primary/50 rounded-xl transform -rotate-1">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Dive In?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Sign up for our newsletter to get the latest updates and be the first to know when we launch!
              </p>
              <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="flex-grow text-center sm:text-left"
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Join the Waitlist
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
