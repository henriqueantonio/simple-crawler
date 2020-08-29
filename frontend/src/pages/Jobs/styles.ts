import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  margin: 20px;

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
