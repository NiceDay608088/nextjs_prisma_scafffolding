import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

interface PagingContainerProp {
  pages: number;
  totalCount: number;
  currentPage: number;
  onSelect: (page: number) => void;
}

const PagingContainer = ({
  pages,
  totalCount,
  currentPage,
  onSelect,
}: PagingContainerProp) => {
  const isPrevDisabled = currentPage == 1 || pages <= 1;
  const isNextDisabled = pages == currentPage;

  if (pages == 0) {
    return (
      <div className="flex items-center justify-center h-6 text-sm">
        No record
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end h-6">
      <span className="text-sm mr-1">Total {totalCount} items</span>
      <li
        className={`text-sm w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 ${
          isPrevDisabled && " text-gray-400 hover:cursor-default"
        }`}
        onClick={() => {
          if (isPrevDisabled) return;
          onSelect(1);
        }}
      >
        <ChevronsLeft size={16} />
      </li>
      <li
        className={`text-sm w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 ${
          isPrevDisabled && " text-gray-400 hover:cursor-default"
        }`}
        onClick={() => {
          if (isPrevDisabled) return;
          onSelect(currentPage - 1);
        }}
      >
        <ChevronLeft size={16} />
      </li>
      <span className="text-sm mx-1">
        {currentPage} of {pages}
      </span>
      <li
        className={`text-sm w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 ${
          isNextDisabled && " text-gray-400 hover:cursor-default"
        }`}
        onClick={() => {
          if (isNextDisabled) return;
          onSelect(currentPage + 1);
        }}
      >
        <ChevronRight size={16} />
      </li>
      <li
        className={`text-sm w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 ${
          isNextDisabled && " text-gray-400 hover:cursor-default"
        }`}
        onClick={() => {
          if (isNextDisabled) return;
          onSelect(pages);
        }}
      >
        <ChevronsRight size={16} />
      </li>
    </div>
  );
};

export default PagingContainer;
