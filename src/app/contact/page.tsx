'use client';

import { useActionState, useFormStatus } from 'react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Sending...' : 'Send Message'}</Button>;
}

export default function ContactPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (!state.message) return;
    if (state.errors && Object.keys(state.errors).length > 0) {
      toast({
        title: 'Submission Failed',
        description: state.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Message Sent!',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
          <CardDescription>Have questions or comments? We'd love to hear from you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Jane Smith" required aria-describedby="name-error" />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" required aria-describedby="email-error" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your question or comment..." required rows={5} aria-describedby="message-error" />
              <div id="message-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
              </div>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
