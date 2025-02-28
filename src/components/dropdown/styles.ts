import { Flex, Input, Select } from "antd";
import styled from "styled-components";

export const StyledSelect = styled(Select)`
  &.ant-select,
  &.ant-select-outlined,
  &.ant-select-focused {
    width: 100%;
    &:hover .ant-select-selector {
      border-color: #ffffff63 !important;
      box-shadow: none !important;
    }
    .ant-select-selector {
      background: #ffffff0d;
      border-color: #ffffff63 !important;
      box-shadow: none !important;
      border: 1px solid #ffffff63 !important;
      padding: 15px 12px;
      border-radius: 20px;
      font-weight: 400;
      color: #828282;
    }
    .ant-select-arrow {
      color: #fff;
      inset-inline-end: 15px;
      font-size: 18px;
    }
    .ant-select-selection-placeholder {
      color: #828282;
      font-size: 16px;
      font-weight: 400;
    }
    .ant-select-selection-item {
      background: #ffffff12;
      border-radius: 20px;
      padding-inline-start: 4px;
      padding-inline-end: 7px;
      height: 36px;
      align-items: center;
      color: #828282;
    }
    .ant-select-selection-item-remove {
      display: none;
      color: #828282;
      font-size: 14px;
      padding-left: 5px;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const DropdownOptions = styled.div`
  overflow-y: scroll;
  max-height: 310px;
  padding: 20px;
  border: 1px solid #ffffff63;
  background: #ffffff0d;
  border-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DropdownOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  // &:hover {
  //   background: #ffffff63;
  //   border-radius: 100px;
  // }
  .anticon {
    color: #ffffff63;
    font-size: 24px;
  }
`;

export const Token = styled(Flex)`
  width: 40%;
  border: 2px solid #ffffff63;
  border-radius: 8px;
  padding: 5px 10px;
`;

export const Text = styled.span`
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
`;

export const InputNumber = styled(Input)`
  &.ant-input-outlined {
    height: 100%;
    padding: 0 5px;
    background: #FFFFFF1A;
    border-width: 1px;
    border-style: solid;
    border-color: #828282;
    border-radius: 8px;
    font-size: 16px;
    padding: 5px 10px;
    color: #fff !important;
    width: 100px;
    // margin-left: 10px;
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
