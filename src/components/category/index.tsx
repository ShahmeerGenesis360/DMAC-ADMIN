import React, { useState } from "react";
import { Flex } from "antd";
import { DropdownOption, DropdownOptions, StyledSelect, Text } from "./styles";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { categoriesOption } from "../../constants";



interface IProps {
    selectedOptions: string;
    setSelectedOptions: (item: any) => void;
}

const CategorySelect: React.FC<IProps> = ({ selectedOptions, setSelectedOptions }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOptionClick = (value: string) => {
        setSelectedOptions((prev: any) => ({ ...prev, category: value }))
        setIsDropdownOpen(false)
    }

    return (
        <Flex>
            <StyledSelect
                placeholder="Categories"
                value={selectedOptions === "" ? undefined : selectedOptions}
                dropdownStyle={{
                    backgroundColor: "#242931",
                    borderRadius: "20px",
                    padding: "0px",
                }}
                options={categoriesOption.map((option) => ({
                    value: option,
                    label: option
                }))}
                open={isDropdownOpen}
                dropdownRender={() => (
                    <DropdownOptions>
                        {categoriesOption.map((option) => (
                            <DropdownOption
                                key={option}
                                onClick={() => handleOptionClick(option)}
                            >
                                <Text>{option}</Text>
                            </DropdownOption>
                        ))}
                    </DropdownOptions>
                )}
                optionLabelProp="label"
                suffixIcon={isDropdownOpen ? <UpOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} /> : <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />} // Toggle icon
                onDropdownVisibleChange={(open: boolean) => setIsDropdownOpen(open)} // Track dropdown visibility
            />
        </Flex>
    );
};

export default CategorySelect;
