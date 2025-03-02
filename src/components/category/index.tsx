import React, { useEffect, useState } from "react";
import { Divider, Flex, Space } from "antd";
import { DropdownOption, DropdownOptions, DropdownOptionsTag, StyledSelect, Text } from "./styles";
import { DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import Button from "../button";
import { StyledInput } from "../modal/addIndex/styles";
import { createCategory, deleteCategory, getAllCategory } from "../../services/indexGroup";
import { toast } from "react-toastify";



interface IProps {
    selectedOptions: string[] | [];
    setSelectedOptions: (item: any) => void;
}

const CategorySelect: React.FC<IProps> = ({ selectedOptions, setSelectedOptions }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [options, setOptions] = useState([])
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

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

    const deleteItem = async (id: string) => {
        await deleteCategory(id.toString()).then((res) => {
            setOptions(options.filter((option) => option !== id));
            toast.success("Category Deleted Successful")
        }).catch((err) => {
            toast.error(err.message)
        })
    };

    const handleOptionClick = (value: never) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions((prev: any) => ({ ...prev, category: selectedOptions.filter((item) => item !== value) }))
            // setSelectedOptions(selectedOptions.filter((item) => item !== value));
        } else {
            // setSelectedOptions([...selectedOptions, value]); 
            setSelectedOptions((prev: any) => ({ ...prev, category: [...selectedOptions, value]}))

        }
        // setSelectedOptions((prev: any) => ({ ...prev, category: value }))
        // setIsDropdownOpen(false)
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Flex>
            <StyledSelect
                mode="tags"
                placeholder="Categories"
                value={selectedOptions.length === 0 ? undefined : selectedOptions}
                // value={["AI", "Depins"]}
                dropdownStyle={{
                    backgroundColor: "#242931",
                    borderRadius: "20px",
                    padding: "0px",
                }}
                options={options.map((option) => ({
                    value: option,
                    label: option
                }))}
                showSearch
                searchValue={searchTerm}
                onSearch={(value) => setSearchTerm(value)}
                open={isDropdownOpen}
                dropdownRender={() => (
                    <DropdownOptionsTag>
                        <Flex style={{ borderColor: 'transparent' }}>
                            <Text style={{ fontWeight: 600 }}>Categories</Text>
                        </Flex>
                        <DropdownOptions>
                            {filteredOptions.map((option) => (
                                <DropdownOption
                                    key={option}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <Text>{option}</Text>
                                    <DeleteOutlined onClick={(e) => {
                                        e.stopPropagation();
                                        deleteItem(option)
                                    }} />
                                </DropdownOption>
                            ))}
                        </DropdownOptions>
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
                    </DropdownOptionsTag>
                )}
                optionLabelProp="label"
                suffixIcon={isDropdownOpen ? <UpOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} /> : <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />} // Toggle icon
                onDropdownVisibleChange={(open: boolean) => setIsDropdownOpen(open)} // Track dropdown visibility
            />
        </Flex>
    );
};

export default CategorySelect;
