import React, { useEffect, useState } from 'react'
import type { MenuInfo } from 'rc-menu/lib/interface';
import { CustomModalStyle, Logo, LogoutButton, SidebarContainer, SidebarWrapper, StyledMenu, Text } from './styles';
import LogoIcon from '../../assets/logoIcon.svg';
import LogoutIcon from '../../assets/logout.svg';
import { DashboardIcon } from '../../assets/dashboard';
import { WalletIcon } from '../../assets/wallet';
import ImageBox from '../image';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { logout } from '../../services/auth';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';



const Sidebar = () => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const [selected, setSelected] = useState('')
  const { pathname } = useLocation();
  const okHandler = () => {
    logout();
    navigate('/login')
  }

  const confirm = () => {
    modal.confirm({
      title: '',
      icon: null,
      content: 'Are you sure you wants to logout?',
      okText: 'Logout',
      onOk: okHandler,
      cancelText: 'Cancel',
      className: 'custom-modal',
      centered: true,
      maskStyle: {
        backdropFilter: "blur(15px)",
        background: "#1C1C1C1A",
      }
    });
  };
  useEffect(() => {
    setSelected(pathname.split('/')[1])
  }, [pathname])
  const handleChange = (value: MenuInfo) => {
    setSelected(value.key)
    navigate(value.key)
  }
  const menuItems = [
    {
      key: "",
      icon: <DashboardIcon fill={selected === "" ? "#242931" : "#fff"} />,
      label: <Text>Dashboard</Text>,
    },
    {
      key: "top-wallet",
      icon: <WalletIcon fill={selected === "top-wallet" ? "#242931" : "#fff"} />,
      label: <Text>Top Wallet</Text>,
    },
  ];
  return (
    <SidebarWrapper>
      <CustomModalStyle />
      <SidebarContainer>
        <Logo>
          <ImageBox src={LogoIcon} />
        </Logo>
        <StyledMenu
          mode="inline"
          theme="dark"
          style={{ background: "transparent" }}
          selectedKeys={[selected]}
          onClick={handleChange}
          items={menuItems} // Use the `items` array to define menu items
        />
        <WalletMultiButton />
        <LogoutButton onClick={confirm}>
          <ImageBox src={LogoutIcon} />
          Logout
        </LogoutButton>
        {contextHolder}
      </SidebarContainer>
    </SidebarWrapper>
  )
}

export default Sidebar