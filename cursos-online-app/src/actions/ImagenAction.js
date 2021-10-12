export const getDataImage = (image) => {
  return new Promise((resolve, reject) => {
    const nombre = image.name;
    const extension = image.name.split(".").pop();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () =>
      resolve({
        data: reader.result.split(",")[1],
        nombre,
        extension,
      });
    reader.onerror = (error) => reject(error);
  });
};
