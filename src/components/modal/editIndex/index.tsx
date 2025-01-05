import React, { useState } from "react";
import { Flex } from "antd";
import { CloudUploadOutlined, LeftOutlined } from "@ant-design/icons";
import {
  StyledInput,
  StyledModal,
  StyledTextArea,
  StyledUpload,
  Text,
  UploadText,
} from "../addIndex/styles";
import Button from "../../button";
import RebalanceIndex from "../rebalance";

interface IEditIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: object;
}

const EditIndexModal: React.FC<IEditIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
  index,
}) => {
  const [openRebalance, setOpenRebalace] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log({ index });
  return (
    <div>
      {/* Modal structure */}
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={4}>
              <span
                style={{
                  height: "32px",
                  width: "32px",
                  background: "#373737",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <LeftOutlined />
              </span>
              <Text>Edit Index</Text>
            </Flex>
            <Button onClick={() => setOpenRebalace(true)} text="Rebalance" />
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
          <Flex gap={10} justify="center" align="center">
            <CloudUploadOutlined style={{ fontSize: "24px", color: "#fff" }} />{" "}
            <UploadText>Upload Image</UploadText>
          </Flex>
        </StyledUpload>

        {/* Input Fields */}
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Coin Name" showCount maxLength={20} />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea
            style={{ resize: "none" }}
            showCount
            rows={4}
            maxLength={200}
            placeholder="Description"
          />
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

      <RebalanceIndex
        isModalOpen={openRebalance}
        setIsModalOpen={setOpenRebalace}
      />
    </div>
  );
};

export default EditIndexModal;
