import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 20px;
    margin-left: 24px;
  }

  img {
    height: 64px;
  }

  div {
    a {
      width: 260px;
      margin-left: auto;
      margin-top: 0;

      p {
        transition: transform 0.2s ease;
      }
    }

    a:hover {
      p {
        transform: scale(1.2, 1.2);
      }
    }

    button {
      height: 60px;
      width: 60px;
      border-radius: 4px;
      border: 1px solid #dcdce6;
      margin-left: 16px;
      border-color: ${({ theme }) => theme.text};
      background: ${({ theme }) => theme.power};
      transition: background-color 0.5s, border-color 0.3s;

      svg {
        color: ${({ theme }) => theme.powerHover};
        transition: transform 0.5s, color 0.3s;
      }
    }
    button:hover {
      border-color: #999;
      background-color: ${({ theme }) => theme.powerHover};
      svg {
        color: ${({ theme }) => theme.powerSvg};
        transform: scale(1.18);
      }
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    div {
      display: flex;
      justify-content: space-between;
      height: 50px;

      .button {
        display: flex;
        height: 50px;
        width: 250px;
        justify-content: center;
        align-items: center;

        p:hover {
          transform: scale(1.05);
        }
      }

      button {
        height: 50px;
        width: 20%;
      }
    }

    span {
      margin: 20px 0 20px 0;
    }
  }
`;

export const Title = styled.h1`
  margin-top: 80px;
  margin-bottom: 24px;
`;

export const ListCases = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Case = styled.li`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;

  button {
    position: absolute;
    right: 24px;
    top: 24px;
    border: 0;
    background: transparent;
    transition: transform 0.2s;

    svg {
      color: #a8a8b3;
      transition: color 0.2s;
    }
  }

  button + button {
    margin-right: 40px;
  }

  button:hover {
    transform: scale(1.18);
    svg {
      color: #e02041;
    }
  }

  strong {
    display: block;
    margin-bottom: 16px;
    color: #41414d;
  }

  p + strong {
    margin-top: 32px;
  }

  p {
    color: #737380;
    line-height: 21px;
    font-size: 16px;
  }
`;

export const IncidentEmpty = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 300px;
`;
