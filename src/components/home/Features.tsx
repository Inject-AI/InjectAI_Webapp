
import { BarChart3, Brain, MessageSquare, Shield, Trophy, Wallet } from "lucide-react";
import React from "react";
import BlurredCard from "../ui/BlurredCard";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Real-Time Market Insights",
    description: "Access live aggregated Injective blockchain data, including prices, volumes, and trends, all analyzed in real-time.",
    icon: BarChart3,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "AI-Powered Chatbot",
    description: "Get immediate answers to your crypto questions from our state-of-the-art language model, trained on blockchain data.",
    icon: MessageSquare,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Knowl Points System",
    description: "Earn Knowl Points with every interaction, building your expertise profile and unlocking premium features.",
    icon: Trophy,
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    title: "Keplr Wallet Integration",
    description: "Connect securely using Keplr Wallet, ensuring your data and transactions are protected on the Injective blockchain.",
    icon: Wallet,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "AI-Generated Token Reports",
    description: "Receive detailed, AI-generated market reports on token performance, trading volumes, and potential market movements.",
    icon: Brain,
    color: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    title: "DAO Voting Insights",
    description: "Get AI-powered analysis of DAO proposals on Injective, with clear pros and cons to help you make informed governance decisions.",
    icon: Shield,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 left-0 w-full h-[500px] bg-gradient-radial from-primary/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 animate-fade-in">
            Cutting-Edge Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Our platform combines the latest advancements in artificial intelligence with 
            blockchain technology to deliver unparalleled crypto insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <BlurredCard
              key={feature.title}
              className="p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("p-3 rounded-lg w-fit mb-4", feature.color)}>
                <feature.icon className={cn("h-6 w-6", feature.iconColor)} />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </BlurredCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
