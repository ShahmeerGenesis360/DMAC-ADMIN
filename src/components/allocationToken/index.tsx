import React, { useState } from "react";
import { Modal, Input, Button, List, Avatar, Typography, Flex, message } from "antd";
import styled from "styled-components";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";


interface IProps {
    visible: boolean;
    onClose: () => void;
    selectedOptions: string[];
    setSelectedOptions: (item: string[]) => void;
    options: Option[];
    setOptions: (item: Option[]) => void;
}

const AllocationToken: React.FC<IProps> = ({ visible, onClose, options, setOptions, selectedOptions, setSelectedOptions, }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const getTotalProportion = () =>
        options.reduce((sum, option) => sum + option.proportion, 0);

    const handleProportionChange = (value: string, proportion: number) => {
        const currentOption = options.find((option) => option.value === value);
        setOptions(
            options.map((option) =>
                option.value === value ? { ...option, proportion } : option
            )
        );
    };
    const truncateAddress = (address, startLength = 6, endLength = 6) => {
        if (!address) return "";
        if (address.length <= startLength + endLength) return address;
        return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    };

    const handleProportionSubmit = (value: string) => {
        const option = options.find((opt) => opt.value === value);
        if (option && option.proportion > 0 && !selectedOptions.includes(value)) {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const handleOptionClick = (value: string) => {
        if (!selectedOptions.includes(value)) {
            setSelectedOptions([...selectedOptions, value]);
        }
        setSearchTerm("")
    };

    const handleDeselect = (value: string) => {
        setSelectedOptions(selectedOptions.filter((item) => item !== value));
        setOptions(
            options.map((option) =>
                option.value === value ? { ...option, proportion: 0 } : option
            )
        );
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase() === searchTerm.toLowerCase()
    );

    const handleAdd = () => {
        const totalProportion = getTotalProportion();
        const selectedTokens = options.filter(option => selectedOptions.includes(option.value));
        const hasZeroProportion = selectedTokens.some(token => token.proportion === 0);
        console.log(hasZeroProportion, "haszero")
        if (selectedOptions.length === 0) {
            message.error("Atleast Select One Token");
            return;
        }
        // if (hasZeroProportion) {
        //     message.error("Each token must have a proportion greater than 0%");
        //     return;
        // }
        // if (totalProportion > 100) {
        //     message.error("Total proportion cannot exceed 100%");
        //     return;
        // }
        // if (totalProportion < 100) {
        //     message.error("Total proportion lesser than 100%");
        //     return;
        // }
        onClose()
    }
    const handleCancel = () => {
        setSelectedOptions([]);
        const updatedOptions = options.map(option => ({
            ...option,
            proportion: 0
        }));

        setOptions(updatedOptions);
        onClose()
    }

    return (
        <StyledModal open={visible} onCancel={handleCancel} footer={null}>
            <Title>Select a token</Title>
            <SearchInput placeholder="Search by token or paste address" suffix={<SearchOutlined />} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            <PopularTokensContainer>
                {options.filter((token) => selectedOptions.includes(token.value)).length > 0 &&
                    <>
                        <PopularTitle>Popular tokens</PopularTitle>
                        <PopularList>
                            {options
                                .filter((token) => selectedOptions.includes(token.value))
                                .map((token) => (
                                    <PopularToken key={token.label}>
                                        <Flex gap={5} align="center">
                                            <Avatar size={24} src={token.icon} />
                                            <TokenText>{token.label}</TokenText>
                                        </Flex>
                                        <Flex gap={5}>
                                            {/* <InputNumber
                                                type="number"
                                                placeholder="Enter %"
                                                value={token.proportion}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    e.stopPropagation()
                                                    handleProportionChange(token.value, Number(e.target.value))
                                                }
                                                }
                                                onPressEnter={() => handleProportionSubmit(token.value)}
                                            /> */}
                                            <CloseCircleOutlined onClick={() => handleDeselect(token.value)} />
                                        </Flex>
                                    </PopularToken>
                                ))}
                        </PopularList>
                    </>
                }
            </PopularTokensContainer>
            <TokenList>
                {filteredOptions.map((token) => (
                    <ListItem key={token.label} onClick={() => handleOptionClick(token.value)}>
                        <AvatarWrapper>
                            <Avatar size={40} src={token.icon} />
                        </AvatarWrapper>
                        <TokenInfo>
                            <TokenName>{token.label}</TokenName>
                            {/* <TokenDesc>{token.value}</TokenDesc> */}
                        </TokenInfo>
                        <Flex>
                            <TokenBalance>{truncateAddress(token.value)}</TokenBalance>
                        </Flex>
                    </ListItem>
                ))}
            </TokenList>
            <FooterText>Can’t find the token you’re looking for? Try entering the mint address.</FooterText>
            <Flex gap={5}>
                <AddButton onClick={handleAdd}>Add</AddButton>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </Flex>
        </StyledModal>
    );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #242931;
    color: white;
    .ant-modal-close {
        color: white;
        &:hover {
           background: rgba(255, 255, 255, 0.05)
        }
    }
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: rgb(255, 255, 255);
`;

const InputNumber = styled(Input)`
  &.ant-input-outlined {
    background: #FFFFFF1A;
    border-width: 1px;
    border-style: solid;
    border-color: #828282;
    border-radius: 20px;
    color: #fff;
    width: 80px;
    margin-left: 10px;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
  }
`;


const SearchInput = styled(Input)`
&.ant-input-affix-wrapper-focused,
&.ant-input-outlined,
> .ant-input {
  background: #ffffff0d;
  border: 1px solid #ffffff63;
  border-radius: 8px;
  color: #828282;
  padding: 5px 12px;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: #828282 !important; /* Placeholder color */
  }
}

::placeholder {
  color: #828282 !important; /* Placeholder color */
}
&:focus,
&:hover,
&:focus-within {
  border-color: #ffffff63;
  background: #ffffff0d; /* Background color on focus */
  color: #828282; /* Optional: add a border color if you want */
  box-shadow: none;
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;

const PopularTokensContainer = styled.div`
  padding-top: 8px;
  margin-bottom: 16px;
`;

const PopularTitle = styled.div`
  color: gray;
  font-size: 14px;
  margin-bottom: 8px;
`;

const PopularList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 20px;
`;

const PopularToken = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: auto;
  justify-content: space-between;
`;

const TokenText = styled.span`
  color: white;
`;

const TokenList = styled.div`
  height: 190px;
  overflow-y: auto;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  &:hover {
  background: #ffffff0d;
  border-radius: 8px;
  border-bottom: 0px solid rgba(255, 255, 255, 0.05);
  }
`;

const AvatarWrapper = styled.div`
  margin-right: 12px;
`;

const TokenInfo = styled.div`
  flex-grow: 1;
`;

const TokenName = styled.div`
  font-weight: semi-bold;
  color: white;
`;

const TokenDesc = styled.div`
  font-size: 12px;
  color: gray;
`;

const TokenBalance = styled.div`
  color: white;
  font-size: 12px;
`;

const FooterText = styled.div`
  font-size: 12px;
  color: gray;
  margin-top: 12px;
`;

const CancelButton = styled(Button)`
  width: 100%;
  margin-top: 12px;
  background: #e87975;
  color: white;
  border: none;
  padding: 10px 0;
  &:hover {
    background: #e87975 !important;
    color: #000 !important;
  }
`;

const AddButton = styled(Button)`
  width: 100%;
  margin-top: 12px;
  background: #8fe69e;
  color: white;
  border: none;
  padding: 10px 0;
  &:hover {
  background: #8fe69e !important;
  color: #000 !important;
  }
`;

export default AllocationToken;
