import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const css = `
@keyframes flashPulse {
  0%,
  100% {
    background-color: blue;
    opacity: 1;
  }
  50% {
    background-color: brown;
    opacity: 0.4;
  }
}

.progressBar {
  animation: flashPulse 1.7s infinite;
}

`;

interface ProgressBarContextType {
  startProgress: () => void;
  stopProgress: () => void;
  isProgressing: boolean;
}

const ProgressBarContext = createContext<ProgressBarContextType | undefined>(
  undefined
);

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
  const [isProgressing, setIsProgressing] = useState<boolean>(false);

  const startProgress = () => {
    setIsProgressing(true);
  };

  const stopProgress = () => {
    setIsProgressing(false);
  };

  return (
    <ProgressBarContext.Provider
      value={{ startProgress, stopProgress, isProgressing }}
    >
      {children}
    </ProgressBarContext.Provider>
  );
};

const useProgressBar = () => {
  const context = useContext(ProgressBarContext);
  if (!context) {
    throw new Error("useProgressBar must be used within a ProgressBarProvider");
  }
  return context;
};

const ProgressBar = () => {
  const { isProgressing } = useProgressBar();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!isProgressing && percentage == 0) return;

    const intervalId = setInterval(() => {
      setPercentage((prev) => {
        if (isProgressing && prev > 90) {
          return prev;
        }

        if (!isProgressing && prev >= 105) {
          clearInterval(intervalId!);
          setPercentage(0);
        }

        return prev + 1;
      });
    }, 1);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isProgressing]);

  if (!isProgressing && percentage === 0) return <></>;

  return (
    <>
      <style>{css}</style>
      <div
        className={`fixed top-0 left-0 h-1 progressBar`}
        style={{ width: `${percentage}%` }}
      ></div>
    </>
  );
};

export { ProgressBarProvider, ProgressBar, useProgressBar };
