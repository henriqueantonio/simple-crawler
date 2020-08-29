import React, { useState, useEffect } from 'react';
import ContainerWithSidebar from '../../components/ContainerWithSidebar';

import api from '../../services/api';

import { Container } from './styles';

interface Job {
  siteName: string;
  jobId: string;
  expression: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const response = await api.get('/sites/scheduler');

      const data = response.data;

      setJobs(data);
    }
    loadJobs();
  });
  return (
    <ContainerWithSidebar>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>Cron Scheduling</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job: Job) => (
              <tr key={job.jobId}>
                <td>{job.siteName}</td>
                <td>{job.expression}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </ContainerWithSidebar>
  );
};

export default Jobs;
