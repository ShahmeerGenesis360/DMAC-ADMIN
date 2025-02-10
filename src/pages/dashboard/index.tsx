// @ts-ignore
import React, { ChangeEvent, useEffect, useState } from "react";
import { Dropdown, Flex, MenuProps, Space } from "antd";
import styled from "styled-components";
import MonkeyIcon from "../../assets/monkey.svg";
import {
  ImageBox,
  TextField,
  Table,
  Pagination,
  Button,
  LineChart,
  AddIndexModal,
} from "../../components";
import {
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Container,
  Header,
  SearchContainer,
  StyledMenu,
  StyledSelect,
  SubHeader,
  SubTitle,
  Title,
  TotalIndex,
} from "./styles";

import { Card, Typography, Select } from "antd";
import EditIndexModal from "../../components/modal/editIndex";
import {
  formatNumber,
  transactionChart,
  userCharts,
  userDataSet,
} from "../../constants";
import { BarChart } from "../../components/Graph";
import {
  getAllIndex,
  getAllIndexWithPagination,
} from "../../services/indexGroup";
import { buySellChart, feesChart, LockedChart, userChart } from "../../services/charts";
import { socket } from "../../socket";
import { Text } from "../../components/dropdown/styles";

const { Title: AntdTitle } = Typography;
const { Option } = Select;

enum TimeRange {
  Monthly = "month",
  Weekly = "week",
  Daily = "daily",
}

enum TransactionRange {
  Monthly = "monthly",
  Weekly = "weekly",
  Daily = "daily",
}

interface IProps {
  data: {
    currentPage: number;
    totalPages: number;
    total: number;
    index: { index: IGroupCoin[] | [] }[];
  };
  status: boolean;
}

interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[] | [];
    fill: boolean;
    tension: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBorderColor: string;
    pointHoverBackgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

// Styled Components for Cards
const DashboardContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  padding-bottom: 20px;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(180deg, #1d1d1d 0%, #282828 100%);
  border-radius: 8px;
  color: #fff;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndexName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IndexText = styled.span`
  font-weight: 400;
`;

const CardText = styled.span`
  color: #979797;
  font-weight: 600;
  font-size: 16px;
`;

const items = (editIndex: Function, record: object): MenuProps["items"] => [
  {
    key: "1",
    label: "Edit",
    icon: <EditOutlined />,
    onClick: () => editIndex(record),
  },
  { key: "2", label: "View", icon: <EyeOutlined /> },
];

const data = Array.from({ length: 5 }, (_, i) => ({
  key: i,
  index: `Index ${i + 1}`,
  rank: 200 - i * 10,
  price: "Lorem",
  tvl: "Lorem",
  holder: "Lorem",
  address: "Lorem",
}));

// const BASE_URL = import.meta.env.VITE_UPLOAD_URL;
const BASE_URL = process.env.VITE_UPLOAD_URL;

const columns = (editIndex: Function) => [
  {
    title: "Index",
    dataIndex: "name",
    key: "name",
    render: (_: any, record: { index: IGroupCoin }) => (
      <IndexName>
        <ImageBox
          height={34}
          width={34}
          style={{ borderRadius: 50 }}
          src={
            record.index.imageUrl
              ? `${record?.index.imageUrl}`
              : MonkeyIcon
          }
        />
        <IndexText>{record.index.name}</IndexText>
      </IndexName>
    ),
  },
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    render: () => "Loreum",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text: number) => <IndexText>{text.toFixed(2)}</IndexText>,
  },
  {
    title: "TVL",
    dataIndex: "totalValueLocked",
    key: "totalValueLocked",
    render: (text: number) => (
      <IndexText>
        {text && formatNumber(Math.max(0, text))}
      </IndexText>
    ),
  },
  {
    title: "Holders",
    dataIndex: "totalHolder",
    key: "totalHolder",
    render: (text: number) => (
      <IndexText>
        {text && formatNumber(text)}
        {/* {record?.totalBuy && formatNumber(record?.totalBuy - record?.totalSell)} */}
      </IndexText>
    ),
  },
  {
    title: "Address",
    dataIndex: "_id",
    key: "_id",
    render: (_: any, record: { index: IGroupCoin }) => {
      return (
        <Flex justify="space-between">
          {record.index._id}
          <Space size="middle">
            <Dropdown
              menu={{ items: items(editIndex, record.index) }}
              overlayClassName="custom-dropdown"
            >
              <MoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            </Dropdown>
            <StyledMenu />
          </Space>
        </Flex>
      );
    },
  },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIndexes, setTotalIndexes] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({});
  const [indexes, setIndexes] = useState<any[] | []>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [transactionData, setTransactionData] = useState<any | null>(null);
  const [feesData, setFeesData] = useState<any | null>(null);
  const [lockedData, setLockedData] = useState<any | null>(null);
  const [selectedUsers, setSelectedUsers] = useState('Monthly');
  const [selectedTransactions, setSelectedTransactions] = useState('Weekly');
  const [selectedRevenue, setSelectedRevenue] = useState('Monthly');
  const [selectedLocked, setSelectedLocked] = useState('Monthly');
  const [usersInfo, setUsersInfo] = useState<any>(null);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isRevenueOpen, setIsRevenueOpen] = useState(false);


  const editIndex = async (index: object) => {
    setCurrentIndex(index);
    setOpenEditModal(true);
  };

  // useEffect(() => {
  //   getAllIndexWithPagination(1, 1000).then((res: IProps) => {
  //     console.log({ res });
  //     setIndexes(res.data.index);
  //   });
  // }, []);

  useEffect(() => {
    getAllIndexWithPagination(currentPage, 10, searchValue).then(
      (res: IProps) => {
        setCurrentPage(res.data.currentPage);
        setTotalIndexes(res.data.total);
        setIndexes(res.data.index);
      }
    );
  }, [currentPage, searchValue]);

  useEffect(() => {
    // Socket listener for incoming data
    const handleSocketData = ({ info }: any) => {
      console.log("info", info);
      setIndexes((prevIndexes) => {
        const updatedIndexes = prevIndexes.map((index) =>
          index._id === info.id ? { ...index, ...info } : index
        );
        return updatedIndexes;
      });
    };
    // Listen for updates for each index
    indexes.forEach((item: any) => {
      console.log("heheheheh", indexes);
      socket.emit("index2", item._id);
      socket.on(`index2:${item._id}`, handleSocketData);
    });

    // Clean up socket listeners
    return () => {
      indexes.forEach((item: any) => {
        socket.off(`index2:${item._id}`, handleSocketData);
      });
    };
  }, [indexes]);



  useEffect(() => {
    const fetchData = async () => {
      const response = await userChart(TimeRange[selectedUsers as keyof typeof TimeRange]);
      const { groupedData, totalUsers, latestMonth, latestMonthCount } =
        response.data;
      console.log(groupedData, "groupedData");
      // setMonths(Object.keys(groupedData)); // Set available months for selection
      const monthLabels = Object.keys(groupedData);
      const monthTotals = Object.values(groupedData);
      console.log("totalUsers", latestMonth, monthTotals);
      setUsersInfo({ totalUsers, latestMonth, latestMonthCount });
      const formattedLabels = monthLabels.map((label) => {
        const [year, month]: any = label.split("-"); // Split into year and month
        const date: any = new Date(year, month - 1); // Create a Date object
        return `${date.toLocaleString("en-US", { month: "short" })} ${year}`; // Format as "Jan 2025"
      });

      setChartData({
        labels: selectedUsers === "month" ? [
          ...formattedLabels,
          `${new Date().toLocaleString("en-US", {
            month: "short",
          })} ${new Date().getFullYear()}`,
        ] : monthLabels, // Months as labels
        datasets: [
          {
            label: "Total Users",
            data: [...monthTotals, 0], // Total user counts for each month
            ...userDataSet,
          },
        ],
      });
    };

    fetchData();
  }, [selectedUsers]);

  useEffect(() => {
    getTransaction();
  }, [selectedTransactions])

  useEffect(() => {
    getFees();
  }, [selectedRevenue])

  useEffect(() => {
    getLocked();
  }, [selectedLocked])
  // transactionChart

  const getTransaction = async () => {
    const data = await buySellChart(TransactionRange[selectedTransactions as keyof typeof TransactionRange]);
    const formatData = (
      transactions: any,
      key: "totaldeposit" | "totalwithdrawl"
    ) => {
      return transactions?.map((txn: any) => ({
        x: new Date(txn.startDate),
        y: txn[key],
      }));
    };

    setTransactionData({
      labels: data?.map((item: any) => item.startDate),
      datasets: [
        {
          label: "Buy",
          data: formatData(data, "totaldeposit"),
          fill: false,
          tension: 0,
          borderColor: "#78DA89",
          pointBackgroundColor: "#78DA89",
        },
        {
          label: "Sell",
          data: formatData(data, "totalwithdrawl"),
          fill: false,
          borderColor: "#E87975",
          pointBackgroundColor: "#E87975",
          tension: 0,
        },
      ],
    });
  };

  const getFees = async () => {
    const data = await feesChart();
    const formatData = (transactions: any, key: "totalAmount") => {
      return transactions?.map((txn: any) => ({
        x: new Date(txn.startDate),
        y: txn[key],
      }));
    };

    setFeesData({
      labels: data?.map((item: any) => item.startDate),
      datasets: [
        {
          label: "Buy",
          data: formatData(data, "totalAmount"),
          backgroundColor: "#78DA89",
          borderRadius: 2,
          barPercentage: 0.4,
          categoryPercentage: 0.4,
          borderColor: "#78DA89",
          pointBackgroundColor: "#78DA89",
        },
      ],
    });
  };

  const getLocked = async () => {
    const data = await LockedChart(TransactionRange[selectedLocked as keyof typeof TransactionRange]);
    const formatData = (transactions: any[]) => {
      return transactions.flatMap((txn: any) => {
        return Object.values(txn) // Extract all indexed entries (0,1,2,3,...)
          .filter((entry: any) => entry.startDate) // Ensure it has valid data
          .map((entry: any) => ({
            x: entry.startDate,
            y: Math.max(0, entry.totalDeposit - entry.totalWithdrawal),
          }));
      });
    };

    setLockedData({
      labels: formatData(data).map((entry) => entry.x),
      datasets: [
        {
          label: "Locked",
          data: formatData(data),
          backgroundColor: "#78DA89",
          borderRadius: 2,
          barPercentage: 0.4,
          categoryPercentage: 0.4,
          borderColor: "#78DA89",
          pointBackgroundColor: "#78DA89",
        },
      ],
    });
  };
  console.log(lockedData, "lockedData");

  return (
    <Container>
      <Flex justify="space-between">
        <Header>Dashboard</Header>
        <Button
          text="Add Index"
          icon={<PlusOutlined size={20} />}
          onClick={() => setOpenModal(true)}
        />
      </Flex>
      <SubHeader>Here’s your analytics details:</SubHeader>
      <DashboardContainer>
        {/* Card 1: Total Value Locked */}
        <StyledCard>
          <CardHeader>
            <CardText>Total Value Locked</CardText>
            <StyledSelect open={isLockedOpen} value={selectedLocked} size="small" dropdownClassName="range_popup" dropdownRender={() => (
              <Flex vertical>
                {["Monthly", "Weekly", "Daily"].map((item) => (
                  <Text key={item} style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedLocked(item)
                      setIsLockedOpen(false)
                    }}>{item}</Text>
                ))}
              </Flex>
            )}
              onDropdownVisibleChange={(open: boolean) => setIsLockedOpen(open)} />
          </CardHeader>
          <AntdTitle level={4} style={{ color: "#4caf50" }}>
            4,556 <span style={{ fontSize: 12, color: "#7cf97c" }}>+5.2%</span>
          </AntdTitle>
          {lockedData && <LineChart data={lockedData || {}} />}
        </StyledCard>

        {/* Card 2: Total Users */}
        <StyledCard>
          <CardHeader>
            <CardText>Total Users • {usersInfo?.latestMonthCount || 0} new users</CardText>
            <StyledSelect open={isUserOpen} value={selectedUsers} size="small" dropdownClassName="range_popup" dropdownRender={() => (
              <Flex vertical>
                {["Monthly", "Weekly"].map((item) => (
                  <Text key={item} style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedUsers(item)
                      setIsUserOpen(false)
                    }}>{item}</Text>
                ))}
              </Flex>
            )}
              onDropdownVisibleChange={(open: boolean) => setIsUserOpen(open)} />
          </CardHeader>
          <AntdTitle level={4} style={{ color: "#fff" }}>
            {usersInfo?.totalUsers || 0} users since{" "}
            <span style={{ color: "#4caf50" }}>
              {usersInfo?.latestMonth || ""}
            </span>
          </AntdTitle>
          {chartData && <LineChart data={chartData || {}} />}
        </StyledCard>

        {/* Card 3: Transactions */}
        <StyledCard>
          <CardHeader>
            <CardText>Transactions</CardText>
            <StyledSelect open={isTransactionOpen} value={selectedTransactions} size="small" dropdownClassName="range_popup" dropdownRender={() => (
              <Flex vertical>
                {["Monthly", "Weekly", "Daily"].map((item) => (
                  <Text key={item} style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedTransactions(item)
                      setIsTransactionOpen(false)
                    }}>{item}</Text>
                ))}
              </Flex>
            )}
              onDropdownVisibleChange={(open: boolean) => setIsTransactionOpen(open)} />
          </CardHeader>
          <AntdTitle level={4} style={{ color: "#fff" }}>
            Transactions in past week{" "}
            <span style={{ color: "#4caf50" }}>Jan</span>
          </AntdTitle>
          {transactionData && (
            <LineChart legend={true} data={transactionData} />
          )}
        </StyledCard>
      </DashboardContainer>

      <StyledCard>
        <CardHeader>
          <CardText>Total Fee Revenue</CardText>
          <StyledSelect open={isRevenueOpen} value={selectedRevenue} size="small" dropdownClassName="range_popup" dropdownRender={() => (
            <Flex vertical>
              {["Monthly", "Weekly", "Daily"].map((item) => (
                <Text key={item} style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedRevenue(item)
                    setIsRevenueOpen(false)
                  }}>{item}</Text>
              ))}
            </Flex>
          )}
            onDropdownVisibleChange={(open: boolean) => setIsRevenueOpen(open)} />
        </CardHeader>
        <AntdTitle level={4} style={{ color: "#4caf50" }}>
          {feesData &&
            Math.floor(
              feesData?.datasets[0]?.data?.reduce(
                (acc: number, value: any) => acc + value.y,
                0
              )
            )}{" "}
          <span style={{ fontSize: 12, color: "#7cf97c" }}>+5.2%</span>
        </AntdTitle>
        {feesData && <BarChart data={feesData || {}} />}
      </StyledCard>
      <SearchContainer>
        <Title>Indexes</Title>
        <Flex className="ant_flex" align="center" justify="end" gap={15}>
          <Flex gap={10}>
            <SubTitle>Total No Of Index:</SubTitle>
            <TotalIndex>{totalIndexes || 0}</TotalIndex>
          </Flex>
          <TextField
            placeholder="Search coin,Indexes etc"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
        </Flex>
      </SearchContainer>
      <Table columns={columns(editIndex)} dataSource={indexes} />
      <Pagination
        currentPage={currentPage}
        total={totalIndexes}
        onChange={(page: number) => setCurrentPage(page)}
      />
      <AddIndexModal isModalOpen={openmodal} setIsModalOpen={setOpenModal} />
      <EditIndexModal
        isModalOpen={openEditModal}
        setIsModalOpen={setOpenEditModal}
        index={currentIndex}
      />
    </Container>
  );
};

export default Dashboard;
