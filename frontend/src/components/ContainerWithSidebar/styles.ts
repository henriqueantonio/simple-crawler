import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  background: #282c30;
  height: 100%;
  width: 250px;
  -webkit-box-shadow: 4px 4px 5px 0px #222;
  -moz-box-shadow: 4px 4px 5px 0px #222;
  box-shadow: 4px 4px 5px 0px #222;
`;

export const Icon = styled(Link)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  img {
    width: 100px;
    height: 50px;
  }

  h3 {
    color: #fff;
  }

  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

export const HeaderContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  padding: 10px 30px;

  a {
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: fit-content;
    cursor: pointer;
    text-decoration: none;

    h5 {
      margin-left: 10px;
      color: #ffff;
      font-size: 14px;
      font-family: sans-serif;
      font-weight: 530;
    }
  }

  a:hover {
    svg {
      fill: ${lighten(0.3, '#3b3973')};
    }

    h5 {
      color: ${lighten(0.3, '#3b3973')};
    }
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
`;
