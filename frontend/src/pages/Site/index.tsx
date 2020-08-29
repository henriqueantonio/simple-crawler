import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaEdit } from 'react-icons/fa';
import ContainerWithSidebar from '../../components/ContainerWithSidebar';
import { Player } from '@lottiefiles/react-lottie-player';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Details,
  Button,
  Content,
  FormSearch,
  Input,
  List,
  LoadingBackground,
  GoToEditSite,
} from './styles';

interface IState {
  id: string;
  name: string;
  url: string;
}

interface IPage {
  id: string;
  title: string;
  url: string;
  description: string;
}

const Site: React.FC = () => {
  const { state }: { state: IState } = useLocation();
  const [loading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const [descriptionsCount, setDescriptionsCount] = useState(0);
  const [keywordsCount, setKeywordsCount] = useState(0);
  const [pages, setPages] = useState<IPage[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadDetails() {
      const response = await api.get(`/pages/details/${state.id}`);
      const { pages, descriptions, keywords } = response.data;
      setPagesCount(pages);
      setDescriptionsCount(descriptions);
      setKeywordsCount(keywords);
    }
    loadDetails();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await api.get(`/pages/details/${state.id}`);
      const { pages, descriptions, keywords } = response.data;
      setPagesCount(pages);
      setDescriptionsCount(descriptions);
      setKeywordsCount(keywords);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await api.get(`/sites/${state.id}`);
      const status = response.data.status;
      setLoading(status === 'crawling');
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCrawling = useCallback(async () => {
    try {
      await api.post(`/sites/${state.id}/crawler`);
      addToast({
        type: 'success',
        title: 'Crawling',
        description: 'The site is crawling',
      });
      setLoading(true);
    } catch (err) {
      setLoading(false);
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Crawling already running',
      });
    }
  }, []);

  const handleSearch = useCallback(async ({ search }: { search: string }) => {
    if (!search) {
      setPages([]);
      return;
    }

    const response = await api.get(
      `/pages?siteId=${state.id}&search=${search}`
    );

    const newResponse = response.data.map((page: IPage) => ({
      id: page.id,
      title: page.title,
      description: page.description,
      url: page.url,
    }));

    setPages(newResponse);
  }, []);

  return (
    <ContainerWithSidebar>
      <Container>
        <Details>
          <div>
            <h2>{state.name}</h2>
            Details
          </div>

          <Button onClick={handleCrawling} loading={loading}>
            Start crawling
          </Button>

          <div>
            <h1>{pagesCount}</h1>
            Pages discovered
          </div>

          <div>
            <h1>{descriptionsCount}</h1>
            Descriptions discovered
          </div>

          <div>
            <h1>{keywordsCount}</h1>
            Keywords discovered
          </div>
        </Details>
        <Content>
          {loading && (
            <LoadingBackground>
              <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_VLRaqO.json"
                style={{ height: '400px' }}
              />
              <h2>The spider is looking for some details...</h2>
            </LoadingBackground>
          )}
          <FormSearch onSubmit={handleSearch}>
            <Input
              name="search"
              icon={FaSearch}
              placeholder="Search something..."
            />
            <Button type="submit">Search</Button>
          </FormSearch>
          <List>
            {pages.map((page) => (
              <div key={page.id}>
                <h1>{page.title}</h1>
                <a>{page.url}</a>
                <h3>{page.description}</h3>
              </div>
            ))}
          </List>
        </Content>
      </Container>
      <GoToEditSite
        to={{
          pathname: `/sites/${state.id}/edit`,
          state: { name: state.name, url: state.url, id: state.id },
        }}
      >
        <FaEdit size={20} color="#fff" />
      </GoToEditSite>
    </ContainerWithSidebar>
  );
};

export default Site;
