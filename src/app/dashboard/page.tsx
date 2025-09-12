
"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, PlusCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Mock data - in a real app, this would come from your backend
  const [userHobbies, setUserHobbies] = useState(['Photography', 'Hiking', 'Cooking']);
  const [recentConversations, setRecentConversations] = useState([
    {
      id: 1,
      name: 'Photography Club',
      lastMessage: 'Alice: That shot is amazing!',
      avatar: 'https://picsum.photos/seed/p-club/100/100',
    },
    {
      id: 2,
      name: 'Weekend Hikers',
      lastMessage: 'Bob: Are we still on for Saturday?',
      avatar: 'https://picsum.photos/seed/hikers/100/100',
    },
    {
      id: 3,
      name: 'Creative Cooks',
      lastMessage: 'You: I just tried the new recipe, it was delicious!',
      avatar: 'https://picsum.photos/seed/cooks/100/100',
    },
  ]);

  const [discoverableCommunities, setDiscoverableCommunities] = useState([
    {
      id: 4,
      name: 'Running Club',
      description: 'For all levels of runners.',
      avatar: 'https://picsum.photos/seed/running/100/100'
    },
     {
      id: 5,
      name: 'Bookworms Unite',
      description: 'Discussing everything from classics to modern hits.',
      avatar: 'https://picsum.photos/seed/books/100/100'
    },
  ]);

  const handleJoinCommunity = (community: { id: number; name: string; description: string; avatar: string; }) => {
    // Add to conversations
    setRecentConversations(prev => [...prev, {
      id: community.id,
      name: community.name,
      lastMessage: `You just joined the ${community.name} community!`,
      avatar: community.avatar,
    }]);

    // Remove from discoverable
    setDiscoverableCommunities(prev => prev.filter(c => c.id !== community.id));

    // Add to hobbies if not already there
    if (!userHobbies.includes(community.name)) {
      setUserHobbies(prev => [...prev, community.name]);
    }
    
    // Navigate to chat's default channel
    router.push(`/dashboard/chat/${community.id}/general`);
  };

  const filteredConversations = recentConversations.filter(
    (convo) =>
      convo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHobbies = userHobbies.filter((hobby) =>
    hobby.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDiscoverable = discoverableCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showDiscover = searchQuery.length > 0 && filteredDiscoverable.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for hobbies, events, or people..."
              className="w-full pl-10 pr-4 py-2 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {showDiscover && (
                 <Card>
                  <CardHeader>
                    <CardTitle>Discover Communities</CardTitle>
                    <CardDescription>
                      Join communities that match your search.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredDiscoverable.map((community) => (
                          <div key={community.id} className="flex items-center p-2 -mx-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={community.avatar} alt={community.name} />
                              <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <p className="font-semibold">{community.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {community.description}
                              </p>
                            </div>
                             <Button size="sm" onClick={() => handleJoinCommunity(community)}>
                              <Plus className="mr-2 h-4 w-4" />
                              Join
                            </Button>
                          </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>
                    Jump back into your recent chats.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((convo) => (
                        <Link href={`/dashboard/chat/${convo.id}/general`} key={convo.id} className="flex items-center p-2 -mx-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={convo.avatar} alt={convo.name} />
                            <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <p className="font-semibold">{convo.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {convo.lastMessage}
                            </p>
                          </div>
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </Link>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-4">No conversations found.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Your Hobbies</CardTitle>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/hobbies/add">
                      <PlusCircle className="h-5 w-5 text-gray-400" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {filteredHobbies.length > 0 ? (
                    <ul className="space-y-2">
                      {filteredHobbies.map((hobby) => (
                        <li key={hobby} className="flex items-center text-sm">
                          <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    userHobbies.length > 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-4">No hobbies found for your search.</p>
                    ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                      <p>You haven&apos;t added any hobbies yet.</p>
                      <Button variant="link" className="mt-2" asChild>
                        <Link href="/discover">Find Hobbies</Link>
                      </Button>
                    </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
