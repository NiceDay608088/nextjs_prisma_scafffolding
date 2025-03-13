import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface HookErrorMessage {
  error: Merge<FieldError, (FieldError | undefined)[]> | FieldError | undefined;
}

interface ErrorMessageProp {
  message?: string;
}

const isFieldError = (err: any): err is FieldError => {
  return typeof err === "object" && err !== null && "message" in err;
};

const isFieldErrorsImpl = (err: any): err is FieldErrorsImpl<any> => {
  return typeof err === "object" && err !== null && "types" in err;
};

const getErrorMessage = (
  error:
    | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{}>> | undefined)[]>
    | FieldError
    | undefined
): string | undefined => {
  if (!error) return undefined;

  if (Array.isArray(error)) {
    return error
      .map((err) => {
        if (err && isFieldError(err)) return err.message;
        return undefined;
      })
      .filter(Boolean)
      .join(", ");
  }

  if (isFieldError(error)) {
    return error.message;
  }

  if (isFieldErrorsImpl(error)) {
    return Object.values(error)
      .map((err) => err?.message)
      .filter(Boolean)
      .join(", ");
  }

  return undefined;
};

export const HookErrorMessage = ({
  error,
}: {
  error:
    | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{}>> | undefined)[]>
    | FieldError
    | undefined;
}) => {
  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex items-center h-7 text-sm text-red-500">
      {errorMessage}
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
