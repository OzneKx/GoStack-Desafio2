import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]); 

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', { 
      title: `Novo Repositório ${Date.now()}`
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    await api.delete(`repositories/${repositories[repositoryIndex].id}`)

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button type="button" key={repository.id} onClick={() => 
                handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
