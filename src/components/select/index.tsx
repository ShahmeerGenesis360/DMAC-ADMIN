import React, { useState } from "react";
import { Flex } from "antd";
import { DropdownOptions, StyledSelect } from "./styles";
import { DownOutlined, UpOutlined } from "@ant-design/icons";



interface IProps {
    selectedOptions: string[];
    setSelectedOptions: (item: string[]) => void;
    options: string[];
    setOptions: (item: string[]) => void;
}

const Select: React.FC<IProps> = ({ selectedOptions, setSelectedOptions, options, setOptions }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    console.log(selectedOptions, "selected", options)

    const handleDeselect = (value: string | unknown) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== value));
        setOptions(options.filter((item) => item !== value));
    };

    const handleSelect = (value: string) => {
        if (!selectedOptions.includes(value)) {
            setSelectedOptions(value);
        }
        if (!options.includes(value)) {
            setOptions(value);
        }
    };

    return (
        <Flex>
            <DropdownOptions />
            <StyledSelect
                placeholder="Wallets"
                mode="tags"
                value={selectedOptions}
                tokenSeparators={[',']}
                dropdownStyle={{
                    backgroundColor: "#242931",
                    borderRadius: "20px",
                    padding: "0px",
                }}
                onChange={handleSelect}
                onDeselect={handleDeselect}
                suffixIcon={isDropdownOpen ? <UpOutlined /> : <DownOutlined />} // Toggle icon
                onDropdownVisibleChange={(open: boolean) => setIsDropdownOpen(open)} // Track dropdown visibility
            />
        </Flex>
    );
};

export default Select;
