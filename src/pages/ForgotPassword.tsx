import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    
    // Front-end only
    toast.success("Please check your email for the reset code.");
    
    
    navigate("/check-email", { state: { email } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 border-b border-border">
        <h1 className="text-2xl font-bold font-display">KFUPM Restaurant</h1>
      </div>
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Link 
            to="/login" 
            className="inline-flex items-center text-accent hover:underline mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          
          <h2 className="text-3xl font-bold font-display mb-4">Forgot password</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Please enter your email to reset the password.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Your Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@dscodetech.com"
                className="h-12 bg-background border-border rounded-lg"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}