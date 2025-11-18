import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

export function CheckEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "contact@dscode...com";
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 5) {
      toast.error("Please enter the complete 5-digit code.");
      return;
    }
    
    // Front-end only - accept any 5-digit code
    toast.success("Redirecting to set new password...");
    
    navigate("/set-new-password", { state: { email } });
  };

  const handleResend = () => {
    toast.success("A new verification code has been sent to your email.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 border-b border-border">
        <h1 className="text-2xl font-bold font-display">KFUPM Restaurant</h1>
      </div>
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Link 
            to="/forgot-password" 
            className="inline-flex items-center text-accent hover:underline mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          
          <h2 className="text-3xl font-bold font-display mb-4">Check your email</h2>
          <p className="text-muted-foreground text-sm mb-8">
            We sent a reset link to{" "}
            <span className="text-accent font-medium">{email}</span>
            {" "}enter 5 digit code that mentioned in the email
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              <InputOTP
                maxLength={5}
                value={code}
                onChange={setCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
            >
              Verify Code
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Haven't got the email yet?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-accent hover:underline font-medium"
              >
                Resend email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}