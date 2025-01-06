import React, { ChangeEvent, useEffect, useState } from 'react';
import { Flex, Space } from 'antd';
import styled from 'styled-components';
import TokenIcon from '../../assets/token.svg';
import { ImageBox, TextField, Table, Pagination } from '../../components';
import { MoreOutlined } from '@ant-design/icons';
import { Container, Header, SearchContainer, SubHeader, Title } from './styles';
import { getAllWallet } from '../../services/wallet';



const WalletName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WalletText = styled.span`
  font-weight: 400;
`;


interface IProps {
  data: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    users: IWallet[] | [];
  }
  status: boolean
}


const columns = [
  {
    title: 'Wallet Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: { username?: string }) => (
      <WalletName>
        <ImageBox src={TokenIcon} />
        <WalletText>{text || record.username}</WalletText>
      </WalletName>
    ),
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    render: () => ("Loreum")
  },
  {
    title: 'Address',
    dataIndex: 'walletAddress',
    key: 'walletAddress',
  },
  {
    title: 'Purchased Index',
    dataIndex: 'purchasedIndex',
    key: 'purchasedIndex',
    render: () => ("Loreum")
  },
  {
    title: 'Total Worth',
    dataIndex: 'totalWorth',
    key: 'totalWorth',
    render: () => (
      <Flex justify="space-between">
        {"Loreum"}
        <Space size='middle'>
          <MoreOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />
        </Space>
      </Flex>
    )
  },
];


const TopWallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState<IWallet[] | []>([]);

  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    getAllWallet({ page: currentPage, search: searchValue }).then((res: IProps) => {
      setCurrentPage(res.data.currentPage)
      setTotalUsers(res.data.totalUsers)
      setUsers(res.data.users)
    })
  }, [currentPage, searchValue])

  return (
    <Container>
      <Header>Top Wallet</Header>
      <SubHeader>Here's Your Wallets Details.</SubHeader>
      <SearchContainer>
        <Title>My Wallet</Title>
        <TextField placeholder='Search your wallet' onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
      </SearchContainer>
      <Table
        columns={columns}
        dataSource={users}
      />
      <Pagination
        currentPage={currentPage}
        total={totalUsers}
        onChange={(page: number) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default TopWallet;
