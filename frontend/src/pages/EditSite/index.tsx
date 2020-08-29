import React, { useState, useRef, useEffect, useCallback } from 'react';

import ContainerWithSidebar from '../../components/ContainerWithSidebar';
import { Container, Input, Button, Form } from './styles';
import { FaChevronRight, FaTrashAlt, FaPenAlt } from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

interface IState {
  id: string;
  name: string;
  url: string;
}

interface IRequest {
  name: string;
  url: string;
  crawling: string;
}

const EditSite: React.FC = () => {
  const { state }: { state: IState } = useLocation();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [expression, setExpression] = useState('');

  useEffect(() => {
    async function loadExpression() {
      const response = await api.get(`/sites/${state.name}/scheduler`);
      if (response.data) {
        console.log(state.name);
        setExpression(response.data.expression);
      }
    }
    loadExpression();
  }, []);

  const handleSubmit = useCallback(async (data: IRequest) => {
    try {
      if (data.crawling) {
        await api.post(`/sites/${state.id}/scheduler`, {
          expression: data.crawling,
        });
        addToast({
          type: 'success',
          title: 'Job validated',
          description: 'The job was scheduled',
        });
        setExpression(data.crawling);
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Expression invalid',
      });
    }

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        url: Yup.string().required('url required').url('URL required'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, url } = data;

      await api.put(`/sites/${state.id}`, { name, url });

      addToast({
        type: 'success',
        title: 'Site updated',
        description: 'The site was updated',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Error',
        description: 'Name or URL already defined',
      });
    }
  }, []);

  const handleExcludeJob = useCallback(async () => {
    try {
      await api.delete(`/sites/${state.id}/scheduler`);
      addToast({
        type: 'success',
        title: 'Job validated',
        description: 'The job was scheduled',
      });
      setExpression('');
      formRef.current?.clearField('crawling');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Error ocurred',
      });
    }
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/sites/${state.id}`);

      addToast({
        type: 'success',
        title: 'Success',
        description: 'Site deleted',
      });

      history.push('/');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Error when deleting your site',
      });
    }
  }, []);

  return (
    <ContainerWithSidebar>
      <Container>
        <Form
          initialData={{
            name: state.name,
            url: state.url,
            crawling: expression,
          }}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <h2>Edit Site</h2>
          <div>
            <h4>Name</h4>
            <Input
              name="name"
              placeholder="New name..."
              icon={FaChevronRight}
            />
          </div>

          <div>
            <h4>URL</h4>
            <Input name="url" placeholder="New URL..." icon={FaChevronRight} />
          </div>

          <div>
            <h4>Crawling Scheduling</h4>
            <Input
              name="crawling"
              placeholder="* * * * *"
              icon={FaChevronRight}
            />
            <a
              href="https://github.com/node-cron/node-cron"
              target="_blank"
              rel="noopener noreferrer"
            >
              Don't know cronjob? Learn here
            </a>
          </div>

          <div>
            <Button type="submit">
              <FaPenAlt size={13} color="#fff" />
              Edit
            </Button>
            <Button onClick={handleDelete}>
              <FaTrashAlt size={13} color="#fff" />
              Delete
            </Button>
            {expression && (
              <Button onClick={handleExcludeJob}>
                <FaTrashAlt size={13} color="#fff" />
                Delete Job
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </ContainerWithSidebar>
  );
};

export default EditSite;
