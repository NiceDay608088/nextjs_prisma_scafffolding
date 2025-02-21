import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex justify-center mt-20 text-3xl">
      <Button variant="outline" className="py-10 px-10">
        <Link href="/login" className="text-3xl">
          Login
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;
