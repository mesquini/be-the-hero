import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit, FiFrown } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import {
  Container,
  Header,
  Title,
  ListCases,
  Case,
  IncidentEmpty,
} from './styles';

import api from '../../services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('@ongId');
  const ongName = localStorage.getItem('@ongName');

  const history = useHistory();

  useEffect(() => {
    async function load() {
      const { data } = await api.get('/profile', {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(data);
    }
    load();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incident/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente!');
    }
  }

  async function handleEditIncident(incident) {
    try {
      history.push(`/incident/edit/${incident.id}`);
    } catch (error) {
      alert('Erro ao editar caso, tente novamente!');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="logo" />
        <span>Bem vindo(a), {ongName}</span>
        <div>
          <Link className="button" to="/incidents/new">
            <p>Cadastrar novo caso</p>
          </Link>
          <button type="button" onClick={handleLogout}>
            <FiPower size={18} />
          </button>
        </div>
      </Header>

      {incidents.length > 0 && (
        <>
          <Title>Casos cadastrados</Title>
          <ListCases>
            {incidents.map(incident => (
              <Case key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(incident.value)}
                </p>

                <button
                  type="button"
                  onClick={() => handleDeleteIncident(incident.id)}
                >
                  <FiTrash2 size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleEditIncident(incident)}
                >
                  <FiEdit size={20} />
                </button>
              </Case>
            ))}
          </ListCases>
        </>
      )}
      {incidents.length === 0 && (
        <IncidentEmpty>
          Você não possuí nenhum caso
          <FiFrown color="red" style={{ marginLeft: 20 }} />
        </IncidentEmpty>
      )}
    </Container>
  );
}
