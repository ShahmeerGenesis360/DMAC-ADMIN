import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex } from "antd";
import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import * as anchor from "@coral-xyz/anchor";
import {
  StyledInput,
  StyledModal,
  StyledTextArea,
  StyledUpload,
  Text,
  UploadText,
} from "./styles";
import Button from "../../button";
import CustomSelect from "../../dropdown";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { allocationList } from "../../../constants";
import { createIndex } from "../../../services/indexGroup";
import { createIndex as createIndexContract } from "../../../../services/contract";
import { program } from "../../../../services/idl";
import { PublicKey, Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Select from "../../select";
import { Select as SelectOptions } from 'antd'


import { StyledSelect } from "../../select/styles";
import { useWallet } from "@solana/wallet-adapter-react";
import CategorySelect from "../../category";
interface IAddIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialIndex = {
  name: "",
  description: "",
  file: "",
  feeAmount: "",
  category: ""
};

const questions = ["Overview", "Maintenance", "Methodology", "Risks", "Fees"];
const AddIndexModal: React.FC<IAddIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  // const connection = programInfo.connection;
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const { publicKey, signTransaction } = useWallet();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [faq, setFaq] = useState(
    questions.map((question) => ({ question, answer: "" }))
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [addIndex, setAddIndex] = useState(initialIndex);
  const [options, setOptions] = useState<Option[]>(allocationList);
  const [selectedOptionTags, setSelectedOptionTags] = useState<string[] | []>(
    []
  );
  const [optionTags, setOptionTags] = useState<WalletOption[] | []>([]);

  const keypair = Keypair.generate();

  const [mintKeypair] = useState(keypair);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  useEffect(() => {
    const isFormValid =
      addIndex.name.trim() !== "" &&
      addIndex.description.trim() !== "" &&
      addIndex.category.trim() !== "" &&
      faq.every((item) => item.answer.trim() !== "") &&
      selectedOptions.length > 0 &&
      addIndex.file &&
      !(addIndex.file as any)?.status &&
      typeof addIndex.file !== "undefined";

    setIsButtonDisabled(!isFormValid);
  }, [addIndex, faq]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddIndex((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    // if (!program || !connection) {
    //   throw new Error("Program or provider not initialized.");
    // }
    const selectedTokens = options.filter((item) =>
      selectedOptions.includes(item.value)
    );
    const tokenData = selectedTokens.map((item) => ({
      coinName: item.label, // For DB
      address: item.value, // For DB
      proportion: item.proportion, // For both DB and on-chain
      mint: new PublicKey(item.value), // For on-chain
      weight: item.proportion, // For on-chain
    }));

    // Step 2: Prepare data for DB and on-chain
    const coins = tokenData.map(({ coinName, address, proportion }) => ({
      coinName,
      address,
      proportion,
    })); // For DB
    const tokenAllocations = tokenData.map(({ mint, weight }) => ({
      mint,
      weight: new anchor.BN(weight), // Convert to BN for on-chain
    })); // For on-chain

    const totalWeight = tokenAllocations.reduce(
      (sum, allocation) => sum + allocation.weight.toNumber(),
      0
    );
    if (totalWeight !== 100) {
      throw new Error("The total allocation percentage must sum up to 100%.");
    }

    const collectorDetails = optionTags.map((item) => ({
      collector: new PublicKey(item.collector),
      weight: new anchor.BN(item.weight),
    }));

    console.log("we are here");

    if (!publicKey || !signTransaction) return;

    // const txHash = await createIndexContract(
    //   program,
    //   connection,
    //   publicKey,
    //   mintKeypair,
    //   addIndex.name,
    //   addIndex.description,
    //   tokenAllocations,
    //   collectorDetails,
    //   parseFloat(addIndex.feeAmount),
    //   signTransaction
    // );

    // console.log("Transaction Hash:", txHash);

    const mintPublickey = mintKeypair.publicKey;
    const mintKeySecret = mintKeypair.secretKey;
    await createIndex({
      ...addIndex,
      coins,
      faq,
      mintPublickey,
      mintKeySecret,
      tokenAllocations,
      collectorDetail: collectorDetails,
    });

    // Clear the form and close the modal
    setAddIndex(initialIndex);
    setFileList([]);
    setSelectedOptions([]);
    setFaq(questions.map((question) => ({ question, answer: "" })));
    setIsModalOpen(false);
  };

  const handleFileRemove = (file: UploadFile) => {
    console.log("Removing file:", file);
    // Clear the file from the state
    setAddIndex((prev) => ({ ...prev, file: "" }));
    setFileList([]);
  };

  const handleFile = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
    setAddIndex((prev) => ({ ...prev, file: info?.file as any }));
    // Get the latest uploaded file (info.file)
    if (info.file.status === "done") {
      console.log("File uploaded successfully:", info.file.originFileObj);
      // setAddIndex((prev) => ({ ...prev, file: info.file.originFileObj as any }));
      // You can process the uploaded file here
    } else if (info.file.status === "error") {
      console.error("File upload failed:", info.file);
    }
  };
  console.log(addIndex, optionTags);
  const isUploaded = fileList.length > 0;

  return (
    <div>
      {/* Modal structure */}
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        title={
          <Flex justify="space-between" align="center">
            <Text>Add Index</Text>
            <Button
              disabled={isButtonDisabled}
              text="Add Index"
              icon={<PlusOutlined size={20} />}
              onClick={handleSubmit}
            />
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
          onRemove={handleFileRemove}
        >
          <Flex gap={10} justify="center" align="center">
            <CloudUploadOutlined style={{ fontSize: "24px", color: "#fff" }} />{" "}
            <UploadText>Upload Image</UploadText>
          </Flex>
        </StyledUpload>

        {/* Input Fields */}
        <div style={{ marginTop: 16 }}>
          <StyledInput
            placeholder="Coin Name"
            value={addIndex.name}
            showCount
            maxLength={20}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <StyledTextArea
            style={{ resize: "none" }}
            value={addIndex.description}
            showCount
            rows={4}
            maxLength={200}
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <CustomSelect
            setSelectedOptions={setSelectedOptions}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
            options={options}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Select
            setSelectedOptions={setSelectedOptionTags}
            selectedOptions={selectedOptionTags}
            setOptions={setOptionTags}
            options={optionTags}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <CategorySelect setSelectedOptions={setAddIndex}
            selectedOptions={addIndex.category} />
        </div>
        <>
          {faq.map((item, index) => (
            <div style={{ marginTop: 16 }}>
              <StyledInput
                placeholder={item.question}
                value={item.answer}
                showCount
                maxLength={20}
                name={item.question}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFaqChange(e, index)
                }
              />
            </div>
          ))}
        </>
        <div style={{ marginTop: 16 }}>
          <StyledInput
            placeholder="Fees Amount"
            type={"number"}
            value={addIndex.feeAmount}
            showCount
            maxLength={20}
            name="feeAmount"
            onChange={handleChange}
          />
        </div>
      </StyledModal>
    </div>
  );
};

export default AddIndexModal;
