import HttpClient from "../services/HttpClient";

export const saveCourse = async (course, image) => {
  const endPointCourse = "/Cursos/";
  const promiseCourse = HttpClient.post(endPointCourse, course);

  if (image) {
    const endPointImage = "/Documento/";
    const promiseImage = HttpClient.post(endPointImage, image);
    return await Promise.all([promiseCourse, promiseImage]);
  } else {
    return await Promise.all([promiseCourse]);
  }
};

export const paginationCourse = async (pager) => {
  return new Promise((resolve, eject) => {
    HttpClient.post("/Cursos/report", pager).then((res) => {
      resolve(res);
    });
  });
};
