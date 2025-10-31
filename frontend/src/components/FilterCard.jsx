import React, { use } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Pune", "Hyderabad", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backende Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1Lakh", "1Lakh to 5Lakh"],
  },
];

export const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState("");
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue)); // Dispatch the selected filter value
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup
        onValueChange={changeHandler}
        value={selectedValue}
        className="mt-3"
      >
        {filterData.map((data, index) => (
          <div key={`filter-${index}`}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div
                  key={`option-${itemId}`}
                  className="flex items-center space-x-2 my-2"
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
