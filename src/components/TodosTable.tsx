import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import environment from '../environment';
import { TODO } from '../interfaces/Todo';
import DateFormat from './DateFormat';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import MaterialIcon from './MaterialIcon';
import ConfirmModal from './Modals/ConfirmModal';
import { useDispatch } from 'react-redux';
import { update } from '../reducers/TodosReducer';

function TodosTable() {
  const dateFormat = 'YYYY-MM-DD HH:mm:SS';
  const [todos, setTodos] = useState<TODO[]>([]);
  const [verify, setVerify] = useState(false);
  const [modalConfirmArgs, setModalConfirmArgs] = useState<any>({})

  const dispatch = useDispatch();

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    const url = `${environment.api}/todos`
    fetch(url)
      .then(response => response.json())
      .then(res => {
        setTodos(res);
        dispatch(update({ count: res.length }))
      })
  }

  function getRowClassName(todo: any) {
    const targetMomented = moment(todo.target, dateFormat);
    const today = moment();
    if (todo.completed) {
      return 'text-success'
    }
    if (today.isAfter(targetMomented) && !todo.completed) {

      return 'text-danger';
    }
    return '';
  }

  function onDeleteClick(todo: TODO) {
    const args = {
      id: todo.id,
      title: "Confirmation Required",
      text: `Are you sure you want to remove this title ${todo.title}`
    }
    setModalConfirmArgs({ ...modalConfirmArgs, ...args });
    setVerify(true)

  }

  function onVerifyClose() {
    const url = `${environment.api}/todos/${modalConfirmArgs.id}`
    fetch(url, { method: 'DELETE' })
      .then(response => response.json())
      .then(res => {
        setVerify(false);
        getTodos();

      })
      .catch(res => {

      })

  }

  function onVerifyDismiss() {
    setModalConfirmArgs({});
    setVerify(false)

  }

  function renderTodos() {
    return todos.map((todo, index) => {
      return <tr key={index + 1} className={getRowClassName(todo)}>
        <td>{index + 1}</td>
        <td>{todo.title}</td>
        <td>{todo.completed ? 'Done' : 'Incomplete'}</td>
        <td><DateFormat date={todo.target} /></td>
        <td><DateFormat date={todo.createdAt} /></td>
        <td><DateFormat date={todo.updatedAt} /></td>
        <td>
          <div className="d-flex justify-content-center align-items-center">
            <Button href={'/todo/' + todo.id} variant="warning" size="sm" className=" me-2 btn-icon">
              <MaterialIcon icon="edit" type="outlined" />
            </Button>
            <Button variant="danger" size="sm" className="btn-icon" onClick={() => onDeleteClick(todo)}>
              <MaterialIcon icon="delete" type="outlined" />
            </Button>
          </div>
        </td>
      </tr>
    })
  }
  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titles</th>
            <th>Completed</th>
            <th>Target Date</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderTodos()}

        </tbody>
      </Table>
      {verify ? <ConfirmModal args={modalConfirmArgs} close={onVerifyClose} dismiss={onVerifyDismiss} /> : ''}
    </>
  );
}

export default TodosTable;
