import { toast } from "sonner";
import { Check, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
}

export const showToast = ({ message, type, duration = 800 }: ToastProps) => {
  return toast(
    <div
      className={`flex items-center gap-4 text-lg ${
        type === "success" ? "text-green-600" : "text-red-500"
      }`}
    >
      <span>
        {type === "success" ? <Check size={25} /> : <AlertTriangle size={25} />}
      </span>
      <span>{message}</span>
    </div>,
    {
      duration,
    }
  );
};
