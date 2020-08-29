import styled from 'styled-components';
import { shade } from 'polished';
import InputComp from '../../components/Input';
import ButtonComp from '../../components/Button';
import { Form as FormLib } from '@unform/web';

export const Container = styled.div`
  padding: 5% 5%;

  h2 {
    padding: 0 15.5%;
    color: #fff;
    align-self: flex-start;
  }

  h4 {
    margin-top: 20px;
    margin-bottom: 8px;
    color: #fff;
    padding: 0 10px;
    align-self: flex-start;
  }
`;

export const Form = styled(FormLib)`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 70%;

    a {
      text-decoration: none;
      color: #999;
      font-family: sans-serif;
    }
  }

  div:last-child {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    button:nth-child(2) {
      background: #c53030;

      :hover {
        background: ${shade(0.2, '#c53030')};
      }
    }

    button:last-child {
      background: #c53030;

      :hover {
        background: ${shade(0.2, '#c53030')};
      }
    }
  }
`;

export const Input = styled(InputComp).attrs({
  containerStyle: {
    width: '100%',
    height: '45px',
  },
})``;

export const Button = styled(ButtonComp)`
  width: 30%;
  height: 50px;

  svg {
    margin-right: 5px;
  }
`;
