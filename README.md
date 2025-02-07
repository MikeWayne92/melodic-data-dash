Spotify Listening Analysis Dashboard
A web application that allows users to visualize and analyze their Spotify listening history through an elegant neomorphic interface.

Features

Data Upload: Upload your Spotify streaming history JSON file
Interactive Statistics:
Total listening time
Top artists with play counts
Top tracks with play counts
Music Player:
Embedded Spotify player for track previews
Real-time music visualizer
Playback controls
Customizable Analysis:
Adjustable time range (1-365 days)
Minimum play count filter
Multiple display modes (artists/tracks/time)
Getting Started

Prerequisites

Node.js & npm installed
Your Spotify listening history data (JSON format)
Can be requested from Spotify through your account settings
Installation and Setup


# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
Technologies Used

Frontend Framework: React with TypeScript
Styling:
Tailwind CSS
Neomorphic design system
Build Tool: Vite
UI Components: shadcn-ui
Visualization: Canvas-based music visualizer
Music Integration: Spotify Web Playback SDK
How to Use

Upload Data:
Export your Spotify listening history from your Spotify account
Drag and drop the JSON file into the upload zone
View Statistics:
See your total listening time
Browse your top artists and tracks
Click on tracks to play them in the embedded player
Customize Analysis:
Adjust the time range slider
Set minimum play count
Switch between different display modes
Development

This project was built with Lovable. You can edit it in several ways:

Use the Lovable interface
Clone and edit locally
Edit directly on GitHub
Use GitHub Codespaces
Deployment

Deploy your application using one of these methods:

Use Lovable's built-in deployment (Share -> Publish)
Deploy to Netlify for custom domain support
Custom Domain Setup

For custom domain deployment, we recommend using Netlify. See our Custom domains documentation for detailed instructions.

Contributing

Feel free to submit issues and enhancement requests!
