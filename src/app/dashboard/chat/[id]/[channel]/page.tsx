
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Calendar, MapPin, Users, Hash, MessageCircle, Paperclip, X, PlusCircle, Loader2 } from 'lucide-react';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, doc, onSnapshot, orderBy, query, addDoc, serverTimestamp, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

type Attachment = {
  url: string;
  type: 'image' | 'video';
  fileName: string;
};

export default function ChatPage() {
  const params = useParams();
  const communityId = params.id as string;
  const channelId = params.channel as string;
  const { user, userData } = useAuth();
  const router = useRouter();

  const [community, setCommunity] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const { toast } = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const events = community?.events || []; // Assuming events are part of community doc

  // Fetch community details
  useEffect(() => {
    if (!communityId) return;
    const communityDocRef = doc(db, 'communities', communityId);
    const unsubscribe = onSnapshot(communityDocRef, (doc) => {
      if (doc.exists()) {
        setCommunity({ id: doc.id, ...doc.data() });
      } else {
        // Handle community not found
        toast({ title: "Community not found", variant: "destructive" });
        router.push('/dashboard');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [communityId, router, toast]);

  // Fetch messages for the channel
  useEffect(() => {
    if (!communityId || !channelId) return;

    const messagesColRef = collection(db, 'communities', communityId, 'messages', channelId, 'messages');
    const q = query(messagesColRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [communityId, channelId]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (!newMessage.trim() && !attachment)) {
      return;
    }
    
    const messagesColRef = collection(db, 'communities', communityId, 'messages', channelId, 'messages');

    try {
        await addDoc(messagesColRef, {
            text: newMessage,
            senderId: user.uid,
            senderName: userData?.displayName || user.email,
            senderAvatar: userData?.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
            timestamp: serverTimestamp(),
            // TODO: Handle attachment upload to Firebase Storage
            attachment: attachment || null,
        });
        setNewMessage('');
        setAttachment(null);
    } catch (error) {
        console.error("Error sending message: ", error);
        toast({ title: "Failed to send message", variant: 'destructive'});
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, using Data URL. In a real app, upload to Firebase Storage and get URL.
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
    if (!community) return;
    setIsAssistantLoading(true);
    try {
      const result = await aiChatAssistant({
        topic: `${community.name} - #${channelId}`,
        interests: community.interests || '',
        messageHistory: messages.map((m: any) => `${m.senderName}: ${m.text}`),
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
  
  const handleCreateChannel = async () => {
    if (newChannelName.trim() && community) {
        const slug = newChannelName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (!community.channels.includes(slug)) {
            const communityDocRef = doc(db, 'communities', communityId);
            await updateDoc(communityDocRef, {
                channels: arrayUnion(slug)
            });

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
  };

  if (isLoading || !community) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
            <p className="mt-4">Loading community chat...</p>
        </div>
    );
  }

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
                {community.channels.map((channel: string) => (
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
        <div className="flex-grow flex flex-col relative h-[calc(100vh-var(--header-height,60px))]">
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
                    <TabsContent value="chat" className="flex flex-col flex-grow h-[calc(100vh-var(--header-height,60px)-100px)]">
                        <div className='border-b p-4 border-white/10'>
                            <h2 className="text-2xl font-bold flex items-center"><Hash className="h-6 w-6 mr-2 text-muted-foreground"/>{channelId}</h2>
                            <p className="text-sm text-muted-foreground">This is the start of the #{channelId} channel.</p>
                        </div>
                        <ScrollArea className="flex-grow mb-4 pr-4">
                            <div className="space-y-6 p-6">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-4 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                                {msg.senderId !== user?.uid && (
                                    <Avatar className="h-10 w-10">
                                    <AvatarImage src={msg.senderAvatar} alt={msg.senderName} />
                                    <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`rounded-lg p-3 max-w-md ${msg.senderId === user?.uid ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="font-semibold text-sm mb-1">{msg.senderName}</p>
                                    {msg.attachment?.type === 'image' && (
                                      <Image src={msg.attachment.url} alt="User attachment" width={300} height={200} className="rounded-md my-2" />
                                    )}
                                    {msg.attachment?.type === 'video' && (
                                        <video src={msg.attachment.url} controls className="rounded-md my-2 max-w-full" />
                                    )}
                                    {msg.text && <p>{msg.text}</p>}
                                </div>
                                {msg.senderId === user?.uid && (
                                    <Avatar className="h-10 w-10">
                                    <AvatarImage src={msg.senderAvatar} alt={msg.senderName} />
                                    <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
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
                                    disabled={!user}
                                />
                                <Button type="button" variant="outline" size="icon" onClick={handleAssistantClick} disabled={isAssistantLoading || !user}>
                                    <Sparkles className={`h-5 w-5 ${isAssistantLoading ? 'animate-spin' : ''}`} />
                                    <span className="sr-only">AI Assistant</span>
                                </Button>
                                <Button type="submit" disabled={!user}>
                                    <Send className="h-5 w-5" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </form>
                        </div>
                    </TabsContent>
                    <TabsContent value="events" className="flex-grow">
                        <div className="space-y-4 p-6">
                            {events.length > 0 ? (
                                events.map((event: any) => (
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
