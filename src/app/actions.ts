'use server';

import { z } from 'zod';
import { generateMarketingCopy as generateMarketingCopyFlow, type GenerateMarketingCopyInput } from '@/ai/flows/generate-marketing-copy';

const RegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
});

const ContactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function registerForRace(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = RegistrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your entries.',
    };
  }

  // Here you would post to a webhook, e.g., to a Google Sheet.
  // For this example, we'll just simulate success.
  console.log('Registration Data:', validatedFields.data);

  return { message: `Successfully registered ${validatedFields.data.name}! A confirmation has been sent to ${validatedFields.data.email}.`, errors: {} };
}


export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please check your entries.',
        };
    }

    // Here you would post to a webhook.
    console.log('Contact Form Data:', validatedFields.data);

    return { message: 'Your message has been sent successfully!', errors: {} };
}

export async function generateMarketingCopy(input: GenerateMarketingCopyInput) {
    try {
        const result = await generateMarketingCopyFlow(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate marketing copy. Please try again later.' };
    }
}
