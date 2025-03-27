
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UserProfile from "@/components/dashboard/UserProfile";
import { WalletProvider } from "@/hooks/useWallet";

const Profile = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/90">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in">Your Profile</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl animate-fade-in">
              Track your Knowl Points, achievements, and recent activity on the platform.
            </p>

            <UserProfile />
          </div>
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default Profile;
