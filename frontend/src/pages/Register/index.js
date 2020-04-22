import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  GroupInput,
} from './styles';

import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const [data, setData] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    const format = whatsapp.replace(/[^a-zA-Z0-9]/g, '');

    const data = { name, email, whatsapp: format, city, uf };

    try {
      const resp = await api.post('/ongs', data);

      const dataModal = {
        open: true,
        title: 'ONG cadastrada com sucesso!',
        info: `Seu ID de acesso é <strong>${resp.data.id}</strong>`,
        action: 'handleHome',
      };

      setData(dataModal);
    } catch (errors) {
      setData('');

      const data = {
        open: true,
        title: 'Erro ao fazer o cadastro!',
        info: 'Erro ao realizar o cadastro, tente novamente!',
        action: 'handleClose',
        error: errors,
      };

      setData(data);
    }
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container>
      <Modal data={data} />
      <ContainerChildren>
        <Section>
          <img src={logo} alt="Logo" />
          <Text>Cadastro</Text>
          <Description>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </Description>
          <Link className="link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o inicio
          </Link>
        </Section>
        <Form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(capitalizeFirstLetter(e.target.value))}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <NumberFormat
            placeholder="WhatsApp"
            value={whatsapp}
            mask="_"
            format="(##)# ####-####"
            onChange={e => setWhatsapp(e.target.value)}
            required
          />
          <GroupInput>
            <input
              placeholder="Cidade"
              type="text"
              value={city}
              onChange={e => setCity(capitalizeFirstLetter(e.target.value))}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={e =>
                setUf(e.target.value.replace(/\d/, '').toUpperCase())
              }
              maxLength={2}
            />
          </GroupInput>
          <button className="button" type="submit">
            <p>Cadastrar</p>
          </button>
        </Form>
      </ContainerChildren>
    </Container>
  );
}
