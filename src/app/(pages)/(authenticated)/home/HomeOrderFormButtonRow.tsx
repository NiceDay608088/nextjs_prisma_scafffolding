import { Button } from "@/components/ui/button";
import React from "react";

interface HomeOrderFormButtonRowProp {
  createOrder: () => void;
  deleteOrder: () => void;
  searchOrder: () => void;
  clearSearch: () => void;
  userId: number | null;
}

const HomeOrderFormButtonRow = ({
  createOrder,
  deleteOrder,
  searchOrder,
  clearSearch,
  userId,
}: HomeOrderFormButtonRowProp) => {
  return (
    <div className="mt-1 px-4 flex justify-end items-center gap-7">
      <Button
        onClick={searchOrder}
        variant="outline"
        className="px-5 py-[18px]"
        disabled={userId === null}
      >
        Search
      </Button>
      <Button
        onClick={clearSearch}
        variant="outline"
        className="px-5 py-[18px]"
        disabled={userId === null}
      >
        Clear
      </Button>
      <Button
        onClick={createOrder}
        disabled={userId === null}
        className="px-5 py-[18px]"
      >
        Create
      </Button>
      <Button
        onClick={deleteOrder}
        variant="destructive"
        disabled={userId === null}
        className="px-5 py-[18px]"
      >
        Delete
      </Button>
    </div>
  );
};

export default HomeOrderFormButtonRow;
