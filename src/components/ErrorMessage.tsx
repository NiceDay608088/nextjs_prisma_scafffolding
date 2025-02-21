import React from "react";
import { FieldError } from "react-hook-form";

interface HookErrorMessage {
  error: FieldError | undefined;
}

interface ErrorMessageProp {
  message: string;
}

export const HookErrorMessage = ({ error }: HookErrorMessage) => {
  return (
    <div className="flex items-center h-7 text-sm text-red-500">
      {error && error.message}
    </div>
  );
};

export const ErrorMessage = ({ message }: ErrorMessageProp) => {
  return (
    <div className="flex items-center min-h- mt-1 text-sm text-red-500">
      {message}
    </div>
  );
};
