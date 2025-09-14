
'use server';

/**
 * @fileOverview An AI mental health and communication assistant to provide support and guidance.
 *
 * - mentalHealthAssistant - A function that provides helpful prompts and advice.
 * - MentalHealthAssistantInput - The input type for the mentalHealthAssistant function.
 * - MentalHealthAssistantOutput - The return type for the mentalHealthAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const MentalHealthAssistantInputSchema = z.object({
  history: z.array(messageSchema).describe('A list of previous messages in the conversation.'),
});
export type MentalHealthAssistantInput = z.infer<typeof MentalHealthAssistantInputSchema>;

const MentalHealthAssistantOutputSchema = z.object({
  response: z.string().describe('A supportive and helpful response from the assistant.'),
});
export type MentalHealthAssistantOutput = z.infer<typeof MentalHealthAssistantOutputSchema>;

export async function mentalHealthAssistant(input: MentalHealthAssistantInput): Promise<MentalHealthAssistantOutput> {
  return mentalHealthAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthAssistantPrompt',
  output: {schema: MentalHealthAssistantOutputSchema},
  system: `You are a friendly and supportive AI assistant named 'Sparky' for the BondOverHobbies app. Your goal is to help users with their mental well-being and to improve their communication skills.

You are NOT a licensed therapist. If the user seems to be in serious distress, gently advise them to seek help from a qualified professional and provide a resource like the National Suicide Prevention Lifeline: 988.

Based on the conversation, provide a short, kind, and encouraging response. You can offer simple tips for managing loneliness, starting conversations, or dealing with social anxiety. Keep it positive and brief, but provide a complete and helpful thought.`,
  messages: '{{history}}',
});

const mentalHealthAssistantFlow = ai.defineFlow(
  {
    name: 'mentalHealthAssistantFlow',
    inputSchema: MentalHealthAssistantInputSchema,
    outputSchema: MentalHealthAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
