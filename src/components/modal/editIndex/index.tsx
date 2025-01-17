import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex, UploadFile } from "antd";
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
import { UploadChangeParam } from "antd/es/upload";

interface IEditIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: Partial<IGroupCoin>;
}

const initialIndex = {
  name: "",
  description: "",
  file: ""
}

// const BASE_URL = import.meta.env.VITE_UPLOAD_URL;
const BASE_URL = process.env.VITE_UPLOAD_URL;

const EditIndexModal: React.FC<IEditIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
  index,
}) => {
  const [openRebalance, setOpenRebalace] = useState(false);
  const [faq, setFaq] = useState<IFaq[] | []>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addIndex, setAddIndex] = useState<Partial<IGroupCoin>>(initialIndex)


  useEffect(() => {
    if (!isModalOpen) {
      setAddIndex(initialIndex);
      setFaq([]);
      setFileList([]);
      return;
    }
    if (Object.keys(index).length > 0) {
      setAddIndex({ ...addIndex, ...index })
      if (index.faq && index.faq.length > 0) {
        setFaq(index?.faq)
      }
      if (index.imageUrl) {
        setFileList([
          {
            uid: "-1",
            name: index.imageUrl.split("/").pop() || "image",
            status: "done",
            url: `${BASE_URL}/uploads/${index.imageUrl}`,
          },
        ])
      }
    }
  }, [index, isModalOpen])

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddIndex((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleFaqChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    // Update the specific answer in the array
    setFaq((prev) => {
      const updatedValues = [...prev];
      updatedValues[index].answer = value;
      return updatedValues;
    });
  };

  const handleCoinChange = (value: number, index: number) => {

    // Update the specific answer in the array
    setAddIndex((prev) => {
      const updatedCoins = [...prev.coins as IGroupCoin[]];
      updatedCoins[index].proportion = value;

      return {
        ...prev, // Spread the previous state
        coins: updatedCoins, // Update only the coins array
      };
    });
  };


  const handleFileRemove = (file: UploadFile) => {
    console.log("Removing file:", file);
    // Clear the file from the state
    setAddIndex((prev) => ({ ...prev, file: "", imageUrl: "" }));
    setFileList([]);
  };

  const handleFile = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
    setAddIndex((prev) => ({ ...prev, file: info?.file as any }))
    // Get the latest uploaded file (info.file)
    if (info.file.status === 'done') {
      console.log('File uploaded successfully:', info.file.originFileObj);
      // setAddIndex((prev) => ({ ...prev, file: info.file.originFileObj as any }));
      // You can process the uploaded file here
    } else if (info.file.status === 'error') {
      console.error('File upload failed:', info.file);
    }
  };

  const isUploaded = fileList.length > 0;

  console.log(addIndex);
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
                onClick={handleCancel}
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
        <StyledUpload
          isUploaded={isUploaded}
          fileList={fileList}
          listType="picture"
          multiple={false} // Allow single file upload
          beforeUpload={() => false} // Prevent auto upload
          onChange={handleFile}
          onRemove={handleFileRemove}>
          <Flex gap={10} justify="center" align="center"><CloudUploadOutlined style={{ fontSize: '24px', color: '#fff' }} /> <UploadText>Upload Image</UploadText></Flex>
        </StyledUpload>

        {/* Input Fields */}
        <div style={{ marginTop: 16 }}>
          <StyledInput placeholder="Coin Name" value={addIndex.name} showCount maxLength={20} name="name" onChange={handleChange} />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea style={{ resize: "none" }} value={addIndex.description} showCount rows={4} maxLength={200} placeholder="Description" name="description" onChange={handleChange} />
        </div>

        <>
          {
            faq.length > 0 && faq.map((item: IFaq, index) => (
              <div style={{ marginTop: 16 }}>
                <StyledInput placeholder={item.question} value={item.answer} showCount maxLength={20} name={item.question} onChange={(e: ChangeEvent<HTMLInputElement>) => handleFaqChange(e, index)} />
              </div>
            ))
          }
        </>
      </StyledModal>

      {
        index && index?.coins &&
        <RebalanceIndex
          isModalOpen={openRebalance}
          setIsModalOpen={setOpenRebalace}
          editIndex={addIndex as IGroupCoin}
          handleCoinChange={handleCoinChange}
          faq={faq}
        />
      }
    </div>
  );
};

export default EditIndexModal;
