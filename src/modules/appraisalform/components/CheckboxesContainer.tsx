import styled from 'styled-components';

const CheckboxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 18px;
  grid-row-gap: 10px;

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

export default CheckboxesContainer;
