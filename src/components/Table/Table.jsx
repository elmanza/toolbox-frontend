import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Table, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { FILES_DATA_ENDPOINT } from '../../constants/';

const TableC = React.memo(() => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores
  const selectedOption = useSelector((state) => state.table);

  // Generar la URL dinámica basada en la opción seleccionada
  const url = `${FILES_DATA_ENDPOINT}${selectedOption.option !== "" ? `?fileName=${selectedOption.option}` : ''}`;

  // Función para realizar la solicitud al endpoint que devuelve los datos de la tabla
  const fetchTableData = useCallback(async () => {
    setLoading(true);
    setError(null); // Resetear error al inicio de la carga
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Archivo no disponible'); // Lanzar un error si la respuesta no es exitosa
      }

      const data = await response.json();
      if (data.length) {
        const lines = data.filter((file) => file.lines.length > 0);
        if (lines.length) {
          setColumns(Object.keys(lines[0].lines[0])); // Establece las columnas con las llaves de la primera fila de líneas
        }
      } else {
        setError('Este archivo no cumple con los datos mínimos'); // Establecer mensaje si no hay datos
      }

      setTableData(data);
    } catch (error) {
      console.error(error);
      setError(error.message); // Capturar el error y establecer el mensaje
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Hook de efecto para actualizar la tabla cuando cambia la opción seleccionada
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // Memoize del contenido de la tabla para evitar renders innecesarios
  const tableContent = useMemo(() => {
    return tableData.length ? (
      tableData.map((row, index) =>
        row.lines.map((line, lineIndex) => (
          <tr key={`${index}-${lineIndex}`}>
            <td>{line.file}</td>
            <td>{line.hex}</td>
            <td>{line.number}</td>
            <td>{line.text}</td>
          </tr>
        ))
      )
    ) : null;
  }, [tableData]);

  // Componentizado de la tabla para evitar renders innecesarios si solo cambia el estado
  const renderTable = useCallback(() => {
    return (
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </Table>
    );
  }, [columns, tableContent]);

  return (
    <Container className='containerTable'>
      <Row>
        {loading ? (
          <div className="text-center">
            <Spinner variant='info' animation="border" role="status" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : tableData.length > 1 ? (
          renderTable()
        ) : (
          <Alert variant="warning">
            Archivo vacío
          </Alert>
        )}
      </Row>
    </Container>
  );
});

export default TableC;
