import React from "react";

import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
  return (
    <div>
      <Container>
        <h1>
          <FaGithub size={25}/>
          Meus Repositorios
        </h1>

        <Form onSubmit={()=>{}}>
          <input type="text" placeholder="Adiconar Repositorios" />
          <SubmitButton>
            <FaPlus color="#fff" size={14}/>
          </SubmitButton>
        </Form>
      </Container>
    </div>
  );
}
