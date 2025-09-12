'use server';

/**
 * @fileOverview An AI communication assistant to help users start and maintain conversations within hobby communities.
 *
 * - aiChatAssistant - A function that provides conversation prompts and assistance.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function.
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({
  topic: z.string().describe('The topic of the hobby community.'),
  interests: z.string().describe('The users interests related to the topic.'),
  messageHistory: z.array(z.string()).optional().describe('A list of previous messages in the conversation.'),
});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  prompt: z.string().describe('A suggested message or conversation prompt for the user.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are an AI communication assistant designed to help users initiate and maintain conversations within online hobby communities. The user is new to the community or shy and needs help engaging with other members.

The community is focused on the following topic: {{{topic}}}.

The user is interested in: {{{interests}}}.

Here's the previous message history (if any):
{{#each messageHistory}}{{{this}}}
{{/each}}

Based on the topic, the user's interests, and the previous message history, suggest a message or conversation prompt that the user can use to start or continue a conversation. Make it sound friendly and engaging. Try to ask a question in the prompt to encourage response.`, 
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
