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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getPersonalizedFoodWasteTips } from '@/ai/flows/personalized-food-waste-tips';
import { Lightbulb, Loader2 } from 'lucide-react';

export default function TipsPage() {
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTips = async () => {
    setIsLoading(true);
    setError(null);
    setTips([]);

    try {
      // In a real app, this data would be dynamically generated based on user activity.
      const mockInput = {
        consumptionPatterns: 'User often buys fresh vegetables like spinach and tomatoes but sometimes they expire before use. Milk is also occasionally wasted.',
      };

      const result = await getPersonalizedFoodWasteTips(mockInput);
      setTips(result.tips);
    } catch (e) {
      setError('Failed to generate tips. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Food Waste Reduction Tips</CardTitle>
          <CardDescription>
            Get personalized tips to help you reduce food waste, save money, and be more sustainable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateTips} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Tips...
              </>
            ) : (
              'Get My Personalized Tips'
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription className="text-destructive">{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {tips.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Your Personalized Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {tips.map((tip, index) => (
                <Alert key={index}>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Tip #{index + 1}</AlertTitle>
                    <AlertDescription>{tip}</AlertDescription>
                </Alert>
            ))}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
