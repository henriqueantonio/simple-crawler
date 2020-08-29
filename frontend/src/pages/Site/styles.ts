import styled from 'styled-components';
import { darken, shade } from 'polished';
import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';
import { Link } from 'react-router-dom';

import { Form as FormLib } from '@unform/web';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-left: 1px solid #222;
  min-width: 200px;
  background: ${darken(0.01, '#282c30')};
  width: 25%;
  height: 100%;
  -webkit-box-shadow: 3px 3px 5px 0px #222;
  -moz-box-shadow: 3px 3px 5px 0px #222;
  box-shadow: 3px 3px 3px 0px #222;

  button {
    width: 80%;
  }

  div {
    background: #282c30;
    height: 100px;
    width: 100%;
    margin-top: 20px;
    padding: 20px;

    h1 {
      color: #fff;
      margin-bottom: 5px;
    }

    color: #999;
    font-family: sans-serif;
  }

  div:first-child {
    margin-top: 0;
    background: ${darken(0.01, '#282c30')};
    border-bottom: 1px solid #333;
    height: 103px;

    padding: 25px 30px;

    h2 {
      color: #fff;
      margin-bottom: 5px;
      overflow: hidden;
    }

    color: #fff;
    font-family: sans-serif;
  }
`;

export const Button = styled(ButtonComp)``;

export const Content = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const FormSearch = styled(FormLib)`
  display: flex;
  align-items: center;
  padding: 0 20px;

  button {
    height: 45px;
    width: 200px;
    margin-bottom: 14px;
    margin-left: 10px;
  }
`;

export const Input = styled(InputComp).attrs({
  containerStyle: {
    height: '45px',
  },
})``;

export const List = styled.div`
  padding: 20px 10px;

  div {
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #333;
    overflow: hidden;

    h1 {
      color: #fff;
      font-family: sans-serif;
      font-weight: 500;
      margin-bottom: 5px;
    }

    a {
      color: #999;
      font-family: sans-serif;
      text-decoration: none;
    }

    h3 {
      font-family: sans-serif;
      margin-top: 10px;
      color: #fff;
      font-weight: 300;
    }
  }

  div:first-child {
    margin-top: 0;
  }
`;

export const LoadingBackground = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  background: #282c30;
  opacity: 90%;
  transition: color 0.5s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-family: sans-serif;
    font-weight: 300;
    color: #fff;
  }
`;

export const GoToEditSite = styled(Link)`
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
