import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import NumberFormat from 'react-number-format';
import {
  Container,
  Section,
  Form,
  Text,
  Description,
  ContainerChildren,
} from './styles';

import api from '../../services/api';

import Modal from '../../components/Modal';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  const [error, setError] = useState('');

  const ongId = localStorage.getItem('@ongId');
  const history = useHistory();

  useEffect(() => {
    let len = Number(description.length);
    setCount(len);
  }, [description]);

  const verifyCount = () => {
    if (count < 15) {
      setError('');
      const data = {
        open: true,
        title: 'Aviso: descrição!',
        info: 'Descrição tem que ter no minimo 15 caracteres!',
        action: 'handleClose',
      };
      setError(data);

      return false;
    }
    return true;
  };

  async function handleNewIncident(e) {
    e.preventDefault();

    if (verifyCount()) {
      const formatValue = value.replace(/\D*/, '').replace(',', '.');

      const data = {
        title,
        description,
        value: Number(formatValue),
      };

      try {
        await api.post('/incidents', data, {
          headers: {
            Authorization: ongId,
          },
        });

        history.push('/profile');
      } catch (errors) {
        setError('');

        const data = {
          open: true,
          title: 'Erro ao cadastrar caso!',
          info: 'Erro ao realizar o cadastro, tente novamente!',
          action: 'handleClose',
          error: errors.toString(),
        };

        setError(data);
      }
    }
  }

  return (
    <Container>
      <Modal data={error} />
      <ContainerChildren>
        <Section>
          <img src={logo} alt="Logo" />
          <Text>Cadastrar novo caso</Text>
          <Description>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </Description>
          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </Section>
        <Form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onBlur={() => verifyCount()}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <p
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            Caracteres: {count}
          </p>
          <NumberFormat
            placeholder="Valor em reais"
            value={value}
            prefix="R$"
            thousandSeparator={true}
            onChange={e => setValue(e.target.value)}
            required
          />
          <button className="button" type="submit">
            <p>Cadastrar</p>
          </button>
        </Form>
      </ContainerChildren>
    </Container>
  );
}
