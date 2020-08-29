import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div`
  display: block;
  padding: 20px;
  flex: 1;

  table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;
  }

  thead {
    background: #3b3973;
    color: #ffff;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: start;
  }

  td {
    border-bottom: 1px solid #3c434a;
    background: #282c30;
    color: #fff;
    font-weight: 500;
    font-family: sans-serif;

    a {
      color: #fff;
      text-decoration: none;
    }
  }

  tr {
    -webkit-box-shadow: 6px 6px 5px 0px #222;
    -moz-box-shadow: 6px 6px 5px 0px #222;
    box-shadow: 6px 6px 5px 0px #222;
  }
`;

export const GoToSettings = styled(Link)``;

export const GoToCreateSite = styled(Link)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  text-decoration: none;
  font-size: 20px;

  bottom: 60px;
  left: 60px;

  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #3b3973;

  &:hover {
    background: ${shade(0.2, '#3b3973')};
  }

  -webkit-box-shadow: 3px 3px 5px 0px #222;
  -moz-box-shadow: 3px 3px 5px 0px #222;
  box-shadow: 3px 3px 5px 0px #222;
`;
