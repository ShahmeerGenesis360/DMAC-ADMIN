import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex } from "antd";
import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import { StyledInput, StyledModal, StyledTextArea, StyledUpload, Text, UploadText } from "./styles";
import Button from "../../button";
import CustomSelect from "../../dropdown";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { allocationList } from "../../../constants";
import { createIndex } from "../../../services/indexGroup";

interface IAddIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialIndex = {
  name: "",
  description: "",
  file: ""
}

const questions = ["Overview", "Maintenance", "Methodology", "Risks", "Fees"];
const AddIndexModal: React.FC<IAddIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [faq, setFaq] = useState(
    questions.map((question) => ({ question, answer: "" }))
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [addIndex, setAddIndex] = useState(initialIndex)
  const [options, setOptions] = useState<Option[]>(allocationList);



  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  useEffect(() => {
    console.log(addIndex.file, "hello", (typeof addIndex.file !== 'undefined'))
    // Check if all required fields are filled
    const isFormValid =
      addIndex.name.trim() !== "" &&
      addIndex.description.trim() !== "" &&
      faq.every((item) => item.answer.trim() !== "") &&
      selectedOptions.length > 0 &&
      (addIndex.file && !addIndex.file?.status && typeof addIndex.file !== 'undefined')

    setIsButtonDisabled(!isFormValid);
  }, [addIndex, faq]);


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

  const handleSubmit = async () => {
    const filterCoin = options.filter(item =>
      selectedOptions.includes(item.value))
    const coins = filterCoin.map(({ label, value, proportion }: Option) => ({
      coinName: label,
      address: value,
      proportion: proportion,
    }));

    await createIndex({ ...addIndex, coins, faq })
  }

  const handleFileRemove = (file: UploadFile) => {
    console.log("Removing file:", file);
    // Clear the file from the state
    setAddIndex((prev) => ({ ...prev, file: "" }));
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

  console.log(addIndex, "AddIndex", selectedOptions)

  return (
    <div>
      {/* Modal structure */}
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Text>Add Index</Text>
            <Button disabled={isButtonDisabled} text="Add Index" icon={<PlusOutlined size={20} />} onClick={handleSubmit} />
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
          <StyledInput placeholder="Coin Name" showCount maxLength={20} name="name" onChange={handleChange} />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea style={{ resize: "none" }} showCount rows={4} maxLength={200} placeholder="Description" name="description" onChange={handleChange} />
        </div>

        <div style={{ marginTop: 16 }}>
          <CustomSelect setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions} setOptions={setOptions} options={options} />
        </div>
        <>
          {
            faq.map((item, index) => (
              <div style={{ marginTop: 16 }}>
                <StyledInput placeholder={item.question} value={item.answer} showCount maxLength={20} name="overview" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFaqChange(e, index)} />
              </div>
            ))
          }
        </>
      </StyledModal>
    </div>
  );
};

export default AddIndexModal;
