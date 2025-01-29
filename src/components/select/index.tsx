import React, { useState } from "react";
import { Flex } from "antd";
import { DropdownOption, DropdownOptions, InputNumber, StyledSelect, Text } from "./styles";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";



interface IProps {
    selectedOptions: string[];
    setSelectedOptions: (item: string[]) => void;
    options: WalletOption[];
    setOptions: (item: WalletOption[]) => void;
}

const Select: React.FC<IProps> = ({ selectedOptions, setSelectedOptions, options, setOptions }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    console.log(selectedOptions, "selected", options)

    const handleDeselect = (value: string | unknown) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== value));
        setOptions(options.filter((item) => item.collector !== value));
    };

    const handleSelect = (value: string) => {
        // Check if the value already exists in options
        if (!options.find((option) => option.collector === value)) {
            // Add new option dynamically
            setOptions([
                ...options,
                { collector: value, weight: 0 }, // Default structure for new options
            ]);
        }

        // Update selected options
        if (!selectedOptions.includes(value)) {
            setSelectedOptions([...selectedOptions, value]);
        }
    };


    const handleProportionChange = (value: string, weight: number) => {
        console.log("value", value);
        console.log("weight", weight);
        // Calculate the total weight after the change

        setOptions(
            options.map((option) =>
                option.collector === value ? { ...option, weight } : option
            )
        );
    };

    return (
        <Flex>
            <StyledSelect
                placeholder="Collectors"
                mode="tags"
                value={selectedOptions}
                tokenSeparators={[',']}
                dropdownStyle={{
                    backgroundColor: "#242931",
                    borderRadius: "20px",
                    padding: "0px",
                }}
                options={options.map((option) => ({
                    value: option.collector,
                    label: (
                        <Flex gap={10} align="center" >
                            <Text>
                                {option.collector} - {option.weight}%
                            </Text>
                        </Flex>
                    ),
                }))}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                dropdownRender={(menu) => (
                    <DropdownOptions>
                        {options.map((option) => (
                            <DropdownOption
                                key={option.collector}
                            // onClick={() => handleOptionClick(option.value)}
                            >
                                <Text>{option.collector}</Text>
                                <InputNumber
                                    type="number"
                                    placeholder="Enter %"
                                    value={option.weight}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleProportionChange(option.collector, Number(e.target.value))
                                    }
                                    onPressEnter={() => setIsDropdownOpen(false)}
                                />
                            </DropdownOption>
                        ))}
                        {menu}
                    </DropdownOptions>
                )}
                suffixIcon={isDropdownOpen ? <UpOutlined /> : <DownOutlined />} // Toggle icon
                onDropdownVisibleChange={(open: boolean) => setIsDropdownOpen(open)} // Track dropdown visibility
            >
                {(options || []).map((option) => (
                    <Option key={option.collector} value={option.collector}>
                        {option.collector}
                    </Option>
                ))}
            </StyledSelect>
        </Flex>
    );
};

export default Select;
