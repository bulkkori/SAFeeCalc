import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s, color 0.3s;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s, color 0.3s;
`;

const Section = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${(props) => props.theme.text};
  flex-grow: 1;
`;

const Input = styled.input`
  margin-top: 8px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SwitchWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4cd964;
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: calc(100% - 40px);
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: background-color 0.3s;

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  ${SwitchInput}:checked + & {
    background-color: #4cd964;

    &:before {
      transform: translateX(20px);
    }
  }
`;

const Result = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;

const DarkModeToggle = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const InfoCard = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props) => props.theme.infoBackground};
  color: ${(props) => props.theme.infoText};
  border: 1px solid ${(props) => props.theme.infoBorderColor};
  border-radius: 4px;
`;

const lightTheme = {
  background: '#fff',
  text: '#333',
  infoBackground: '#f4f4f4',
  infoText: '#333',
  infoBorderColor: '#ccc',
};

const darkTheme = {
  background: '#333',
  text: '#fff',
  infoBackground: '#444',
  infoText: '#fff',
  infoBorderColor: '#666',
};

const FeeCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState([]);
  const [discount10, setDiscount10] = useState(false);
  const [discount30, setDiscount30] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const calculateFee = () => {
    const baseFee = originalPrice * 0.1;
    let discountedFee = baseFee;

    if (discount10 && discount30) {
      discountedFee *= 0.6;
    } else if (discount10) {
      discountedFee *= 0.9;
    } else if (discount30) {
      discountedFee *= 0.7;
    }

    return discountedFee;
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue ? Math.floor(parseFloat(inputValue)) : inputValue;
    setOriginalPrice(numericValue);
  };

  const handleDiscount10Toggle = () => {
    setDiscount10(!discount10);
  };

  const handleDiscount30Toggle = () => {
    setDiscount30(!discount30);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container>
        <StyledContainer>
          <Section>
            <Label>
              판매 금액
              <Input type="number" value={originalPrice} onChange={handleInputChange} placeholder='금액을 입력해주세요.' />
            </Label>
          </Section>

          <Section>
            <Label>
              수수료
              <Result>{calculateFee()} SP</Result>
            </Label>
          </Section>

          <Section>
            <Label>
              거래 수수료 할인 버프
              <SwitchWrapper>
                <SwitchInput type="checkbox" checked={discount10} onChange={handleDiscount10Toggle} />
                <SwitchSlider />
              </SwitchWrapper>
            </Label>
          </Section>

          <Section>
            <Label>
              거래 수수료 30% 할인권
              <SwitchWrapper>
                <SwitchInput type="checkbox" checked={discount30} onChange={handleDiscount30Toggle} />
                <SwitchSlider />
              </SwitchWrapper>
            </Label>
          </Section>

          <Section>
            <Label>
              수령 금액
              <Result>{(originalPrice - calculateFee())} SP</Result>
            </Label>
          </Section>

          <DarkModeToggle onClick={toggleDarkMode}>
            {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          </DarkModeToggle>

          <InfoCard>
            <h3>버그 및 건의사항 제보:</h3>
            <li>이메일: kkomunity777@gmail.com/li>
          </InfoCard>
        </StyledContainer>
      </Container>
    </ThemeProvider>
  );
};

export default FeeCalculator;
