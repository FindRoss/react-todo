import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

function Todos({ todos, filter, handleComplete, handleDelete }) {


  let view = todos;
  if (filter === 'all') {
    view = todos;
  } else if (filter === 'complete') {
    view = todos.filter(t => (t.completed === true))
  } else if (filter === 'incomplete') {
    view = todos.filter(t => (t.completed !== true))
  }

  return (
    <React.Fragment>
      <List style={{
        height: "calc(100vh - 200px)",
        overflowY: "auto"
      }}>
        {
          view.map(
            todo =>
              <ListItem
                key={todo.id}>
                <IconButton aria-label="done" onClick={() => handleComplete(todo.id)}>
                  <Icon color="disabled" >{todo.completed ? 'check_box_icon' : 'check_box_outline_blank_icon'}</Icon>
                </IconButton>
                <ListItemText style={{ opacity: todo.completed ? '0.2' : '1', paddingLeft: "0.6em" }} primary={todo.title} />
                <IconButton aria-label="delete" onClick={() => handleDelete(todo.id)}>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItem>
          )
        }
      </List>
    </React.Fragment >
  )
}

export default Todos; 
