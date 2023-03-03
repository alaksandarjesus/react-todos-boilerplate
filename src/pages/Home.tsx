import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodosTable from '../components/TodosTable';
import TodosGrid from '../components/TodosGrid';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function Home() {

  const [grid, setGrid] = useState(false);
  
  function onToggleLayout(){
    setGrid(!grid);
  }

  return (
   <>
     <Container>
      <Row>
        <Col>
          <Button variant="primary" className="float-end my-2" onClick={onToggleLayout}>Show as {grid?'Table':'Grid'}</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        {
          grid?
          <TodosGrid />
          :
        <TodosTable />
        }
        </Col>
      </Row>
    </Container>
   </>
  );
}

export default Home;
