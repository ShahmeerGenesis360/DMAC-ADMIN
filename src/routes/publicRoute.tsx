import { Flex, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { getAuthToken } from "../services/auth";

interface IPublicRoute {
  component: React.ComponentType; // Accepts only React components
}

const StyledSpin = styled(Spin)`
  .ant-spin-dot-holder {
    color: #78DA89;
  }
`;

const PublicRoute = ({ component: Component, ...rest }: IPublicRoute): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authState = await getAuthToken();
      setIsAuthenticated(!!authState);
    };

    checkAuth();
  }, []);
  
  if (isAuthenticated === null) {
    // Optionally, return a loading spinner or placeholder while checking auth
    return (
      <Flex style={{ height: '100vh', width: '100vw', background: "#1B1B1B" }} justify="center" align="center" gap="middle">
        <StyledSpin size="large" />
      </Flex>
    )
  }
  if (isAuthenticated) {
    return <Navigate to={`/`} replace />
  }
  return <Component {...rest} />
};

export default PublicRoute;
