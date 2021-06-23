import React, { useEffect, useState } from "react";

import { Container } from "./styles";
import api from "../../services/api";

//
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

  return(

  <Container>

  </Container>
  );
}
