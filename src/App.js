import React, { Component } from "react";
import './App.css';
import uuid from 'uuid';

import Todos from './components/Todos';
import Input from '@material-ui/core/Input';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';


class App extends Component {
  state = {
    todos: [
      {
        title: "this is my first todo",
        id: uuid(),
        completed: false
      },
      {
        title: "second todo",
        id: uuid(),
        completed: false
      },
    ],
    input: '',
    error: false,
    filter: 'all',
  }


  render() {


    const handleChange = (e) => {
      e.preventDefault();
      const value = e.target.value;
      this.setState({ input: value });
    }


    const addTodo = (e) => {
      e.preventDefault();
      const newTitle = this.state.input;
      if (newTitle == '') {
        this.setState({ error: true })
      } else {
        const newTodo = {
          title: newTitle,
          id: uuid(),
          completed: false
        }
        const newTodos = [...this.state.todos, newTodo];
        this.setState({ todos: newTodos, input: '', error: false });
      }

    }

    const handleComplete = (id) => {
      const completedTodo = id;
      const updatedArr = [...this.state.todos].map(t => {
        if (t.id === completedTodo) {
          t.completed = !t.completed;
        }
        return t;
      });
      this.setState({ todos: updatedArr });
    }

    const handleFilter = (filter) => {
      this.setState({ filter: filter });
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
                value={this.state.input}
              />
              {
                this.state.error ?
                  <FormHelperText id="component-helper-text" style={{ color: 'red' }}>Please enter a todo</FormHelperText> :
                  <div style={{ height: "20px" }}></div>
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
              todos={this.state.todos}
              filter={this.state.filter}
              handleComplete={(id) => handleComplete(id)}
            />

            <ButtonGroup
              style={{ margin: "auto", padding: "1em 0" }}
              color="primary"
              size="medium"
            >
              <Button
                variant={this.state.filter === 'all' ? 'contained' : ''}
                onClick={() => handleFilter('all')}>
                All ({this.state.todos.length})
              </Button>
              <Button
                variant={this.state.filter === 'complete' ? 'contained' : ''}
                onClick={() => handleFilter('complete')}>
                Complete ({this.state.todos.filter(t => (t.completed === true)).length})
              </Button>
              <Button
                variant={this.state.filter === 'incomplete' ? 'contained' : ''}
                onClick={() => handleFilter('incomplete')}>
                Incomplete ({this.state.todos.filter(t => (t.completed !== true)).length})
              </Button>
            </ButtonGroup>

          </Grid>
        </Container>
      </div>
    )
  }
}


export default App;
