
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  categories: string[];
  categoryLabels: Record<string, string>;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  currentFilter, 
  onFilterChange, 
  categories,
  categoryLabels
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium text-gray-700 flex items-center">
        <Filter className="h-4 w-4 mr-2" /> Filter:
      </span>
      <Button 
        variant={currentFilter === "all" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onFilterChange("all")}
        className={currentFilter === "all" ? "bg-green-600 hover:bg-green-700" : ""}
      >
        Semua
      </Button>
      {categories.map((category) => (
        <Button 
          key={category}
          variant={currentFilter === category ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange(category)}
          className={currentFilter === category ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {categoryLabels[category] || category}
        </Button>
      ))}
    </div>
  );
};

export default FilterBar;
