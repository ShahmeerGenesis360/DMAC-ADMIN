import React, { useEffect, useState } from "react";
import { Divider, Flex, Space } from "antd";
import { DropdownOption, DropdownOptions, StyledSelect, Text } from "./styles";
import { DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import Button from "../button";
import { StyledInput } from "../modal/addIndex/styles";
import { createCategory, getAllCategory } from "../../services/indexGroup";
import { toast } from "react-toastify";



interface IProps {
    selectedOptions: string;
    setSelectedOptions: (item: any) => void;
}

const CategorySelect: React.FC<IProps> = ({ selectedOptions, setSelectedOptions }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [options, setOptions] = useState([])
    const [name, setName] = useState('');

    useEffect(() => {
        getAllCategory().then((res) => {
            setOptions(res)
        })
    }, [])

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        await createCategory(name).then((res) => {
            setOptions([...options, res.value]);
            setName('');
            toast.success("Category Added Successful")
        }).catch((err) => {
            toast.error(err.message)
        })
    };

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
                options={options.map((option) => ({
                    value: option,
                    label: option
                }))}
                open={isDropdownOpen}
                dropdownRender={() => (
                    <DropdownOptions>
                        {options.map((option) => (
                            <DropdownOption
                                key={option}
                                onClick={() => handleOptionClick(option)}
                            >
                                <Text>{option}</Text>
                            </DropdownOption>
                        ))}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                            <StyledInput
                                placeholder="Please Enter Category"
                                value={name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button text="Add Category" icon={<PlusOutlined />} onClick={addItem} />
                        </Space>

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
