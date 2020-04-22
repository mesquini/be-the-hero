import styled from 'styled-components';

import background from '../../assets/heroes.png';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 90vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1150px) {
    padding: 15px;
  }

  @media screen and (max-width: 1000px) {
    .heroes {
      max-width: 60%;
    }
  }

  @media screen and (max-width: 920px) {
    display: block;
    justify-content: center;

    .heroes {
      display: none;
    }

    background: center fixed url(${background}) no-repeat;
  }

  @media screen and (max-width: 650px) {
    background-size: contain, cover;
  }
`;

export const Section = styled.section`
  width: 100%;
  max-width: 350px;
  margin-right: 50px;

  @media screen and (max-width: 920px) {
    flex-direction: column;
    text-align: center;
    margin: 0 auto;

    img {
      margin-bottom: 200px;
    }
  }

  @media screen and (max-device-width: 650px) {
    img {
      margin-bottom: 150px;
    }
  }

  @media screen and (max-device-width: 640px) {
    img {
      margin-bottom: 0;
    }
  }
`;

export const Form = styled.form`
  margin-top: 100px;

  .link {
    transition: all 0.2s ease;
  }

  .link svg {
    margin-right: 8px;
  }

  .link:hover {
    transform: scale(1.05, 1.05);
  }

  @media screen and (max-width: 920px) {
    margin-bottom: 100px;

    .link {
      color: #fff;
    }
  }
`;

export const Text = styled.h1`
  font-size: 32px;
  margin-bottom: 32px;

  @media screen and (max-width: 920px) {
    color: #fff;
  }
`;
