import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Annapourna!</CardTitle>
        <CardDescription>
          Your smart kitchen assistant is ready.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>The application is now stable. You can start adding features back.</p>
      </CardContent>
    </Card>
  );
}
