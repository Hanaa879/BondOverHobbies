// src/ai/flows/personalized-hobby-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized hobby recommendations based on user interests and preferences.
 *
 * - personalizedHobbyRecommendations - A function that returns a list of personalized hobby recommendations.
 * - PersonalizedHobbyRecommendationsInput - The input type for the personalizedHobbyRecommendations function.
 * - PersonalizedHobbyRecommendationsOutput - The return type for the personalizedHobbyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHobbyRecommendationsInputSchema = z.object({
  interests: z
    .string()
    .describe('A comma-separated list of the user interests and preferences.'),
});
export type PersonalizedHobbyRecommendationsInput = z.infer<
  typeof PersonalizedHobbyRecommendationsInputSchema
>;

const PersonalizedHobbyRecommendationsOutputSchema = z.object({
  hobbies: z
    .string()
    .describe(
      'A comma-separated list of personalized hobby recommendations based on the user interests.'
    ),
});
export type PersonalizedHobbyRecommendationsOutput = z.infer<
  typeof PersonalizedHobbyRecommendationsOutputSchema
>;

export async function personalizedHobbyRecommendations(
  input: PersonalizedHobbyRecommendationsInput
): Promise<PersonalizedHobbyRecommendationsOutput> {
  return personalizedHobbyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHobbyRecommendationsPrompt',
  input: {schema: PersonalizedHobbyRecommendationsInputSchema},
  output: {schema: PersonalizedHobbyRecommendationsOutputSchema},
  prompt: `You are an expert hobby recommendation agent. Given a user's interests and preferences, you will recommend a list of hobbies that the user might enjoy.

Interests: {{{interests}}}

Hobbies:`,
});

const personalizedHobbyRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHobbyRecommendationsFlow',
    inputSchema: PersonalizedHobbyRecommendationsInputSchema,
    outputSchema: PersonalizedHobbyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
