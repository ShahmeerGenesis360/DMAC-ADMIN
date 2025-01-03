import React, { useState } from "react";
import { Avatar, Flex, message } from "antd";
import { DropdownOption, DropdownOptions, InputNumber, StyledSelect, Text } from "./styles";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleDeselect = (value: string | unknown) => {
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
    <Flex>
      <StyledSelect
        placeholder="Allocations"
        mode="multiple"
        value={selectedOptions}
        dropdownStyle={{
          backgroundColor: "#242931",
          borderRadius: "20px",
          padding: "0px",
        }}
        onDeselect={handleDeselect}
        options={options.map((option) => ({
          value: option.value,
          label: (
            <Flex gap={10} align="center" >
              <Avatar src={option.icon} size="small" />
              <Text>
                {option.label} - {option.proportion}%
              </Text>
            </Flex>
          ),
        }))}
        dropdownRender={() => (
          <DropdownOptions>
            {options.map((option) => (
              <DropdownOption
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                <Flex gap={10} align="center" >
                  <Avatar src={option.icon} size="large" />
                  <Text>{option.label}</Text>
                </Flex>
                <InputNumber
                  type="number"
                  placeholder="Enter %"
                  value={option.proportion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProportionChange(option.value, Number(e.target.value))
                  }
                  onPressEnter={() => handleProportionSubmit(option.value)}
                />
              </DropdownOption>
            ))}
          </DropdownOptions>
        )}
        optionLabelProp="label"
        suffixIcon={isDropdownOpen ? <UpOutlined /> : <DownOutlined />} // Toggle icon
        onDropdownVisibleChange={(open: boolean) => setIsDropdownOpen(open)} // Track dropdown visibility
      />
    </Flex>
  );
};

export default CustomSelect;
