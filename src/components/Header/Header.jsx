import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeData } from '../../store/redux/tableSlice';
import { FILES_LIST_ENDPOINT } from '../../constants/';
import './style.css';

const Header = () => {
  const selectedOption = useSelector((state) => state.table);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

// useEffect para cargar las opciones de archivos
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(FILES_LIST_ENDPOINT);
        const data = await response.json();
        setOptions(data.files);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFiles();
  }, []);

   // Memorizar las opciones para evitar recalculaciones innecesarias
   const memoizedOptions = useMemo(
    () => options.map((file, index) => (
      <option key={index} value={file}>{file}</option>
    )),
    [options]
  );

  // useCallback para manejar el cambio de selección del archivo
  const handleFileSelect = useCallback(
    (event) => {
      console.log(event.target.value);
      dispatch(changeData(event.target.value));
    },
    [dispatch]
  );

  return (
    <header className="header-container">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={8}>
            <h1><span className='font-weight text-white'>Andres Manzano | </span> Toolbox</h1>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-white fs-6">Seleccione un documento:</Form.Label>
              <Form.Select style={{"fontSize": "10pt"}}
                value={selectedOption.option} 
                onChange={handleFileSelect} 
                className="custom-select"
              >
                <option value="">Todos los documentos</option>
                {memoizedOptions}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default React.memo(Header);
