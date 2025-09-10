'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Client-side validation
    const newErrors: FormErrors = {};
    if (!name || name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!email || !email.includes('@')) {
      newErrors.email = 'Invalid email address.';
    }
    if (!message || message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast({
        title: 'Submission Failed',
        description: 'Please check your entries.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Contact Form Data:', { name, email, message });
      
      toast({
        title: 'Message Sent!',
        description: 'Your message has been sent successfully!',
      });
      
      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
          <CardDescription>Have questions or comments? We'd love to hear from you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Jane Smith" required aria-describedby="name-error" />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" required aria-describedby="email-error" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your question or comment..." required rows={5} aria-describedby="message-error" />
              <div id="message-error" aria-live="polite" aria-atomic="true">
                {errors.message && <p className="text-sm font-medium text-destructive">{errors.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
