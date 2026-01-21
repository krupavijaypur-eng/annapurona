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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Demo User" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="user@example.com" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose when you want to be notified about expiring items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="notify-1-day" className="text-base">1 day before expiry</Label>
                    <p className="text-sm text-muted-foreground">Get a notification for items expiring tomorrow.</p>
                </div>
                <Switch id="notify-1-day" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="notify-3-days" className="text-base">3 days before expiry</Label>
                     <p className="text-sm text-muted-foreground">A heads-up for items expiring soon.</p>
                </div>
                <Switch id="notify-3-days" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="notify-7-days" className="text-base">1 week before expiry</Label>
                    <p className="text-sm text-muted-foreground">Plan your meals for the week ahead.</p>
                </div>
                <Switch id="notify-7-days" />
            </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>
            Manage app permissions for features like barcode scanning.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert>
                <Camera className="h-4 w-4" />
                <AlertTitle>Camera Access</AlertTitle>
                <AlertDescription>
                    Annapourna requests camera access to enable barcode scanning and image recognition for quickly adding items to your inventory. We do not store any images or videos without your explicit permission. Your privacy is our priority.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
