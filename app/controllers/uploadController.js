const fs = require("fs");
const path = require("path");
const Event = require("../models/Event");
const { response } = require("../middlewares/responseMiddleware");

function uploadFile(req, res, next) {
  try {
    if (!req.nameFile) {
      res.status(503);
      throw new Error("Error al subir la imagen");
    }
    response(res, req.nameFile, "Archivo cargado correctamente");
  } catch (error) {
    next(error);
  }
}

function returnFile(req, res, next) {
  try {
    const imgageId = req.params.id; //nombre de la imagen
    const pathImg = path.join(__dirname, `../../uploads/eventos/${imgageId}`);

    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }

    res.sendFile(path.join(__dirname, "../../uploads/default-placeholder.png"));
  } catch (error) {
    next(error);
  }
}

async function updateFile(req, res, next) {
  try {
    if (!req.nameFile) {
      res.status(503);
      throw new Error("Error al subir la imagen");
    }

    const event = await Event.findOne({ where: { id: req.params.id } }); //req.params.id = id del evento a actualizar

    if (!event) {
      deleteFileLocal(req.nameFile);
      res.status(404);
      throw new Error("El evento al que intentas acceder no existe");
    }

    deleteFileLocal(event.img);
    event.img = req.nameFile;
    await event.save();

    response(res, null, "La imagen fue actualizada con exito!");
  } catch (error) {
    next(error);
  }
}

async function deleteFileIfNotExists(req, res, next) {
  try {
    const imgageId = req.params.id; //nombre de la imagen

    const event = await Event.findOne({ where: { img: imgageId } });

    if (!event) {
      console.log("eliminar imagen no usada");
      const pathImg = path.join(__dirname, `../../uploads/eventos/${imgageId}`);
      if (!fs.existsSync(pathImg)) {
        res.status(404);
        throw new Error("El archivo que deseas eliminar no existe");
      }

      fs.unlink(pathImg, (err) => {
        if (err) {
          console.log(
            "ERROR: no se pudo eliminar el archivo de la ruta: ",
            pathImg
          );
        }
        response(res, null, `Imagen ${imgageId} eliminada`);
      });
    } else {
      response(res, null, null);
    }
  } catch (error) {
    next(error);
  }
}

function deleteFile(req, res, next) {
  try {
    const imgageId = req.params.id; //nombre de la imagen
    const pathImg = path.join(__dirname, `../../uploads/eventos/${imgageId}`);

    if (!fs.existsSync(pathImg)) {
      res.status(404);
      throw new Error("El archivo que deseas eliminar no existe");
    }

    fs.unlink(pathImg, (err) => {
      if (err) {
        console.log(
          "ERROR: no se pudo eliminar el archivo de la ruta: ",
          pathImg
        );
      }
      response(res, null, "Archivo eliminado correctamente");
    });
  } catch (error) {
    next(error);
  }
}

function deleteFileLocal(imgName) {
  const oldPath = `./uploads/eventos/${imgName}`;

  if (fs.existsSync(oldPath)) {
    fs.unlink(oldPath, (err) => {
      if (err) {
        console.log(
          "ERROR: no se pudo eliminar el archivo de la ruta: ",
          oldPath
        );
      }
    });
  }
}

module.exports = {
  returnFile,
  uploadFile,
  updateFile,
  deleteFile,
  deleteFileIfNotExists,
};
