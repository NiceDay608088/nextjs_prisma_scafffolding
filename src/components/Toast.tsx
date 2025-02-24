import { toast } from "sonner";
import { Check, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
}

export const showToast = ({ message, type, duration = 8800 }: ToastProps) => {
  return toast(
    <div
      className={`flex items-center gap-5 tex-xl ${
        type === "success" ? "text-green-500" : "text-red-500"
      }`}
    >
      <span>
        {type === "success" ? <Check size={25} /> : <AlertTriangle />}
      </span>
      <span>{message}</span>
    </div>,
    {
      duration,
    }
  );
};
