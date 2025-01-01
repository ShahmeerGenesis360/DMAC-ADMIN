import React from "react";
import {   Select } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { StyledInput, StyledModal, StyledSelect, StyledTextArea, StyledUpload } from "./styles";

const { Option } = Select;


interface IAddIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddIndexModal: React.FC<IAddIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Modal structure */}
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        title="Add Index"
        closable={false}
      >
        {/* Upload Section */}
        <StyledUpload className="hello">
          <CloudUploadOutlined /> Upload Image
        </StyledUpload>

        {/* Input Fields */}
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Coin Name" showCount maxLength={20} />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea rows={4} maxLength={200} placeholder="Description" />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledSelect placeholder="Allocations" allowClear>
            <Option value="allocation1">Allocation 1</Option>
            <Option value="allocation2">Allocation 2</Option>
            <Option value="allocation3">Allocation 3</Option>
          </StyledSelect>
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea rows={4} maxLength={200} placeholder="Overview" />
        </div>

       
      </StyledModal>
    </div>
  );
};

export default AddIndexModal;
