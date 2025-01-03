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

export const StyledUpload = styled(Upload.Dragger)`
  .ant-upload {
    background: #ffffff0d !important;
    border: 1px dashed #828282;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #828282;
  }
  &.ant-upload-wrapper .ant-upload-drag {
    background: #ffffff0d !important;
  }
  .ant-upload .ant-upload-drag:hover {
    border-color: #ffffff0d;
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
