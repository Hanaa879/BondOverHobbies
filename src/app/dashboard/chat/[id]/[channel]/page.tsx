

"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Calendar, MapPin, Users, Hash, MessageCircle, Paperclip, X, PlusCircle } from 'lucide-react';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';


// Mock data
const communities: Record<string, { name: string; avatar: string; interests: string; channels: string[], backgroundUrl: string; }> = {
  '1': { name: 'Photography Club', avatar: 'https://picsum.photos/seed/p-club/100/100', interests: 'portrait photography, landscape shots', channels: ['general', 'portraits', 'landscapes'], backgroundUrl: 'https://picsum.photos/seed/photography-bg/1200/800' },
  '2': { name: 'Weekend Hikers', avatar: 'https://picsum.photos/seed/hikers/100/100', interests: 'long trails, mountain views', channels: ['general', 'trail-talk', 'gear'], backgroundUrl: 'https://picsum.photos/seed/hiking-bg/1200/800' },
  '3': { name: 'Creative Cooks', avatar: 'https://picsum.photos/seed/cooks/100/100', interests: 'baking, italian cuisine', channels: ['general', 'baking', 'recipes'], backgroundUrl: 'https://picsum.photos/seed/cooking-bg/1200/800' },
  '4': { name: 'Running Club', avatar: 'https://picsum.photos/seed/running/100/100', interests: 'marathons, trail running', channels: ['general', 'race-day', 'training-plans', 'gear-talk'], backgroundUrl: 'https://picsum.photos/seed/running-bg/1200/800' },
  '5': { name: 'Bookworms Unite', avatar: 'https://picsum.photos/seed/books/100/100', interests: 'fantasy novels, classic literature', channels: ['general', 'fantasy', 'classics-corner'], backgroundUrl: 'https://picsum.photos/seed/books-bg/1200/800' },
  'creative-arts-crafts': { name: 'Creative Arts & Crafts', avatar: 'https://picsum.photos/seed/arts/100/100', interests: 'painting, drawing, sculpting', channels: ['general', 'painting', 'sketchbook'], backgroundUrl: 'https://picsum.photos/seed/arts-bg/1200/800' },
};

const initialMessages: Record<string, Record<string, any[]>> = {
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

const communityEvents: Record<string, any[]> = {
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

type Attachment = {
  url: string;
  type: 'image' | 'video';
  fileName: string;
};


export default function ChatPage({ params }: { params: { id: string; channel: string } }) {
  const communityId = params.id as keyof typeof communities;
  const channelId = params.channel as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!communities[communityId]) {
      const name = communityId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      communities[communityId] = { name: name, avatar: `https://picsum.photos/seed/${communityId}/100/100`, interests: 'General interests', channels: ['general'], backgroundUrl: `https://picsum.photos/seed/${communityId}-bg/1200/800` };
  }
  if (!initialMessages[communityId]) {
    initialMessages[communityId] = {};
  }


  const [community, setCommunity] = useState(communities[communityId]);
  const [messages, setMessages] = useState(
    initialMessages[communityId]?.[channelId] || []
  );
  
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const { toast } = useToast();
  const events = communityEvents[communityId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() || attachment) {
      const newMsgObject = { 
        sender: 'You', 
        message: newMessage, 
        avatar: 'https://picsum.photos/seed/user-avatar/100/100',
        attachment: attachment
      };
      setMessages([...messages, newMsgObject]);

      if (!initialMessages[communityId][channelId]) {
         initialMessages[communityId][channelId] = [];
      }
      initialMessages[communityId][channelId].push(newMsgObject);
      
      setNewMessage('');
      setAttachment(null);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const url = loadEvent.target?.result as string;
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        setAttachment({ url, type, fileName: file.name });
      };
      reader.readAsDataURL(file);
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
  
  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
        const slug = newChannelName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (!community.channels.includes(slug)) {
            const updatedCommunity = {
                ...community,
                channels: [...community.channels, slug]
            };
            setCommunity(updatedCommunity);
            communities[communityId] = updatedCommunity;
            initialMessages[communityId][slug] = [];
            
            toast({
                title: "Channel created!",
                description: `The #${slug} channel has been added.`
            });
            setNewChannelName("");
            setIsCreateChannelOpen(false);
            router.push(`/dashboard/chat/${communityId}/${slug}`);
        } else {
             toast({
                variant: "destructive",
                title: "Channel exists",
                description: `A channel named #${slug} already exists.`
            });
        }
    }
  }

  useEffect(() => {
    setMessages(initialMessages[communityId]?.[channelId] || []);
  }, [channelId, communityId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar for Channels */}
        <aside className="w-full md:w-64 bg-muted/50 border-r p-4 flex flex-col">
            <div className="flex items-center gap-3">
                 <Avatar>
                  <AvatarImage src={community.avatar} alt={community.name} />
                  <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold">{community.name}</h1>
            </div>
             <div className="mt-4 space-y-2 flex-grow">
                <div className="flex justify-between items-center px-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">TEXT CHANNELS</h2>
                     <Dialog open={isCreateChannelOpen} onOpenChange={setIsCreateChannelOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a new channel</DialogTitle>
                                <DialogDescription>
                                    Channels are for discussing specific topics within your community.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="channel-name" className="text-right">
                                        Name
                                    </Label>
                                    <Input 
                                        id="channel-name" 
                                        value={newChannelName}
                                        onChange={(e) => setNewChannelName(e.target.value)}
                                        placeholder="e.g., introductions"
                                        className="col-span-3" 
                                    />
                                </div>
                            </div>
                             <DialogFooter>
                                <Button type="button" onClick={handleCreateChannel}>Create Channel</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
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
        <div className="flex-grow flex flex-col relative">
          <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: `url(${community.backgroundUrl})` }}
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
          <div className="relative z-20 flex-grow flex flex-col">
            <div className="border-b p-4 border-white/10">
                <Tabs defaultValue="chat" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="chat"><MessageCircle className="mr-2 h-4 w-4" />Chat</TabsTrigger>
                        <TabsTrigger value="events"><Calendar className="mr-2 h-4 w-4" />Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="flex flex-col" style={{height: 'calc(100vh - 250px)'}}>
                        <div className='border-b p-4 border-white/10'>
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
                                    {msg.attachment?.type === 'image' && (
                                      <Image src={msg.attachment.url} alt="User attachment" width={300} height={200} className="rounded-md my-2" />
                                    )}
                                    {msg.attachment?.type === 'video' && (
                                        <video src={msg.attachment.url} controls className="rounded-md my-2 max-w-full" />
                                    )}
                                    {msg.message && <p>{msg.message}</p>}
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

                        <div className="mt-auto bg-background/80 p-4 border-t border-white/10">
                            {attachment && (
                                <div className="relative p-2 mb-2 border rounded-md">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-1 right-1 h-6 w-6"
                                        onClick={() => setAttachment(null)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    {attachment.type === 'image' ? (
                                        <Image src={attachment.url} alt={attachment.fileName} width={80} height={80} className="h-20 w-20 object-cover rounded-md"/>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <video src={attachment.url} className="h-20 w-20 object-cover rounded-md bg-black" />
                                            <span className="text-sm text-muted-foreground">{attachment.fileName}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                                    <Paperclip className="h-5 w-5" />
                                    <span className="sr-only">Attach file</span>
                                </Button>
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*,video/*"
                                />
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
