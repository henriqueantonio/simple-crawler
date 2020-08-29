import React, { useEffect, useState } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import ContainerWithSidebar from '../../components/ContainerWithSidebar';

import { Container, GoToSettings, GoToCreateSite } from './styles';
import api from '../../services/api';

interface Site {
  id: string;
  name: string;
  url: string;
  lastUpdate: string;
}

interface SiteApi extends Site {
  updated_at: string;
}

const Sites: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    async function loadSites() {
      const response = await api.get<SiteApi[]>('/sites');

      const data = response.data;

      const newResponse = data.map((site: SiteApi) => ({
        id: site.id,
        name: site.name,
        url: site.url,
        lastUpdate: formatRelative(parseISO(site.updated_at), new Date()),
      }));

      setSites(newResponse);
    }
    loadSites();
  }, []);

  return (
    <ContainerWithSidebar>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Last Update</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.name}>
                <td>{site.name}</td>
                <td>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    {site.url}
                  </a>
                </td>
                <td>{site.lastUpdate}</td>
                <td>
                  <GoToSettings
                    to={{
                      pathname: `/site/${site.id}`,
                      state: { name: site.name, url: site.url, id: site.id },
                    }}
                  >
                    <FaEdit color="#ffff" size={15} />
                  </GoToSettings>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <GoToCreateSite to="/sites/create">+</GoToCreateSite>
    </ContainerWithSidebar>
  );
};

export default Sites;
