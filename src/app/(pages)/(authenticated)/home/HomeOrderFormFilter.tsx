import React from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { HomeOrderFilterType } from "./HomeOrderForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CATEGORIES_OPTIONS } from "@/utils/constants";

interface HomeOrderFormFilterType {
  filter: HomeOrderFilterType;
  setFilter: React.Dispatch<React.SetStateAction<HomeOrderFilterType>>;
  username: string | null;
}

const HomeOrderFormFilter = ({
  filter,
  setFilter,
  username,
}: HomeOrderFormFilterType) => {
  console.log("username", { username });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div className="w-32 text-right pr-6">User:</div>
        <div className="flex-1">
          {username ?? (
            <span className="text-red-500">
              Please select an user from user list in left panel.
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-32 text-right pr-6">Name:</div>
        <div className="flex-1">
          <Input
            disabled={!username}
            value={filter.orderName}
            onChange={(e) =>
              setFilter((prev: HomeOrderFilterType) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-32 text-right pr-6">Categories:</div>
        <div className="flex-1">
          <MultiSelect
            disabled={!username}
            options={CATEGORIES_OPTIONS}
            onValueChange={(e) =>
              setFilter((prev: HomeOrderFilterType) => ({
                ...prev,
                categories: e,
              }))
            }
            defaultValue={filter.categories}
            placeholder="Select Category"
            variant="secondary"
            animation={2}
            maxCount={3}
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-32 text-right pr-6">Created On:</div>
        <div className="flex-1 flex items-center">
          <div className="grid gap-2 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="justify-start text-left font-normal"
                  disabled={!username}
                >
                  <CalendarIcon />
                  {filter.cDateFrom ? (
                    filter.cDateTo ? (
                      <>
                        {format(filter.cDateFrom, "LLL dd, y")} -{" "}
                        {format(filter.cDateTo, "LLL dd, y")}
                      </>
                    ) : (
                      format(filter.cDateFrom, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filter.cDateFrom}
                  selected={{ from: filter.cDateFrom, to: filter.cDateTo }}
                  onSelect={(date: DateRange | undefined) => {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      cDateFrom: date?.from,
                      cDateTo: date?.to,
                    }));
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-32 text-right pr-6">Amount:</div>
        <div className="flex-1">
          <div className="flex items-center">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="min"
                disabled={!username}
                value={filter.minAmount === null ? "" : filter.minAmount}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    minAmount: parseFloat(e.target.value),
                  }));
                }}
              />
            </div>
            <div className="w-10 text-center"> - </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="max"
                disabled={!username}
                value={filter.maxAmount === null ? "" : filter.maxAmount}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    maxAmount: parseFloat(e.target.value),
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-32 text-right pr-6">Labels:</div>
        <div className="flex-1">
          <Input
            placeholder="multiple labels seperated by comma"
            value={filter.labels.join(",")}
            disabled={!username}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                labels: e.target.value.split(","),
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeOrderFormFilter;
