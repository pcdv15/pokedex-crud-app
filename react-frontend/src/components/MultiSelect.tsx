import typeColors from "@app/common/constants";
import { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  onSelectionChange: (selectedValues: string[]) => void;
}

const MultiSelect = ({ options, onSelectionChange }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const onSelectionChangeRef = useRef(onSelectionChange);

  const toggleOption = (optionValue: string) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((value) => value !== optionValue)
      );
    } else if (selectedOptions.length < 2) {
      setSelectedOptions((prevSelected) => [...prevSelected, optionValue]);
    }
  };

  useEffect(() => {
    onSelectionChangeRef.current(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="mt-2 text-center select-none">
      {options.map((option) => (
        <label key={option.value} className="option space-x-2">
          <input
            className="appearance-none"
            type="checkbox"
            value={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={() => toggleOption(option.value)}
          />
          <span
            className="multi-select text-xs font-mono p-[2px]"
            style={{ backgroundColor: typeColors[`${option.value}`] }}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelect;
