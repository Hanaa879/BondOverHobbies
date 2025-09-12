
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Sparkles } from 'lucide-react';
import { mentalHealthAssistant } from '@/ai/flows/mental-health-assistant';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export function AIAssistantWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hi there! I'm Sparky. How can I help you feel more connected today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const newMessages: Message[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const result = await mentalHealthAssistant({
                messageHistory: newMessages,
            });
            setMessages(prev => [...prev, { role: 'model', content: result.response }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            toast({
                variant: "destructive",
                title: "Oh no! Something went wrong.",
                description: "Sparky is taking a little break. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg animate-button-bounce"
                    size="icon"
                >
                    <Bot className="h-8 w-8" />
                    <span className="sr-only">Open AI Assistant</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-80 p-0 border-0 shadow-2xl rounded-2xl mr-4">
                <div className="flex flex-col h-[28rem]">
                    <header className="bg-primary text-primary-foreground p-4 rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <Bot className="h-6 w-6" />
                            <h3 className="font-bold text-lg">Sparky</h3>
                        </div>
                        <p className="text-sm text-primary-foreground/90 mt-1">Your friendly wellness guide</p>
                    </header>
                    <ScrollArea className="flex-grow bg-background" ref={scrollAreaRef as any}>
                        <div className="p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'flex gap-2 text-sm',
                                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'rounded-lg px-3 py-2 max-w-[80%]',
                                            msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted text-muted-foreground'
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="rounded-lg px-3 py-2 bg-muted text-muted-foreground">
                                        <Sparkles className="h-4 w-4 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <footer className="p-4 bg-background border-t rounded-b-2xl">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Sparky..."
                                className="flex-grow"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-5 w-5" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </footer>
                </div>
            </PopoverContent>
        </Popover>
    );
}
