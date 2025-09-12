
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Calendar, MapPin, Users, Hash, MessageCircle } from 'lucide-react';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';


// Mock data
const communities = {
  '1': { name: 'Photography Club', avatar: 'https://picsum.photos/seed/p-club/100/100', interests: 'portrait photography, landscape shots', channels: ['general', 'portraits', 'landscapes'] },
  '2': { name: 'Weekend Hikers', avatar: 'https://picsum.photos/seed/hikers/100/100', interests: 'long trails, mountain views', channels: ['general', 'trail-talk', 'gear'] },
  '3': { name: 'Creative Cooks', avatar: 'https://picsum.photos/seed/cooks/100/100', interests: 'baking, italian cuisine', channels: ['general', 'baking', 'recipes'] },
  '4': { name: 'Running Club', avatar: 'https://picsum.photos/seed/running/100/100', interests: 'marathons, trail running', channels: ['general', 'race-day', 'training-plans', 'gear-talk'] },
  '5': { name: 'Bookworms Unite', avatar: 'https://picsum.photos/seed/books/100/100', interests: 'fantasy novels, classic literature', channels: ['general', 'fantasy', 'classics-corner'] },
};

const initialMessages = {
  '1': {
    'general': [
        { sender: 'Alice', message: 'That shot is amazing!', avatar: 'https://picsum.photos/seed/alice/100/100' },
        { sender: 'You', message: 'Thanks! The lighting was perfect.', avatar: 'https://picsum.photos/seed/user-avatar/100/100' },
    ]
  },
  '2': {
    'general': [
      { sender: 'Bob', message: 'Are we still on for Saturday?', avatar: 'https://picsum.photos/seed/bob/100/100' },
    ]
  },
  '3': {
    'general': [
        { sender: 'You', message: 'I just tried the new recipe, it was delicious!', avatar: 'https://picsum.photos/seed/user-avatar/100/100' },
    ]
  },
  '4': {
    'general': [
        { sender: 'You', message: 'Just joined! Looking forward to my first run with you all.', avatar: 'https://picsum.photos/seed/user-avatar/100/100' },
        { sender: 'Runner1', message: 'Welcome! Glad to have you.', avatar: 'https://picsum.photos/seed/runner1/100/100' },
    ],
    'gear-talk': [
        { sender: 'Runner2', message: 'Any recommendations for new running shoes?', avatar: 'https://picsum.photos/seed/runner2/100/100' },
    ]
  },
  '5': {
    'general': []
  },
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


export default function ChatPage({ params }: { params: { id: string; channel: string } }) {
  const communityId = params.id as keyof typeof communities;
  const channelId = params.channel as string;

  const community = communities[communityId] || { name: 'Unknown Community', avatar: '', interests: '', channels: ['general'] };
  
  const [messages, setMessages] = useState(
    (initialMessages[communityId] as any)?.[channelId] || []
  );
  
  const [newMessage, setNewMessage] = useState('');
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const { toast } = useToast();
  const events = communityEvents[communityId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsgObject = { sender: 'You', message: newMessage, avatar: 'https://picsum.photos/seed/user-avatar/100/100' };
      setMessages([...messages, newMsgObject]);

      // This is where you'd also update the main state/DB
      if ((initialMessages as any)?.[communityId]?.[channelId]) {
         (initialMessages as any)[communityId][channelId].push(newMsgObject);
      }
      
      setNewMessage('');
    }
  };

  const handleAssistantClick = async () => {
    setIsAssistantLoading(true);
    try {
      const result = await aiChatAssistant({
        topic: `${community.name} - #${channelId}`,
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
  
    // Effect to update messages when channel changes
  useState(() => {
    setMessages((initialMessages as any)?.[communityId]?.[channelId] || []);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar for Channels */}
        <aside className="w-full md:w-64 bg-muted/50 border-r p-4 space-y-4">
            <div className="flex items-center gap-3">
                 <Avatar>
                  <AvatarImage src={community.avatar} alt={community.name} />
                  <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold">{community.name}</h1>
            </div>
            <div className="space-y-2">
                <h2 className="text-sm font-semibold text-muted-foreground px-2">TEXT CHANNELS</h2>
                {community.channels.map(channel => (
                    <Link
                        key={channel}
                        href={`/dashboard/chat/${communityId}/${channel}`}
                        className={cn(
                            "flex items-center gap-2 p-2 rounded-md font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                            channelId === channel && "bg-accent text-accent-foreground"
                        )}
                    >
                        <Hash className="h-5 w-5" />
                        <span>{channel}</span>
                    </Link>
                ))}
            </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col">
          <div className="border-b p-4">
            <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chat"><MessageCircle className="mr-2 h-4 w-4" />Chat</TabsTrigger>
                    <TabsTrigger value="events"><Calendar className="mr-2 h-4 w-4" />Events</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="flex flex-col" style={{height: 'calc(100vh - 250px)'}}>
                    <div className='border-b p-4'>
                        <h2 className="text-2xl font-bold flex items-center"><Hash className="h-6 w-6 mr-2 text-muted-foreground"/>{channelId}</h2>
                        <p className="text-sm text-muted-foreground">This is the start of the #{channelId} channel.</p>
                    </div>
                    <ScrollArea className="flex-grow mb-4 pr-4">
                        <div className="space-y-6 p-6">
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

                    <div className="mt-auto bg-background p-4">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={`Message #${channelId}`}
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
                    <div className="space-y-4 p-6">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
