import React, { useState } from "react";
import { Flex, message } from "antd";
import { DropdownOption, DropdownOptions, InputNumber, StyledSelect, Text, Token } from "./styles";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
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

    const getTotalProportion = () =>
        options.reduce((sum, option) => sum + option.weight, 0);

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
        const totalProportion = getTotalProportion();
        const currentOption = options.find((option) => option.collector === value);
        const newTotal = totalProportion - (currentOption?.weight || 0) + weight;

        if (newTotal > 100) {
            message.error("Total Weight cannot exceed 100%");
            return;
        }
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
                placeholder="Enter Fees Collection Wallet"
                mode="tags"
                open={isDropdownOpen}
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
                            <CloseOutlined onClick={() => handleDeselect(option.collector)} />
                        </Flex>
                    ),
                }))}
                onSelect={handleSelect}
                // onDeselect={handleDeselect}
                dropdownRender={(menu) => (
                    <DropdownOptions>
                        {
                            options.length > 0 &&
                            <DropdownOption>
                                <Token style={{ borderColor: 'transparent' }} align="center">
                                    <Text style={{ fontWeight: 600 }}>Address</Text>
                                </Token>
                                <Text style={{ fontWeight: 600, width: 80 }}>Share</Text>
                            </DropdownOption>
                        }
                        {options.map((option) => (
                            <DropdownOption
                                key={option.collector}
                            // onClick={() => handleOptionClick(option.value)}
                            >
                                <Token>
                                    <Text>{option.collector}</Text>
                                </Token>
                                <InputNumber
                                    type="number"
                                    suffix="%"
                                    placeholder="Enter %"
                                    value={option.weight}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleProportionChange(option.collector, Number(e.target.value))
                                    }
                                    onPressEnter={() => setIsDropdownOpen(false)}
                                    onKeyDown={(e) => {
                                        if (["ArrowDown", "ArrowUp"].includes(e.key))
                                            e.preventDefault()
                                    }
                                    }   
                                />
                            </DropdownOption>
                        ))}
                        {menu}
                    </DropdownOptions>
                )}
                suffixIcon={isDropdownOpen ? <UpOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} /> : <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />} // Toggle icon
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
