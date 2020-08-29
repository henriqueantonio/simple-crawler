import React from 'react';
import { FaGithub, FaFileAlt, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Header, Icon, HeaderContent, Content } from './styles';

import IconSpider from '../../assets/icon.png';

const ContainerWithSidebar: React.FC = ({ children }, style = {}) => {
  return (
    <Container style={style}>
      <Header>
        <Icon to="/">
          <img src={IconSpider} alt="Icon" />
          <h3>CRAWLER</h3>
        </Icon>
        <HeaderContent>
          <Link to="/">
            <FaFileAlt color="#ffff" size={25} />
            <h5>Sites</h5>
          </Link>
          <Link to="/jobs">
            <FaBriefcase color="#ffff" size={25} />
            <h5>Jobs</h5>
          </Link>
          <a
            href="https://github.com/henriqueantonio/factobrasil-crawler"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub color="#ffff" size={25} />
            <h5>GitHub Source</h5>
          </a>
        </HeaderContent>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default ContainerWithSidebar;
