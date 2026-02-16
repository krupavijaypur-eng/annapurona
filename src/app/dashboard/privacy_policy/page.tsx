'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information while using the
            Grocery Management System.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-sm leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect basic user information such as email address and
              authentication details when you sign in. Grocery items,
              shopping lists, and preferences you add are stored securely
              in our database.
            </p>
          </section>

          <Separator />

          {/* Section 2 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              The collected information is used only to provide core
              application functionality including managing grocery lists,
              syncing data across devices, and improving user experience.
            </p>
          </section>

          <Separator />

          {/* Section 3 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              3. Data Storage & Security
            </h2>
            <p>
              Your data is securely stored using Firebase services.
              Authentication and database access are protected using
              industry-standard security practices. We do not sell or
              share your personal data with third parties.
            </p>
          </section>

          <Separator />

          {/* Section 4 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              4. User Responsibility
            </h2>
            <p>
              Users are responsible for maintaining the confidentiality of
              their login credentials. Please ensure you log out from
              shared devices.
            </p>
          </section>

          <Separator />

          {/* Section 5 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              5. Third-Party Services
            </h2>
            <p>
              This application uses Firebase for authentication and data
              storage. These services may collect limited technical data
              as governed by their respective privacy policies.
            </p>
          </section>

          <Separator />

          {/* Section 6 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Any changes
              will be reflected on this page with an updated revision
              date.
            </p>
          </section>

          <Separator />

          {/* Section 7 */}
          <section>
            <h2 className="font-semibold text-base mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have questions regarding this Privacy Policy, please
              contact the project administrator through the application
              repository or support channel.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
