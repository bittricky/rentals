# User Roles and Core Functionalities

## User Roles

- **Guest**: A user interested in searching for and booking a rental property.
- **Host**: A user who lists properties for rent.
- **Admin**: A user who oversees platform activity, ensures compliance, and manages conflicts.

## Core Features

### User Management

- **Authentication and Authorization**:
  - Allow users to register and log in via email/password or third-party OAuth providers (Google, Facebook).
  - Email verification and password reset capabilities.

- **Profile Management**:
  - **Guest Profile**: Maintain personal information, booking history, and a list of saved properties.
  - **Host Profile**: Manage personal and business information, property listings, and financial details for payouts.

### Property Listings

- **Property Listing Creation**:
  - **Create Listings**: Hosts can create and manage listings by providing a title, description, location, and photos.
  - **Amenities and Capacity**: Hosts can specify amenities (e.g., Wifi, kitchen access) and maximum guest capacity.
  - **Pricing Details**: Hosts set a nightly, weekly, or monthly rate.

- **Media Upload**:
  - Support image uploads (multiple images per property).
  - Future support for videos to enhance listing visuals.

- **Calendar Management**:
  - Hosts manage the availability of their property through a dedicated calendar.
  - Sync with external calendars (e.g., Google Calendar) via iCal to prevent double bookings.

### Search, Filter, and Discovery

- **Search Bar and Filters**:
  - Allow users to search properties by location, dates, and number of guests.
  - Filters for price range, property type (e.g., house, apartment, shared room), and specific amenities.

- **Map Integration**:
  - Provide a map view for users to visualize the location of properties in search results.
  - Integration with Google Maps or Mapbox for an interactive experience.

### Booking System

- **Booking Workflow**:
  - **Request to Book**: Guests can send a booking request which hosts can either accept or decline.
  - **Instant Booking**: Hosts can choose to enable this feature, allowing guests to book without manual approval.

- **Calendar Integration**:
  - A real-time calendar is used for availability updates. Hosts can manage available dates and see confirmed bookings.

### Payments

- **Secure Payment Integration**:
  - Integrate with Stripe or PayPal to allow guests to pay securely.
  - **Host Payouts**: Facilitate host payouts after successful guest stays, with a clear breakdown of service fees.
  - Support for security deposits, allowing hosts to request a refundable deposit for specific listings.

- **Refunds and Cancellations**:
  - Implement policies for cancellations and refunds, which vary based on host settings (e.g., flexible, moderate, strict).

### Reviews and Ratings

- **Guest Reviews**:
  - Guests can leave ratings and reviews after completing a stay.

- **Host Reviews**:
  - Hosts can leave reviews for guests, focusing on communication, cleanliness, and adherence to house rules.

- **Moderation**:
  - Admins have tools to moderate reviews and remove any that violate platform standards.

### Messaging and Notifications

- **In-App Messaging**:
  - Facilitate communication between guests and hosts before, during, and after a stay.
  - Allow automated message templates for hosts to send quick responses to common questions.

- **Notifications**:
  - Email and in-app notifications for booking requests, approvals, messages, and payment updates.
  - Consider adding SMS notifications for critical updates like booking confirmations.

### Admin Dashboard

- **User Management**:
  - Admins can manage user roles, approve or suspend accounts, and resolve disputes between hosts and guests.

- **Listings Management**:
  - Admins can review new listings, approve or reject them, and manage flagged content.

- **Platform Insights**:
  - Dashboard for platform analytics, such as total bookings, revenue, and active users.
