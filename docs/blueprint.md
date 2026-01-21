# **App Name**: Annapourna

## Core Features:

- Manual Inventory Entry: Users can manually add food items to their inventory, specifying details such as name, quantity, storage location (fridge, freezer, pantry), and expiry date.
- Barcode/Image Scanning: Users can scan barcodes or take pictures of food items to automatically populate item details, reducing manual entry effort. The camera is accessed to enable barcode scanning.
- Expiry Date Tracking & Notifications: The app tracks the expiry dates of all inventoried items and sends timely notifications to users about items expiring soon, helping prevent spoilage. These can be configured via profile.
- Recipe Suggestion: Based on available ingredients and their expiry dates, the app suggests recipes. It prioritizes using items that are closest to expiring to minimize food waste.
- Smart Shopping List Generation: The app automatically generates a shopping list based on missing items from the user's inventory, ensuring they only buy what they need.
- Food Waste Reduction Tips: Based on consumption patterns and expiry data, the app provides users with simple, actionable tips to reduce food waste. It uses a tool to decide which tips are most relevant based on usage patterns.
- Offline Support: Allow basic inventory viewing and shopping list management when the device is offline.
- Database storage: Uses Firestore to allow storage and synchronization of data to all devices.

## Style Guidelines:

- Primary color: Earthy Green (#8FBC8F) for a natural and fresh feel, suggestive of organic produce.
- Background color: Very Light Grey (#F5F5F5) to provide a clean, unobtrusive backdrop that emphasizes the food images and UI elements.
- Accent color: Muted Orange (#D2691E) for call-to-action buttons and highlights, providing warmth and signifying urgency (especially for expiring items).
- Body and headline font: 'PT Sans' (sans-serif) combines modern, readable design with a touch of warmth suitable for the application.
- Use clean, minimalist icons to represent different food categories, storage locations, and actions. Aim for icons that are universally recognizable and easy to understand in the Indian context.
- Emphasize a simple, intuitive layout with clear visual hierarchy. Use card-based design for inventory items to make information scannable.
- Incorporate subtle animations for transitions and interactions, such as adding items, swiping to delete, or refreshing the shopping list. Avoid excessive animations that might slow down the user experience.