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
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const { auth } = useFirebase();
  const router = useRouter();
  const { t } = useLanguage();

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
            setError(t('login.error.emailPasswordRequired'));
            return;
        }
        await handleEmailSignIn(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError(t('login.error.invalidCredential'));
        setActiveTab('signup');
      } else {
        setError(t('login.error.signInGeneric'));
      }
    }
  };

  const onSignUp = async () => {
    setError(null);
    try {
        if (!email || !password) {
            setError(t('login.error.emailPasswordRequired'));
            return;
        }
      await handleEmailSignUp(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError(t('signup.error.emailExists'));
        setActiveTab('login');
      } else if (err.code === 'auth/weak-password') {
        setError(t('signup.error.weakPassword'));
      } else {
        setError(t('signup.error.signUpGeneric'));
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
                <TabsTrigger value="login">{t('login.login')}</TabsTrigger>
                <TabsTrigger value="signup">{t('signup.signup')}</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                <Card>
                    <CardHeader>
                    <CardTitle>{t('login.welcome')}</CardTitle>
                    <CardDescription>
                        {t('login.description')}
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login-email">{t('login.email')}</Label>
                        <Input id="login-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="login-password">{t('login.password')}</Label>
                        <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button onClick={() => onSignIn('email')} className="w-full">{t('login.login')}</Button>
                     <Button variant="outline" className="w-full" onClick={() => onSignIn('google')}>
                        {t('login.google')}
                    </Button>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="signup">
                <Card>
                    <CardHeader>
                    <CardTitle>{t('signup.title')}</CardTitle>
                    <CardDescription>
                        {t('signup.description')}
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="signup-email">{t('login.email')}</Label>
                        <Input id="signup-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="signup-password">{t('login.password')}</Label>
                        <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button onClick={onSignUp} className="w-full">{t('signup.signup')}</Button>
                     <Button variant="outline" className="w-full" onClick={() => onSignIn('google')}>
                        {t('signup.google')}
                    </Button>
                    </CardContent>
                </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
