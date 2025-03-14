# Social Media App

This is a full-stack social media application built with Next.js 15, TailwindCSS, Neon DB, Prisma ORM, and Clerk for authentication. It features a responsive, dynamic, and fully interactive user experience, supporting posts, comments, likes, stories, follow requests, and more.

## Tech Stack

- Frontend: Next.js 15, TailwindCSS
- Backend: Server Actions, Prisma ORM
- Database: Neon DB (PostgreSQL)
- Authentication: Clerk
- File Upload: Cloudinary

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- Responsive Layout: Fully optimized for desktop and mobile devices.
- Clerk Authentication: Seamless user authentication and management.
- Home Page: Dynamic and responsive feed.
- Stories: Post and view disappearing stories.
- Post Management: Add, update, and delete posts with images.
- Post Interactions: Like and comment on posts.
- Commenting System: Nested comments and replies.
- Profile Page: User profile with dynamic data.
- RightBar & LeftBar: Additional user info and navigation.
- Progress bar for viewing stories.
- Navigate between stories.
- Visual indicators for seen stories.
- Restrict seen list visibility to the story owner.
- Choose specific users who can view a story.
- Search and add users to visibility list.
- Add and view nested comment replies.
- Optimistic UI for instant updates.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Schema

Built with Prisma and Neon DB (PostgreSQL), the schema includes models for users, posts, comments, likes, stories, followers, and more.

Key Models:
- User: Stores user profile and relationship data.
- Post: Contains post content, images, and interactions.
- Comment: Supports nested replies and likes.
- Like: Tracks likes on posts and comments.
- Follower, FollowRequest, Block: Manages user relationships.
- Story, StoryViews, StoryVisibility: Handles stories and visibility setting

## Installation & Setup

1. Clone the repository:
   <pre>git clone https://github.com/moeedrafi/social-media-app.git
         cd social-media-app</pre>
3. 
