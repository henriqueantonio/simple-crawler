import React, { useRef, useCallback } from 'react';

import ContainerWithSidebar from '../../components/ContainerWithSidebar';
import { Container, Input, Button, Form } from './styles';
import { FaChevronRight } from 'react-icons/fa';
import api from '../../services/api';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';
import { useHistory } from 'react-router-dom';

interface Request {
  name: string;
  url: string;
}

const CreateSite: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: Request) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        url: Yup.string().required('url required').url('URL required'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/sites', data);

      addToast({
        type: 'success',
        title: 'Site created',
        description: 'The site was created',
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      });
    }
  }, []);

  return (
    <ContainerWithSidebar>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Create Site</h2>
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

          <Button type="submit">Create</Button>
        </Form>
      </Container>
    </ContainerWithSidebar>
  );
};

export default CreateSite;
