import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import environment from "../environment";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { TODO } from '../interfaces/Todo';

import "react-datepicker/dist/react-datepicker.css";

function TodoForm() {
  const defaultValues = {
    id: 0,
    title: '',
    completed: true,
    target: moment().add(5, 'day').toDate(),
    updatedAt: '',
    createdAt: ''
  }
  const targetDateProps = {
    momentFormat: 'DD-MM-YYYY',
    format: 'dd-MM-yyyy',
    minDate: moment().subtract(1, 'day').toDate(),
    maxDate: moment().add(1, 'month').toDate(),
  }
  const [todo, setTodo] = useState(defaultValues);
  const [targetDate, setTargetDate] = useState(targetDateProps);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    prepopulate();
  }, [])

  function prepopulate() {
    if (!id) {
      return;
    }
    const url = `${environment.api}/todos/${id}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        const converted = {
          target: moment(res.target, 'YYYY-MM-DD HH:mm:ss').toDate(),
          createdAt: moment(res.target, 'YYYY-MM-DD HH:mm:ss').toDate(),
          updatedAt: moment(res.target, 'YYYY-MM-DD HH:mm:ss').toDate(),
        }
        const formattedTodo = { ...res, ...converted }
        setTodo(formattedTodo);
      })


  }


  const formik = useFormik({
    initialValues: todo,

    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      target: Yup.string().required('Required')
    }),
    enableReinitialize: true,
    onSubmit: values => {
      if (isInvalidTargetDate()) {
        return;
      }

      let method = 'POST';
      let url = `${environment.api}/todos`;
      const converted = {
        target: moment(values.target).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: values.createdAt ? moment(values.createdAt).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:SS')
      }
      if (id) {
        method = 'PUT';
        url = url + `/${id}`;
      }
      const payload = { ...values, ...converted }
      const body = JSON.stringify(payload);

      fetch(url, {
        method: method, headers: {
          'Content-Type': 'application/json',
        }, body: body
      })
        .then(res => res.json())
        .then(res => {
          navigate('/')
        })
        .catch(err => {
          console.log(err)
        })

    }
  });

  function isInvalidTargetDate() {
    if (!moment(formik.values.target).isValid) {
      return "Invalid Date";
    }
    if (moment(formik.values.target).isBefore(moment(targetDateProps.minDate))) {
      return `Target date cannot be before ${moment(targetDateProps.minDate).format(targetDateProps.momentFormat)}`
    }
    return null;
  }
  return (
    <>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" onChange={formik.handleChange} placeholder="Enter todo"
            value={formik.values.title} />
          <Form.Text className="text-danger">
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="completed">
          <Form.Check type="checkbox" name="completed" onChange={formik.handleChange} label="Completed" checked={formik.values.completed} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="target">
          <Form.Label>Target</Form.Label>
          <DatePicker name="touched" className="form-control"
            dateFormat={targetDate.format}
            maxDate={targetDate.maxDate}
            selected={formik.values.target}
            onChangeRaw={e => {
              formik.setFieldTouched('target', true, true);
            }}
            onChange={(date: any) => formik.setFieldValue("target", date)} />
          <Form.Text className="text-danger">
            {formik.touched.target && isInvalidTargetDate() ? (
              <div className="text-danger">{isInvalidTargetDate()}</div>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </>
  );
}

export default TodoForm;
