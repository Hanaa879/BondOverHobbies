
"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    hobbyName: z.string().min(2, { message: "Hobby name must be at least 2 characters." }),
    description: z.string().optional(),
});


export default function AddHobbyPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hobbyName: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("New Hobby Submitted:", values);
    toast({
      title: "Hobby Added!",
      description: `You've successfully added "${values.hobbyName}" to your hobbies.`,
    });
    // In a real app, you'd save this to the user's profile and likely redirect
    // to the dashboard or the new hobby's community page.
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Add a New Hobby</CardTitle>
            <CardDescription>
                Tell us about a hobby you enjoy. This will help us connect you with the right communities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="hobbyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hobby Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Urban Gardening" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us a bit about why you love this hobby." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Add Hobby</Button>
                </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
