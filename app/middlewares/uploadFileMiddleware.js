const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function validateFile(req, res, next) {
  try {
    // console.log("req.files: ", req.files);
    // Validar que exista algun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400);
      throw new Error("No existe la imagen");
    }

    // Procesar imagen
    const bannerImg = req.files.imgBannerEvent;
    const recorterNameImg = bannerImg.name.split(".");
    const extensionFile = recorterNameImg[recorterNameImg.length - 1];

    // Validar Extencion
    const validExtensions = ["png", "jpg", "jpeg"];
    if (!validExtensions.includes(extensionFile)) {
      res.status(400);
      throw new Error("La extencion del archivo no es valida");
    }

    // Generar el nombre del archivo
    const nameFile = `${uuidv4()}.${extensionFile}`;

    // Path para guardar la imagen
    const path = `./uploads/eventos/${nameFile}`;
    bannerImg.mv(path, (err) => {
      if (err) {
        console.log(err);
        return next();
      }

      req.nameFile = nameFile;
      next();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateFile,
};
