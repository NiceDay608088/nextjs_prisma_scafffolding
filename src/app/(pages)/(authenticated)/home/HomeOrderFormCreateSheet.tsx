import React from "react";

const HomeOrderFormCreateSheet = () => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      {/* You can remove SheetTrigger if you're using custom functions */}
      <SheetTrigger asChild>
        <Button className="hidden">Hidden Trigger</Button>
      </SheetTrigger>
      <SheetContent>
        <h2 className="text-lg font-bold">Sheet Content</h2>
        <p>This is a programmatically triggered sheet.</p>
        <Button onClick={closeSheet} className="mt-4">
          Close Sheet
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default HomeOrderFormCreateSheet;
