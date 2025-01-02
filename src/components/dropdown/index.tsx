import React, { useState } from "react";
import { Select, Avatar, Input, message } from "antd";

interface Option {
  value: string;
  label: string;
  icon: string;
  proportion: number;
}

const initialOptions: Option[] = [
  {
    value: "uniswap1",
    label: "Uniswap",
    icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    proportion: 0,
  },
  {
    value: "ghost",
    label: "Ghost",
    icon: "https://cryptologos.cc/logos/ghost-logo.png",
    proportion: 0,
  },
  {
    value: "maker",
    label: "Maker",
    icon: "https://cryptologos.cc/logos/maker-mkr-logo.png",
    proportion: 0,
  },
  {
    value: "other",
    label: "Other",
    icon: "https://cryptologos.cc/logos/other-logo.png",
    proportion: 0,
  },
];

const CustomSelect: React.FC = () => {
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const getTotalProportion = () =>
    options.reduce((sum, option) => sum + option.proportion, 0);

  const handleProportionChange = (value: string, proportion: number) => {
    console.log("value", value);
    console.log("proportion", proportion);
    const totalProportion = getTotalProportion();
    const currentOption = options.find((option) => option.value === value);

    // Calculate the total proportion after the change
    const newTotal = totalProportion - (currentOption?.proportion || 0) + proportion;

    if (newTotal > 100) {
      message.error("Total proportion cannot exceed 100%");
      return;
    }

    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === value ? { ...option, proportion } : option
      )
    );
  };

  const handleProportionSubmit = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    if (option && option.proportion > 0 && !selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleDeselect = (value: string) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== value));
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === value ? { ...option, proportion: 0 } : option
      )
    );
  };

  const handleOptionClick = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    if (option && option.proportion > 0) {
      if (!selectedOptions.includes(value)) {
        setSelectedOptions([...selectedOptions, value]);
      }
    }
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <Select
        mode="multiple"
        value={selectedOptions}
        style={{ width: "100%" }}
        dropdownStyle={{
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          padding: "10px",
        }}
        onDeselect={handleDeselect}
        options={options.map((option) => ({
          value: option.value,
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Avatar src={option.icon} size="small" />
              <span>
                {option.label} - {option.proportion}%
              </span>
            </div>
          ),
        }))}
        dropdownRender={() => (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#1a1a1a",
              borderRadius: "8px",
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  padding: "4px",
                  borderBottom: "1px solid #333",
                  cursor: "pointer",
                }}
                onClick={() => handleOptionClick(option.value)}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar src={option.icon} size="small" />
                  <span>{option.label}</span>
                </div>
                <Input
                  type="number"
                  placeholder="Enter %"
                  value={option.proportion}
                  onChange={(e) =>
                    handleProportionChange(option.value, Number(e.target.value))
                  }
                  onPressEnter={() => handleProportionSubmit(option.value)}
                  style={{
                    width: "80px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            ))}
          </div>
        )}
        optionLabelProp="label"
      />
    </div>
  );
};

export default CustomSelect;
