import React, { useState, useEffect } from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import NumberFormat from 'react-number-format';
import Modal from '../../components/Modal';
import {
  Container,
  Section,
  Form,
  Text,
  Description,
  ContainerChildren,
} from './styles';

import api from '../../services/api';

export default function EditIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const [error, setError] = useState('');

  const [incident, setIncident] = useState({});
  const [count, setCount] = useState(0);

  const ongId = localStorage.getItem('@ongId');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/profile', {
          headers: {
            Authorization: ongId,
          },
        });

        const incident = data.find(incident => incident.id === Number(id));

        setIncident(incident);
        setCount(Number(incident.description.length));
      } catch (error) {
        alert('Erro ao carregar a pagina!');
        history.push('/profile');
      }
    }
    load();
  }, [ongId, id, history]);

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

  async function handleEditIncident(e) {
    e.preventDefault();

    const obj = {
      title: incident.title,
      description: incident.description,
      value: incident.value,
    };

    const formatValue = value.replace(/\D*/, '').replace(',', '');
    const data = {
      title,
      description,
      value: Number(formatValue),
    };

    Object.keys(data).forEach(function(key) {
      if (!data[key]) {
        data[key] = obj[key];
      }
    });
    try {
      await api.put(`/incident/${id}`, data, {
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

  const format = value =>
    new Intl.NumberFormat('pt-Br', {
      currency: 'BRL',
      style: 'currency',
    }).format(value);

  return (
    <Container>
      <Modal data={error} />
      <ContainerChildren>
        <Section>
          <img src={logo} alt="Logo" />
          <Text>Alterar o caso</Text>
          <Description>
            Atualize o caso detalhadamente para encontrar um herói para resolver
            isso.
          </Description>
          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </Section>
        <Form onSubmit={handleEditIncident}>
          <input
            placeholder={incident.title}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder={incident.description}
            value={description}
            onBlur={() => verifyCount()}
            onChange={e => setDescription(e.target.value)}
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
            placeholder={format(incident.value)}
            value={value}
            prefix="R$"
            thousandSeparator
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            <p>Salvar</p>
          </button>
        </Form>
      </ContainerChildren>
    </Container>
  );
}
