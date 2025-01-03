import React from "react";
import { Flex } from "antd";
import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import { StyledInput, StyledModal, StyledTextArea, StyledUpload, Text, UploadText } from "./styles";
import Button from "../../button";
import CustomSelect from "../../dropdown";

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

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <div>
      {/* Modal structure */}
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Text>Add Index</Text>
            <Button disabled text="Add Index" icon={<PlusOutlined size={20} />} />
          </Flex>
        }
        closable={false}
        centered={true}
        maskStyle={{
          backdropFilter: "blur(15px)",
          background: "#1C1C1C1A",
        }}
      >
        {/* Upload Section */}
        <StyledUpload>
          <Flex gap={10} justify="center" align="center"><CloudUploadOutlined style={{ fontSize: '24px', color: '#fff' }} /> <UploadText>Upload Image</UploadText></Flex>
        </StyledUpload>

        {/* Input Fields */}
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Coin Name" showCount maxLength={20} />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea style={{ resize: "none" }} showCount rows={4} maxLength={200} placeholder="Description" />
        </div>

        <div style={{ marginTop: 16 }}>
          <CustomSelect />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Overview" showCount maxLength={20} />
        </div>
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Maintenance" showCount maxLength={20} />
        </div>
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Methodology" showCount maxLength={20} />
        </div>
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Risks" showCount maxLength={20} />
        </div>
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Fees" showCount maxLength={20} />
        </div>
      </StyledModal>
    </div>
  );
};

export default AddIndexModal;
