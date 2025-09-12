
"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Calendar, MapPin, Users } from 'lucide-react';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data
const communities = {
  '1': { name: 'Photography Club', avatar: 'https://picsum.photos/seed/p-club/100/100', interests: 'portrait photography, landscape shots' },
  '2': { name: 'Weekend Hikers', avatar: 'https://picsum.photos/seed/hikers/100/100', interests: 'long trails, mountain views' },
  '3': { name: 'Creative Cooks', avatar: 'https://picsum.photos/seed/cooks/100/100', interests: 'baking, italian cuisine' },
  '4': { name: 'Running Club', avatar: 'https://picsum.photos/seed/running/100/100', interests: 'marathons, trail running' },
  '5': { name: 'Bookworms Unite', avatar: 'https://picsum.photos/seed/books/100/100', interests: 'fantasy novels, classic literature' },
};

const initialMessages = {
  '1': [
    { sender: 'Alice', message: 'That shot is amazing!', avatar: 'https://picsum.photos/seed/alice/100/100' },
    { sender: 'You', message: 'Thanks! The lighting was perfect.', avatar: 'https://picsum.photos/seed/user-avatar/100/100' },
  ],
  '2': [
    { sender: 'Bob', message: 'Are we still on for Saturday?', avatar: 'https://picsum.photos/seed/bob/100/100' },
  ],
  '3': [
      { sender: 'You', message: 'I just tried the new recipe, it was delicious!', avatar: 'https://picsum.photos/seed/user-avatar/100/100' },
  ],
  '4': [
    { sender: 'You', message: 'Just joined! Looking forward to my first run with you all.', avatar: 'https://picsum.photos/seed/user-avatar/100/100' },
  ],
  '5': [],
};

const communityEvents = {
    '4': [
        {
            id: 1,
            title: 'Weekly 5K Group Run',
            date: 'Saturday, 9:00 AM',
            location: 'City Park Entrance',
            description: 'Join us for our regular weekend run. All paces are welcome!',
            attendees: 12,
        },
        {
            id: 2,
            title: 'Marathon Prep Workshop',
            date: 'Next Wednesday, 7:00 PM',
            location: 'Community Center',
            description: 'A workshop on nutrition and pacing for the upcoming city marathon.',
            attendees: 8,
        },
    ]
}


export default function ChatPage({ params }: { params: { id: string } }) {
  const community = communities[params.id as keyof typeof communities] || { name: 'Unknown Community', avatar: '', interests: '' };
  const [messages, setMessages] = useState(initialMessages[params.id as keyof typeof initialMessages] || []);
  const [newMessage, setNewMessage] = useState('');
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const { toast } = useToast();
  const events = communityEvents[params.id as keyof typeof communityEvents] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', message: newMessage, avatar: 'https://picsum.photos/seed/user-avatar/100/100' }]);
      setNewMessage('');
    }
  };

  const handleAssistantClick = async () => {
    setIsAssistantLoading(true);
    try {
      const result = await aiChatAssistant({
        topic: community.name,
        interests: community.interests,
        messageHistory: messages.map(m => `${m.sender}: ${m.message}`),
      });
      setNewMessage(result.prompt);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "The AI assistant couldn't generate a message right now.",
      });
    } finally {
      setIsAssistantLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="bg-muted border-b">
          <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
              <Avatar>
                  <AvatarImage src={community.avatar} alt={community.name} />
                  <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{community.name}</h1>
          </div>
        </div>

        <div className="flex-grow container mx-auto px-4 md:px-6 py-8">
            <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="flex flex-col" style={{height: 'calc(100vh - 300px)'}}>
                    <ScrollArea className="flex-grow mb-4 pr-4">
                        <div className="space-y-6 py-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-4 ${msg.sender === 'You' ? 'justify-end' : ''}`}>
                            {msg.sender !== 'You' && (
                                <Avatar className="h-10 w-10">
                                <AvatarImage src={msg.avatar} alt={msg.sender} />
                                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg p-3 max-w-md ${msg.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="font-semibold text-sm mb-1">{msg.sender}</p>
                                <p>{msg.message}</p>
                            </div>
                            {msg.sender === 'You' && (
                                <Avatar className="h-10 w-10">
                                <AvatarImage src={msg.avatar} alt={msg.sender} />
                                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                            <p>No messages yet. Be the first to say something!</p>
                            </div>
                        )}
                        </div>
                    </ScrollArea>

                    <div className="mt-auto bg-background">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow"
                        />
                        <Button type="button" variant="outline" size="icon" onClick={handleAssistantClick} disabled={isAssistantLoading}>
                            <Sparkles className={`h-5 w-5 ${isAssistantLoading ? 'animate-spin' : ''}`} />
                            <span className="sr-only">AI Assistant</span>
                        </Button>
                        <Button type="submit">
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send</span>
                        </Button>
                        </form>
                    </div>
                </TabsContent>
                <TabsContent value="events">
                    <div className="space-y-4 py-6">
                        {events.length > 0 ? (
                            events.map(event => (
                                <Card key={event.id}>
                                    <CardHeader>
                                        <CardTitle>{event.title}</CardTitle>
                                        <CardDescription>{event.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span>{event.location}</span>
                                        </div>
                                         <div className="flex items-center text-sm text-muted-foreground">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>{event.attendees} attendees</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                                <p>No upcoming events for this community.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
