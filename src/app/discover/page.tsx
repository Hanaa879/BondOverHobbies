
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
import { useAuth } from '@/hooks/use-auth';
import { addDoc, arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function DiscoverPage() {
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();

  const handleGetRecommendations = async () => {
    if (!interests.trim()) {
      toast({
        variant: "destructive",
        title: "Share Your Interests",
        description: "Please tell us what sparks your curiosity.",
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
        description: "Our AI is stargazing right now. Please try again in a moment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinCommunity = async (hobby: string) => {
    if (!user) {
        toast({ title: "Please sign in to join a community.", variant: "destructive" });
        return;
    }
    setIsJoining(hobby);
    try {
        const communityId = hobby.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const communityRef = doc(db, 'communities', communityId);
        const userRef = doc(db, 'users', user.uid);

        // Check if community exists, if not create it.
        const communitySnapshot = await getDocs(query(collection(db, 'communities'), where('id', '==', communityId)));

        if (communitySnapshot.empty) {
            await setDoc(communityRef, {
                id: communityId,
                name: hobby,
                description: `A community for enthusiasts of ${hobby}.`,
                avatar: `https://picsum.photos/seed/${communityId}/100/100`,
                backgroundUrl: `https://picsum.photos/seed/${communityId}-bg/1200/800`,
                members: [user.uid],
                channels: ['general'],
                createdAt: serverTimestamp(),
            });
            // Create a general channel subcollection
            await addDoc(collection(communityRef, 'channels'), { name: 'general', createdAt: serverTimestamp() });
        } else {
            await updateDoc(communityRef, {
                members: arrayUnion(user.uid)
            });
        }
        
        await updateDoc(userRef, {
            communities: arrayUnion(communityId),
            hobbies: arrayUnion(hobby)
        });
        
        toast({
            title: `Welcome to ${hobby}!`,
            description: `You've successfully joined the ${hobby} community.`,
        });
        router.push(`/dashboard`);

    } catch (error) {
        console.error("Error joining community: ", error);
        toast({ title: "Failed to join community", variant: 'destructive' });
    } finally {
        setIsJoining(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Discover Your Next Passion</CardTitle>
            <CardDescription>
              Let our AI guide help you find a new universe of interests. Just tell us what you love!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="font-medium">What sparks your curiosity?</p>
              <Input
                placeholder="e.g., creative writing, stargazing, urban gardening"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGetRecommendations();
                  }
                }}
              />
               <p className="text-xs text-muted-foreground">Separate your interests with a comma.</p>
            </div>
            <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning the Cosmos...
                </>
              ) : (
                'Find My Hobbies'
              )}
            </Button>
            
            {recommendations.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-lg">A new constellation of hobbies awaits:</h3 >
                <ul className="space-y-2">
                  {recommendations.map((hobby, index) => (
                    <li key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                      <span className="font-medium">{hobby}</span>
                       <Button size="sm" variant="outline" onClick={() => handleJoinCommunity(hobby)} disabled={isJoining === hobby}>
                         {isJoining === hobby && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                         Join
                       </Button>
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
