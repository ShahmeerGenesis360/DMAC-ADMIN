import React, { useState } from 'react';
import { Dropdown, Flex, Space } from 'antd';
import styled from 'styled-components';
import MonkeyIcon from '../../assets/monkey.svg';
import { ImageBox, TextField, Table, Pagination, Button, LineChart, AddIndexModal, BarChart } from '../../components';
import { EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Container, Header, SearchContainer, StyledMenu, StyledSelect, SubHeader, SubTitle, Title, TotalIndex } from './styles';

import { Card, Typography, Select } from 'antd';
import { transactionChart, userChart } from '../../constants';

const { Title: AntdTitle } = Typography;
const { Option } = Select;

// Styled Components for Cards
const DashboardContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  padding-bottom: 20px;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(180deg, #1D1D1D 0%, #282828 100%);;
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


const items = [
  { key: '1', label: 'Edit', icon: <EditOutlined /> },
  { key: '2', label: 'View', icon: <EyeOutlined /> },
];


const data = Array.from({ length: 5 }, (_, i) => ({
  key: i,
  index: `Index ${i + 1}`,
  rank: 200 - i * 10,
  price: 'Lorem',
  tvl: 'Lorem',
  holder: 'Lorem',
  address: 'Lorem',
}));

const columns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
    render: (text: string) => (
      <IndexName>
        <ImageBox src={MonkeyIcon} />
        <IndexText>{text}</IndexText>
      </IndexName>
    ),
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'TVL',
    dataIndex: 'tvl',
    key: 'tvl',
  },
  {
    title: 'Holders',
    dataIndex: 'holder',
    key: 'holder',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text: string) => (
      <Flex justify="space-between">
        {text}
        <Space size='middle'>
          <Dropdown menu={{ items }} overlayClassName="custom-dropdown">
            <MoreOutlined
              style={{ fontSize: '20px', cursor: 'pointer' }}
            />
          </Dropdown>
          <StyledMenu />
        </Space>
      </Flex>
    )
  },
];


const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openmodal, setOpenModal] = useState(false);

  return (
    <Container>
      <Flex justify="space-between">
        <Header>Dashboard</Header>
        <Button text='Add Index' icon={<PlusOutlined size={20} />} onClick={() => setOpenModal(true)} />
      </Flex>
      <SubHeader>Here’s your analytics details:</SubHeader>
      <DashboardContainer>
        {/* Card 1: Total Value Locked */}
        <StyledCard>
          <CardHeader>
            <CardText>Total Value Locked</CardText>
            <StyledSelect defaultValue="Monthly" size="small">
              <Option value="monthly">Monthly</Option>
              <Option value="weekly">Weekly</Option>
            </StyledSelect>
          </CardHeader>
          <AntdTitle level={4} style={{ color: '#4caf50' }}>
            4,556 <span style={{ fontSize: 12, color: '#7cf97c' }}>+5.2%</span>
          </AntdTitle>
          <LineChart data={userChart} />
        </StyledCard>

        {/* Card 2: Total Users */}
        <StyledCard>
          <CardHeader>
            <CardText>Total Users • 20 new users</CardText>
            <StyledSelect defaultValue="Monthly" size="small">
              <Option value="monthly">Monthly</Option>
              <Option value="weekly">Weekly</Option>
            </StyledSelect>
          </CardHeader>
          <AntdTitle level={4} style={{ color: '#fff' }}>
            30,000 users since <span style={{ color: '#4caf50' }}>Jan</span>
          </AntdTitle>
          <LineChart data={userChart} />
        </StyledCard>

        {/* Card 3: Transactions */}
        <StyledCard>
          <CardHeader>
            <CardText>Transactions</CardText>
            <StyledSelect defaultValue="Weekly" size="small">
              <Option value="weekly">Weekly</Option>
              <Option value="daily">Daily</Option>
            </StyledSelect>
          </CardHeader>
          <AntdTitle level={4} style={{ color: '#fff' }}>
            Transactions in past week <span style={{ color: '#4caf50' }}>Jan</span>
          </AntdTitle>
          <LineChart legend={true} data={transactionChart} />
        </StyledCard>
      </DashboardContainer>

      <StyledCard>
        <CardHeader>
          <CardText>Total Fee Revenue</CardText>
          <StyledSelect defaultValue="Monthly" size="small">
            <Option value="monthly">Monthly</Option>
            <Option value="weekly">Weekly</Option>
          </StyledSelect>
        </CardHeader>
        <AntdTitle level={4} style={{ color: '#4caf50' }}>
          4,556 <span style={{ fontSize: 12, color: '#7cf97c' }}>+5.2%</span>
        </AntdTitle>
        <BarChart />
      </StyledCard>
      <SearchContainer>
        <Title>Indexes</Title>
        <Flex className='ant_flex' align="center" justify="end" gap={15}>
          <Flex gap={10}>
            <SubTitle>Total No Of Index:</SubTitle>
            <TotalIndex>02</TotalIndex>
          </Flex>
          <TextField placeholder='Search coin,Indexes etc' />
        </Flex>
      </SearchContainer>
      <Table
        columns={columns}
        dataSource={data.slice((currentPage - 1) * 10, currentPage * 10)}
      />
      <Pagination
        currentPage={currentPage}
        total={data.length}
        onChange={(page: number) => setCurrentPage(page)}
      />
      <AddIndexModal isModalOpen={openmodal} setIsModalOpen={setOpenModal} />
    </Container>
  );
};

export default Dashboard;