import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Hidden,
  withWidth,
  Grid,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { paginationCourse } from "../../actions/CourseAction";
import ControlTyping from "../Tool/ControlTyping";

const PagerCurso = () => {
  const [pagerRequest, setPagerRequest] = useState({
    titulo: "",
    numeroPagina: 0,
    cantidadElementos: 5,
  });
  const [pagerResponse, setPagerResponse] = useState({
    listaRecords: [],
    totalRecords: 0,
    numeroPaginas: 5,
  });

  const [textoBusquedaCurso, setTextoBusquedaCurso] = useState("");
  const typingBuscadorTexto = ControlTyping(textoBusquedaCurso, 500);

  useEffect(() => {
    const obtenerListaCurso = async () => {
      let tituloVariant = "";
      let paginaVariant = pagerRequest.numeroPagina + 1;
      if (typingBuscadorTexto) {
        tituloVariant = typingBuscadorTexto;
        paginaVariant = 1;
      }

      const objetoPaginadorRequest = {
        titulo: tituloVariant,
        numeroPagina: paginaVariant,
        cantidadElementos: pagerRequest.cantidadElementos,
      };

      const response = await paginationCourse(objetoPaginadorRequest);
      console.log(response);
      setPagerResponse(response.data);
    };

    obtenerListaCurso();
  }, [pagerRequest, typingBuscadorTexto]);

  const cambiarPagina = (e, nuevaPagina) => {
    setPagerRequest((anterior) => ({
      ...anterior,
      numeroPagina: parseInt(nuevaPagina),
    }));
  };

  const cambiarCantidadRecords = (e) => {
    setPagerRequest((anterior) => ({
      ...anterior,
      cantidadElementos: parseInt(e.target.value),
      numeroPagina: 0,
    }));
  };

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Grid style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid item xs={12} sm={4} md={6}>
          <TextField
            fullWidth
            name="textoBusquedaCurso"
            variant="outlined"
            label="Busca tu curso"
            onChange={(e) => setTextoBusquedaCurso(e.target.value)}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Cursos</TableCell>
              <Hidden mdDown>
                <TableCell align="left">Descripcion</TableCell>
                <TableCell align="left">Fecha Publicacion</TableCell>
              </Hidden>
              <TableCell align="left">Precio Original</TableCell>
              <TableCell align="left">Precio Promocion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagerResponse.listaRecords.map((curso) => (
              <TableRow key={curso.Titulo}>
                <TableCell align="left">{curso.Titulo}</TableCell>
                <Hidden mdDown>
                  <TableCell align="left">{curso.Descripcion}</TableCell>
                  <TableCell align="left">
                    {new Date(curso.FechaPublicacion).toLocaleString()}
                  </TableCell>
                </Hidden>

                <TableCell align="left">{curso.PrecioActual}</TableCell>
                <TableCell align="left">{curso.Promocion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={pagerResponse.totalRecords}
        rowsPerPage={pagerRequest.cantidadElementos}
        page={pagerRequest.numeroPagina}
        labelRowsPerPage="Cursos por página"
        onChange={cambiarPagina}
        onChangeRowsPerPage={cambiarCantidadRecords}
      />
    </div>
  );
};

export default PagerCurso;
