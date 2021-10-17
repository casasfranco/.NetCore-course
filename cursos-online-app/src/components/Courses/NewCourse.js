import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import style from "../Tool/Style";
import React, { useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ImageUploader from "react-images-upload";
import { v4 as uuidv4 } from "uuid";
import { getDataImage } from "../../actions/ImagenAction";
import { saveCourse } from "../../actions/CourseAction";
import { useStateValue } from "../../context/store";

const NewCourse = () => {
  const [{ userSession }, dispatch] = useStateValue();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageCourse, setImageCourse] = useState(null);

  const [course, setCourse] = useState({
    tittle: "",
    description: "",
    price: 0.0,
    promotional: 0.0,
  });

  const resetForm = () => {
    setSelectedDate(new Date());
    setImageCourse(null);
    setCourse({ tittle: "", description: "", price: 0.0, promotional: 0.0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const imageKey = uuidv4();

  const uploadImage = (images) => {
    const image = images[0]; //solo quiero la primera

    getDataImage(image).then((res) => {
      setImageCourse(res);
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const courseId = uuidv4();

    const objetCourse = {
      titulo: course.tittle,
      descripcion: course.description,
      precio: parseFloat(course.price || 0.0),
      promocion: parseFloat(course.promotional || 0.0),
      fechaPublicacion: selectedDate,
      cursoId: courseId,
    };

    let objetImage = null;

    if (imageCourse) {
      objetImage = {
        data: imageCourse.data,
        nombre: imageCourse.nombre,
        extension: imageCourse.extension,
        objetoReferencia: courseId,
      };
    }

    saveCourse(objetCourse, objetImage).then((res) => {
      const responseCourse = res[0];
      const responseImage = res[1];

      let message = "";

      if (responseCourse.status === 200) {
        message += " The course was successfully saved.";
      } else {
        message += "Errors: " + Object.keys(responseCourse.data.errors);
      }

      if (responseImage) {
        if (responseImage.status === 200) {
          message += " The image was successfully saved.";
        } else {
          message +=
            "Errors in image: " + Object.keys(responseImage.data.errors);
        }
      }

      dispatch({
        type: "OPEN_SNACKBAR",
        openMessage: {
          open: true,
          message: message,
        },
      });
    });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          New course
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="tittle"
                variant="outlined"
                fullWidth
                label="Enter the tittle"
                value={course.tittle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="description"
                variant="outlined"
                fullWidth
                label="Enter the description"
                value={course.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="price"
                variant="outlined"
                fullWidth
                label="Enter the regular price"
                value={course.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="promotional"
                variant="outlined"
                fullWidth
                label="Enter the promotional price"
                value={course.promotional}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  margin="normal"
                  id="publication-date-id"
                  label="Select publication date"
                  format="MM/dd/yyyy"
                  fullWidth
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={5}>
              <ImageUploader
                withIcon={false}
                key={imageKey}
                singleImage={true}
                buttonText="Select the course image"
                onChange={uploadImage}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
                onClick={handleOnSubmit}
              >
                Save course
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default NewCourse;
