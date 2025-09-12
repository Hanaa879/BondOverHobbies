import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AIAssistantWidget } from '@/components/layout/ai-assistant-widget';

export const metadata: Metadata = {
  title: 'BondOverHobbies',
  description: 'Your cosmic community for connection, creativity, and well-being.',
  keywords: ['hobbies', 'community', 'AI', 'social', 'events', 'creators', 'mental health', 'wellness'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        {children}
        <AIAssistantWidget />
        <Toaster />
      </body>
    </html>
  );
}
