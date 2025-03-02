import React, { useEffect, useRef, useState } from "react";
import { Avatar, Flex, message } from "antd";
import { DropdownOption, DropdownOptions, InputNumber, StyledSelect, Text, Token } from "./styles";
import { CloseCircleOutlined, CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";



interface IProps {
  setAllocation: (item: boolean) => void
  selectedOptions: string[];
  setSelectedOptions: (item: string[]) => void;
  options: Option[];
  setOptions: (item: Option[]) => void;
}

const CustomSelect: React.FC<IProps> = ({ selectedOptions, setSelectedOptions, setOptions, options, setAllocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <Flex vertical gap={15}>
      <StyledSelect
        onSelect={() => {
          setIsDropdownOpen(false)
          setAllocation(true)
        }}
        // onBlur={() => {
        //   setIsDropdownOpen(false)
        // }}
        placeholder="Allocations"
        open={isDropdownOpen}
        mode="multiple"
        value={selectedOptions}
        // open={false}
        showSearch={false}
        // searchValue={searchTerm}
        // onSearch={(value) => setSearchTerm(value)} // Capture search input
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
              <Text>{option.label} - {option.proportion} %</Text>
              {/* <InputNumber
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
              /> */}
              {/* <CloseOutlined
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeselect(option.value)
                }} /> */}
            </Flex>
          ),
        }))}
        dropdownRender={() => (
          <DropdownOptions
            ref={dropdownRef}
          >
            {
              selectedOptions.length > 0 &&
              <DropdownOption>
                <Token style={{ borderColor: 'transparent' }}>
                  <Text style={{ fontWeight: 600 }}>Total Allocations Proportion</Text>
                </Token>
                <InputNumber
                  type="number"
                  placeholder="Total %"
                  suffix={"%"}
                  value={getTotalProportion()}
                  disabled={true}
                />
                <CloseCircleOutlined style={{ opacity: 0 }} />
              </DropdownOption>
            }
            {filteredOptions
              .filter((option) => selectedOptions.includes(option.value))
              .map((option) => (
                <DropdownOption key={option.value} onClick={(e) => {
                  e.preventDefault();
                  // Prevent onClick from firing when interacting with InputNumber
                  if ((e.target as HTMLElement).tagName !== "INPUT") {
                    handleOptionClick(option.value);
                    setSearchTerm("");
                  }
                }}>
                  <Token gap={10} align="center">
                    <Avatar src={option.icon} size="large" />
                    <Text>{option.label}</Text>
                  </Token>
                  <InputNumber
                    type="number"
                    placeholder="Enter %"
                    suffix={"%"}
                    value={option.proportion}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.stopPropagation()
                      handleProportionChange(option.value, Number(e.target.value))
                    }
                    }
                    onPressEnter={() => handleProportionSubmit(option.value)}
                  />
                  <CloseCircleOutlined onClick={(e) => {
                    e.stopPropagation()
                    handleDeselect(option.value)
                  }} />
                </DropdownOption>
              ))}
          </DropdownOptions>
        )}
        optionLabelProp="label"
        suffixIcon={isDropdownOpen ? <UpOutlined onClick={(e) => {
          e.stopPropagation();
          // setIsDropdownOpen(!isDropdownOpen);
        }} /> :
          <DownOutlined onClick={(e) => {
            e.stopPropagation();
            // setIsDropdownOpen(!isDropdownOpen)
          }} />} // Toggle icon
        onDropdownVisibleChange={(open: boolean) => {
          // setTimeout(() => {
          //   const activeElement = document.activeElement as HTMLElement;
          //   if (activeElement?.tagName === "INPUT") {
          //     return; // Prevent opening/closing if an input is active
          //   }
          // }, 0);
          setAllocation(open);
        }}
      />
      {
        selectedOptions.length > 0 &&
        <DropdownOptions
          ref={dropdownRef}
        >
          {
            selectedOptions.length > 0 &&
            <DropdownOption>
              <Token style={{ borderColor: 'transparent' }}>
                <Text style={{ fontWeight: 600 }}>Total Allocations Proportion</Text>
              </Token>
              <InputNumber
                type="number"
                placeholder="Total %"
                suffix={"%"}
                value={getTotalProportion()}
                disabled={true}
              />
              <CloseCircleOutlined style={{ opacity: 0 }} />
            </DropdownOption>
          }
          {filteredOptions
            .filter((option) => selectedOptions.includes(option.value))
            .map((option) => (
              <DropdownOption key={option.value} onClick={(e) => {
                e.preventDefault();
                // Prevent onClick from firing when interacting with InputNumber
                if ((e.target as HTMLElement).tagName !== "INPUT") {
                  handleOptionClick(option.value);
                  setSearchTerm("");
                }
              }}>
                <Token gap={10} align="center">
                  <Avatar src={option.icon} size="large" />
                  <Text>{option.label}</Text>
                </Token>
                <InputNumber
                  type="number"
                  placeholder="Enter %"
                  suffix={"%"}
                  value={option.proportion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation()
                    handleProportionChange(option.value, Number(e.target.value))
                  }
                  }
                  onPressEnter={() => handleProportionSubmit(option.value)}
                />
                <CloseCircleOutlined onClick={(e) => {
                  e.stopPropagation()
                  handleDeselect(option.value)
                }} />
              </DropdownOption>
            ))}
        </DropdownOptions>
      }
    </Flex>
  );
};

export default CustomSelect;
