import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex, Tooltip } from "antd";
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
import { createIndex as createIndexToDB } from "../../../services/indexGroup"; // DB Function
import { createIndex as createIndexContract } from "../../../../services/contract"; // On-chain Function
import { useProgram } from "../../../../services/idl"; // Custom hook for Anchor program
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Select from "../../select";
import { Select as SelectOptions } from 'antd'
import { uploadImageToPinata, uploadMetadataToPinata } from "../../../../services/pinata";


import { StyledSelect } from "../../select/styles";
import { useWallet } from "@solana/wallet-adapter-react";
import CategorySelect from "../../category";
import { toast } from "react-toastify";
import AllocationToken from "../../allocationToken";
interface IAddIndexModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialIndex = {
  name: "",
  description: "",
  file: null as File | null,
  feeAmount: "",
  category: "",
  symbol: "",
};

const questions = ["Overview", "Maintenance", "Methodology", "Risks", "Fees"];

const AddIndexModal: React.FC<IAddIndexModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { publicKey, signTransaction, connected } = useWallet(); // Wallet context
  const { program, connection } = useProgram() || {}; // Use the custom hook
  const handleCancel = () => setIsModalOpen(false);
  const [isAllocation, setIsAllocation] = useState(false)
  const handleAllocation = () => setIsAllocation(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [faq, setFaq] = useState(
    questions.map((question) => ({ question, answer: question.toLowerCase() === "fees" ? "1%" : "", }))
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [addIndex, setAddIndex] = useState(initialIndex);
  const [options, setOptions] = useState<Option[]>(allocationList);
  const [selectedOptionTags, setSelectedOptionTags] = useState<string[] | []>(
    []
  );
  const [optionTags, setOptionTags] = useState<WalletOption[] | []>([]);
  const keypair = Keypair.generate(); // Generate mint keypair
  const [mintKeypair] = useState(keypair);

  const getTotalProportion = () =>
    options.reduce((sum, option) => sum + option.proportion, 0);

  useEffect(() => {
    const totalProportion = getTotalProportion();
    const selectedTokens = options.filter(option => selectedOptions.includes(option.value));
    const hasZeroProportion = selectedTokens.some(token => token.proportion === 0);
    const isFormValid =
      addIndex.name.trim() !== "" &&
      addIndex.description.trim() !== "" &&
      addIndex.category.trim() !== "" &&
      faq.every((item) => item.answer.trim() !== "") &&
      selectedOptions.length > 0 && totalProportion === 100 && !hasZeroProportion
    addIndex.file &&
      !(addIndex.file as any)?.status &&
      typeof addIndex.file !== "undefined";

    setIsButtonDisabled(!isFormValid);
  }, [addIndex, faq, options]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddIndex((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFaqChange = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;

    // Update the specific answer in the array
    setFaq((prev) => {
      const updatedValues = [...prev];
      updatedValues[index].answer = value;
      return updatedValues;
    });
  };

  const handleSubmit = async () => {
    if (!program || !connection || !publicKey || !signTransaction) {
      console.warn(
        "Program, connection, wallet, or signTransaction not ready."
      );
      return;
    }

    if (!addIndex.file) {
      console.error("❌ No file selected for upload!");
      return;
    }

    // ✅ Upload Image to Pinata
    const imageUri = await uploadImageToPinata(addIndex.file);

    // ✅ Upload Metadata to Pinata
    const metadataUri: any = await uploadMetadataToPinata(imageUri, addIndex.name, addIndex.description);

    console.log("📌 Pinata Metadata URI:", metadataUri);
    const response = await fetch(metadataUri)
    const data = await response.json()


    const selectedTokens = options.filter((item) =>
      selectedOptions.includes(item.value)
    );
    const tokenData = selectedTokens.map((item) => ({
      coinName: item.label,
      address: item.value,
      proportion: item.proportion,
      mint: new PublicKey(item.value),
      weight: item.proportion,
    }));

    const coins = tokenData.map(({ coinName, address, proportion }) => ({
      coinName,
      address,
      proportion,
    }));
    const tokenAllocations = tokenData.map(({ mint, weight }) => ({
      mint,
      weight: new anchor.BN(weight),
    }));

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
    const collectorDetailApi = optionTags.map((item) => ({
      collector: item.collector,
      weight: item.weight,
    }))

    console.log("Submitting index...");

    try {
      const { txHash, programAuthorityPda } = await createIndexContract(
        program,
        connection,
        publicKey,
        mintKeypair,
        addIndex.name,
        addIndex.symbol,
        metadataUri,
        tokenAllocations,
        collectorDetails,
        parseFloat(addIndex.feeAmount),
        signTransaction
      );

      console.log("Transaction Hash:", txHash);

      console.log(addIndex.feeAmount, "feeAmount")
      const mintPublickey = mintKeypair.publicKey;
      const mintKeySecret = Buffer.from(mintKeypair.secretKey).toString(
        "base64"
      );
      console.log(addIndex, "addIndex")
      await createIndexToDB({
        ...addIndex,
        coins,
        faq,
        mintPublickey,
        mintKeySecret,
        tokenAllocations,
        collectorDetailApi,
        imageUri,
        programAuthorityPda,
      }).then(() => {
        toast.success("Index Added Sucessful!");
      })
        .catch(() => {
          toast.error("Getting Error!!")
        });

      setAddIndex(initialIndex);
      setFileList([]);
      setSelectedOptions([]);
      setFaq(questions.map((question) => ({ question, answer: "" })));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting index:", error);
    }
  };

  const handleFileRemove = (file: UploadFile) => {
    console.log("Removing file:", file);
    setAddIndex((prev: any) => ({ ...prev, file: "" }));
    setFileList([]);
  };

  const handleFile = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
    setAddIndex((prev) => ({ ...prev, file: info?.file as any }));

    if (info.file.status === "done") {
      console.log("File uploaded successfully:", info.file.originFileObj);
    } else if (info.file.status === "error") {
      console.error("File upload failed:", info.file);
    }
  };

  console.log(addIndex, optionTags);
  const isUploaded = fileList.length > 0;

  return (
    <div>
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
        <Tooltip title="Upload an image of index">
          <StyledUpload
            isUploaded={isUploaded}
            fileList={fileList}
            listType="picture"
            multiple={false}
            beforeUpload={() => false}
            onChange={handleFile}
            onRemove={handleFileRemove}
          >
            <Flex gap={10} justify="center" align="center">
              <CloudUploadOutlined style={{ fontSize: "24px", color: "#fff" }} />{" "}
              <UploadText>Upload Image</UploadText>
            </Flex>
          </StyledUpload>
        </Tooltip>

        {/* Input Fields */}
        <div style={{ marginTop: 16 }}>
          <Tooltip title="Enter a name for your index">
            <StyledInput
              placeholder="Index Name"
              value={addIndex.name}
              showCount
              maxLength={50}
              name="name"
              onChange={handleChange}
            />
          </Tooltip>
        </div>


        <div style={{ marginTop: 16 }}>
          <Tooltip title="Enter a symbol for the index">
            <StyledInput
              placeholder="Index Symbol"
              value={addIndex.symbol}
              showCount
              maxLength={20}
              name="symbol"
              onChange={handleChange}
            />
          </Tooltip>
        </div>

        <div style={{ marginTop: 16 }}>
          <Tooltip title="Enter a description of the index">
            <StyledTextArea
              style={{ resize: "none" }}
              value={addIndex.description}
              showCount
              rows={4}
              maxLength={2000}
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
          </Tooltip>
        </div>
        <AllocationToken visible={isAllocation} onClose={handleAllocation} setOptions={setOptions}
          options={options} setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions} />
        <div style={{ marginTop: 16 }}>
          <Tooltip title="Select the coins and Enter its proportions" getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
            <span>
              <CustomSelect
                setAllocation={setIsAllocation}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                setOptions={setOptions}
                options={options}
              />
            </span>
          </Tooltip>
        </div>
        <div style={{ marginTop: 16 }}>
          <Tooltip title="Select the Category for the index" getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
            <span> {/* Wrapping with a span to fix Tooltip not appearing on Select */}
              <CategorySelect
                setSelectedOptions={setAddIndex}
                selectedOptions={addIndex.category}
              />
            </span>
          </Tooltip>
        </div>
        <>
          {faq.map((item, index) => (
            item.question === "Risks" ?
              <>
                <div style={{ marginTop: 16 }}>
                  <Tooltip title={`Enter the detail of ${item.question}`}>
                    <StyledTextArea
                      placeholder={item.question}
                      value={item.answer}
                      showCount={true}
                      maxLength={200}
                      style={{ resize: "none" }}
                      name={item.question}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        handleFaqChange(e, index)
                      }
                      autoSize={{ minRows: 1, maxRows: 3 }}
                    />
                  </Tooltip>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Tooltip title="Enter the address and Enter its proportion" getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                    <span>
                      <Select
                        setSelectedOptions={setSelectedOptionTags}
                        selectedOptions={selectedOptionTags}
                        setOptions={setOptionTags}
                        options={optionTags}
                      />
                    </span>
                  </Tooltip>
                </div>
              </>
              :
              <div style={{ marginTop: 16 }}>
                <Tooltip title={`Enter the detail of ${item.question}`}>
                  <StyledTextArea
                    placeholder={item.question}
                    value={item.answer}
                    showCount={item.question === "Fees" ? false : true}
                    maxLength={200}
                    style={{ resize: "none" }}
                    name={item.question}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      handleFaqChange(e, index)
                    }
                    autoSize={{ minRows: 1, maxRows: item.question === "Fees" ? 1 : 3 }}
                  />
                </Tooltip>
              </div>
          ))}
        </>
        <div style={{ marginTop: 16 }}>
          <Tooltip title="Enter a Initial Deposit for the index">
            <StyledInput
              placeholder="Initial Deposit"
              type={"number"}
              value={addIndex.feeAmount}
              showCount={false}
              maxLength={20}
              name="feeAmount"
              onChange={handleChange}
            />
          </Tooltip>
        </div>
      </StyledModal>
    </div >
  );
};

export default AddIndexModal;
