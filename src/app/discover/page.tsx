
"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { personalizedHobbyRecommendations } from '@/ai/flows/personalized-hobby-recommendations';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function DiscoverPage() {
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGetRecommendations = async () => {
    if (!interests.trim()) {
      toast({
        variant: "destructive",
        title: "Interests needed",
        description: "Please tell us what you're interested in.",
      });
      return;
    }
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await personalizedHobbyRecommendations({ interests });
      const hobbiesArray = result.hobbies.split(',').map(h => h.trim()).filter(h => h);
      setRecommendations(hobbiesArray);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "The AI couldn't generate recommendations right now.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinCommunity = (hobby: string) => {
    // This is a mock implementation. In a real app, you'd have a more robust system
    // for creating/finding community IDs.
    const communityId = hobby.toLowerCase().replace(/\s+/g, '-');
    toast({
        title: `Joined ${hobby}!`,
        description: `You are now a member of the ${hobby} community.`,
    });
    router.push(`/dashboard/chat/${communityId}/general`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Discover New Hobbies</CardTitle>
            <CardDescription>
              Let our AI help you find your next passion. Just tell us what you like!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="font-medium">What are your interests?</p>
              <Input
                placeholder="e.g., being creative, outdoors, technology, fantasy books"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
               <p className="text-xs text-muted-foreground">Separate different interests with a comma.</p>
            </div>
            <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
            
            {recommendations.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-lg">Here are some ideas for you:</h3>
                <ul className="space-y-2">
                  {recommendations.map((hobby, index) => (
                    <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                      <span className="font-medium">{hobby}</span>
                       <Button size="sm" variant="outline" onClick={() => handleJoinCommunity(hobby)}>Join</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
