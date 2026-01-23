'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFirebase } from '@/firebase';
import { handleEmailSignUp, handleEmailSignIn, handleGoogleSignIn } from '@/firebase/auth/actions';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const { auth } = useFirebase();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('login');

  const onSignIn = async (provider: 'google' | 'email') => {
    setError(null);
    try {
      if (provider === 'google') {
        await handleGoogleSignIn(auth);
      } else {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        await handleEmailSignIn(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError("Incorrect email or password. Please try again or sign up.");
        setActiveTab('signup');
      } else {
        setError("An error occurred during sign-in. Please try again.");
      }
    }
  };

  const onSignUp = async () => {
    setError(null);
    try {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
      await handleEmailSignUp(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("An account with this email already exists. Please log in instead.");
        setActiveTab('login');
      } else if (err.code === 'auth/weak-password') {
        setError("The password is too weak. Please use at least 6 characters.");
      } else {
        setError("An error occurred during sign-up. Please try again.");
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(null); // Clear errors when switching tabs
    setEmail('');
    setPassword('');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
                <Logo className="size-12" />
            </div>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                <Card>
                    <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to manage your kitchen inventory.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button onClick={() => onSignIn('email')} className="w-full">Log In</Button>
                     <Button variant="outline" className="w-full" onClick={() => onSignIn('google')}>
                        Sign In with Google
                    </Button>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="signup">
                <Card>
                    <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                        Get started with smart inventory management.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button onClick={onSignUp} className="w-full">Sign Up</Button>
                     <Button variant="outline" className="w-full" onClick={() => onSignIn('google')}>
                        Sign Up with Google
                    </Button>
                    </CardContent>
                </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
