import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  height: 100vh;
  padding: 20px;
  background-color: #0f0f0f;
  color: #fff;
  overflow-y: scroll;
`;

export const Header = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const SubHeader = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  .ant_flex {
    flex: 1;
  }
  .ant-input-outlined {
    max-width: 350px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const SubTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
`;

export const TotalIndex = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: #91e8b5;
`;
