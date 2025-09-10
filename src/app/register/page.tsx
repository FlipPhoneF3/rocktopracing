'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormErrors {
  name?: string;
  email?: string;
}

export default function RegisterPage() {
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

    // Client-side validation
    const newErrors: FormErrors = {};
    if (!name || name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!email || !email.includes('@')) {
      newErrors.email = 'Invalid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast({
        title: 'Registration Failed',
        description: 'Please check your entries.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Registration Data:', { name, email });
      
      toast({
        title: 'Registration Successful!',
        description: `Successfully registered ${name}! A confirmation has been sent to ${email}.`,
      });
      
      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: 'Registration Failed',
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
          <CardTitle className="font-headline text-3xl">Race Registration</CardTitle>
          <CardDescription>Fill out the form below to secure your spot in the race.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required aria-describedby="name-error"/>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required aria-describedby="email-error"/>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
