import React, { useEffect, useState } from "react";

import { Container, Owner, Loading, BackButton } from "./styles";
import { FaArrowLeft } from 'react-icons/fa';
import api from "../../services/api";

export default function Repos({ match }) {

  const [repos, setRepos] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repos);

      const [reposData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params:{
            state: 'open',
            per_page: 5
          }
        }),
      ]);

      setRepos(reposData.data);
      setIssues(issuesData.data);
      setloading(false);
    }

    load();
  }, [match.params.repos]);

  if(loading){
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>

    )
  }

  return(

    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30}/>
      </BackButton>
      <Owner>
        <img src={repos.owner.avatar_url} 
        alt={repos.owner.login}
        />
        <h1>{repos.name}</h1>
        <p>{repos.description}</p>
      </Owner>
    </Container>
  );
}
