import React, { useState, useCallback, useEffect } from "react";

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Buscar
  useEffect(()=>{
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepos(JSON.parse(repoStorage))
    }
  }, [])
  //Salvar alterações
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repos));
  }, [repos])

  function handleinputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAlert(null);

      async function submit() {
        setLoading(true);
        setAlert(null);

        try {

          if(newRepo === ''){
            throw new Error('Você precisa indicar um repositorio!')
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repos.find(repos => repos.name === newRepo);

          if(hasRepo){
            throw new Error('Repositorio Duplicado!')
          }

          const data = {
            name: response.data.full_name,
          };

          setRepos([...repos, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repos]
  );

  const handleDelete = useCallback(
    (repo) => {
      const find = repos.filter((r) => r.name !== repo);
      setRepos(find);
    },
    [repos]
  );

  return (
    <div>
      <Container>
        <h1>
          <FaGithub size={25} />
          Meus Repositorios
        </h1>

        <Form onSubmit={handleSubmit} Error={alert}>
          <input
            type="text"
            placeholder="Adiconar Repositorios"
            value={newRepo}
            onChange={handleinputChange}
          />
          <SubmitButton Loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repos.map((repo) => (
            <li key={repo.name}>
              <span>
                <DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaTrash size={14} />
                </DeleteButton>
                {repo.name}
              </span>
              <a href="">
                <FaBars size={20} />
              </a>
            </li>
          ))}
        </List>
      </Container>
    </div>
  );
}
