import React, { useState } from "react";
import { Avatar, Flex, message } from "antd";
import { DropdownOption, DropdownOptions, InputNumber, StyledSelect, Text } from "./styles";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";



interface IProps {
  setAllocation: (item: boolean) => void
  selectedOptions: string[];
  setSelectedOptions: (item: string[]) => void;
  options: Option[];
  setOptions: (item: Option[]) => void;
}

const CustomSelect: React.FC<IProps> = ({ selectedOptions, setSelectedOptions, setOptions, options, setAllocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getTotalProportion = () =>
    options.reduce((sum, option) => sum + option.proportion, 0);

  const handleProportionChange = (value: string, proportion: number) => {
    const totalProportion = getTotalProportion();
    const currentOption = options.find((option) => option.value === value);
    const newTotal = totalProportion - (currentOption?.proportion || 0) + proportion;

    if (newTotal > 100) {
      message.error("Total proportion cannot exceed 100%");
      return;
    }

    setOptions(
      options.map((option) =>
        option.value === value ? { ...option, proportion } : option
      )
    );
  };

  const handleProportionSubmit = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    if (option && option.proportion > 0 && !selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
    setSearchTerm("");
  };

  const handleDeselect = (value: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== value));
    setOptions(
      options.map((option) =>
        option.value === value ? { ...option, proportion: 0 } : option
      )
    );
  };

  const handleOptionClick = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    if (option && option.proportion > 0 && !selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
    // setSearchTerm("");
  };

  // Filter options based on searchTerm
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchTerm, "searchTerm")

  return (
    <Flex>
      <StyledSelect
        onSelect={() => setAllocation(true)}
        placeholder="Allocations"
        mode="multiple"
        value={selectedOptions}
        open={false}
        showSearch
        searchValue={searchTerm}
        onSearch={(value) => setSearchTerm(value)} // Capture search input
        filterOption={false} // Disable default filter (we handle it manually)
        dropdownStyle={{
          backgroundColor: "#242931",
          borderRadius: "20px",
          padding: "0px",
        }}
        options={filteredOptions.map((option) => ({
          value: option.value,
          label: (
            <Flex gap={10} align="center">
              <Avatar src={option.icon} size="small" />
              <Text>{option.label} -</Text>
              <InputNumber
                type="number"
                suffix={"%"}
                placeholder="Enter %"
                value={option.proportion}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.stopPropagation()
                  handleProportionChange(option.value, Number(e.target.value))
                }
                }
                onPressEnter={() => handleProportionSubmit(option.value)}
              />
              <CloseOutlined
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeselect(option.value)
                }} />
            </Flex>
          ),
        }))}
        dropdownRender={() => (
          <DropdownOptions>
            {filteredOptions.map((option) => (
              <DropdownOption key={option.value} onClick={(e) => {
                // Prevent onClick from firing when interacting with InputNumber
                if ((e.target as HTMLElement).tagName !== "INPUT") {
                  handleOptionClick(option.value);
                  setSearchTerm("");
                }
              }}>
                <Flex gap={10} align="center">
                  <Avatar src={option.icon} size="large" />
                  <Text>{option.label}</Text>
                </Flex>
                <InputNumber
                  type="number"
                  placeholder="Enter %"
                  value={option.proportion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation()
                    handleProportionChange(option.value, Number(e.target.value))
                  }
                  }
                  onPressEnter={() => handleProportionSubmit(option.value)}
                />
              </DropdownOption>
            ))}
          </DropdownOptions>
        )}
        optionLabelProp="label"
        suffixIcon={isDropdownOpen ? <UpOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} /> : <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />} // Toggle icon
        onDropdownVisibleChange={(open: boolean) => {
          setTimeout(() => {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement?.tagName === "INPUT") {
              return; // Prevent opening/closing if an input is active
            }
            setAllocation(open);
          }, 0);
        }}
      />
    </Flex>
  );
};

export default CustomSelect;
