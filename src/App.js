import React, { useState, useEffect } from "react";
import './App.css';
import uuid from 'uuid';

import Todos from './components/Todos';
import Input from '@material-ui/core/Input';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';


function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInput(value);
  }

  const addTodo = (e) => {
    e.preventDefault();
    const newTitle = input;
    if (newTitle === '') {
      setError(true);
    } else {
      const newTodo = {
        title: newTitle,
        id: uuid(),
        completed: false
      }
      const newTodos = [...todos, newTodo];

      setTodos(newTodos);
      setInput('');
      setError(false);
    }
  }

  const handleDelete = (id) => {
    const todosCopy = [...todos];
    const filterTodos = todosCopy.filter(todo => todo.id !== id);

    setTodos(filterTodos);
  }

  const handleComplete = (id) => {
    const completedTodo = id;
    const updatedArr = [...todos].map(t => {
      if (t.id === completedTodo) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(updatedArr);
  }

  return (
    <div className="App" style={{ backgroundColor: "#f7f7f7" }}>
      <Container maxWidth="sm" style={{ backgroundColor: "#fff" }}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          wrap="nowrap"
          style={{ height: "100vh", paddingTop: "2em" }}
        >
          <form onSubmit={addTodo} type="form">
            <Input
              fullWidth
              placeholder="Add a todo"
              onChange={handleChange}
              value={input}
            />
            {
              error ?
                <FormHelperText id="component-helper-text" style={{ color: 'red' }}>Please enter a todo</FormHelperText> :
                <div></div>
            }
            <Button
              style={{ marginTop: '0.6em' }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary">
              Add
              </Button>
          </form>
          <Todos
            todos={todos}
            filter={filter}
            handleComplete={(id) => handleComplete(id)}
            handleDelete={(id) => handleDelete(id)} />
          <ButtonGroup
            style={{ margin: "auto", padding: "1em 0" }}
            color="primary"
            size="small">
            <Button
              variant={filter === 'all' ? 'contained' : ''}
              onClick={() => setFilter('all')}>
              All <span className="button-num">{todos.length}</span>
            </Button>
            <Button
              variant={filter === 'complete' ? 'contained' : ''}
              onClick={() => setFilter('complete')}>
              Complete <span className="button-num">{todos.filter(t => (t.completed === true)).length}</span>
            </Button>
            <Button
              variant={filter === 'incomplete' ? 'contained' : ''}
              onClick={() => setFilter('incomplete')}>
              Incomplete <span className="button-num">{todos.filter(t => (t.completed !== true)).length}</span>
            </Button>
          </ButtonGroup>
        </Grid>
      </Container>
    </div>
  )
}


export default App;
