import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodoForm from '../components/TodoForm';

function Todo() {
  
  return (
   <>
   <Container>
      <Row>
        <Col>
            <TodoForm />
    </Col>
      </Row>
    </Container>
   </>
  );
}

export default Todo;
