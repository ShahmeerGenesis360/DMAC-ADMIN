import { Modal, Input, Upload } from "antd";
import styled from "styled-components";

const { TextArea } = Input;
// Styled components
export const StyledModal = styled(Modal)`
  &.ant-modal {
    width: 70% !important;
  }
  .ant-modal-content {
    background: #242931;
    border-radius: 20px;
    height: 500px;
    overflow: hidden;
  }
  .ant-modal-header {
    background: #242931;
  }
  .ant-modal-body {
    height: calc(100% - 48px);
    overflow-y: scroll;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
  }

  .ant-modal-body::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  .ant-modal-title {
    color: #828282;
  }
  .ant-modal-footer {
    display: none;
  }
`;

export const StyledInput = styled(Input)`
  &.ant-input-affix-wrapper-focused,
  &.ant-input-outlined,
  > .ant-input {
    background: #ffffff0d;
    border: 1px solid #ffffff63;
    border-radius: 20px;
    color: #828282;
    padding: 15px 12px;
    font-size: 16px;
    font-weight: 500;
  }

  ::placeholder {
    color: #828282 !important; /* Placeholder color */
  }
  .ant-input-suffix {
    width: 65px;
    background: #ffffff1a;
    border-radius: 36px;
    padding: 0 5px;
    .ant-input-show-count-suffix {
      color: #ffffff66;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      text-align: center;
    }
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

export const StyledTextArea = styled(TextArea)`
  &.ant-input-outlined,
  &.ant-input {
    background: #ffffff0d;
    border: 1px solid #ffffff63;
    border-radius: 20px;
    color: #828282;
    padding: 15px 12px;
    font-size: 16px;
    font-weight: 500;
    .ant-input {
      padding: 0;
    }
  }

  ::placeholder {
    color: #828282 !important; /* Placeholder color */
  }
  .ant-input-suffix {
    height: 26px;
    width: 80px;
    background: #ffffff1a;
    border-radius: 36px;
    padding: 0 5px;
    .ant-input-data-count {
      color: #ffffff66;
      font-size: 14px;
      font-weight: 500;
      top: 18px;
      right: 20px;
    }
  }
  &:focus,
  &:hover,
  &:focus-within {
    border-color: #ffffff63;
    background: #ffffff0d; /* Background color on focus */
    color: #828282; /* Optional: add a border color if you want */
    box-shadow: none;
  }
`;

export const StyledUpload = styled(Upload.Dragger)<{ isUploaded: boolean }>`
  .ant-upload {
    background: #ffffff0d !important;
    border: 1px dashed #828282;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #828282;
    display: ${({ isUploaded }) =>
      isUploaded ? "none !important" : "table !important"};
  }
  .ant-upload-btn {
    border-radius: 20px !important;
  }
  &.ant-upload-wrapper .ant-upload-drag {
    background: #ffffff0d !important;
  }
  .ant-upload .ant-upload-drag:hover {
    border-color: #ffffff0d;
  }

  .ant-upload-list-item {
    background: #ffffff0d !important;
    border: 1px dashed #828282 !important;
    height: 100px !important;
    border-radius: 20px !important;
  }
  .ant-upload-list-item-thumbnail {
    width: 85px !important;
    height: 100% !important;
    border-radius: 20px !important;
  }
  .ant-upload-list-item-image {
    object-fit: cover !important;
  }
  .ant-upload-list-item-name {
    visibility: hidden !important;
  }
  .ant-btn-sm.ant-btn-icon-only .anticon {
    font-size: 20px !important;
    color: #ffffff66 !important;
  }
`;

export const UploadText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fcfcfc;
`;

export const Text = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
`;

export const CardText = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
`;

export const StyledTitle = styled.span`
  height: 32px;
  width: 32px;
  background: #373737;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const InputNumber = styled(Input)`
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
  &::placeholder {
    color: #828282 !important; /* Placeholder color */
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
  }
`;
