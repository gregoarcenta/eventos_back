const fs = require("fs");
const { response } = require("../middlewares/responseMiddleware");
const Event = require("../models/Event");

async function uploadFile(req, res, next) {
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

async function updateFile(req, res, next) {
  try {
    if (!req.nameFile) {
      res.status(503);
      throw new Error("Error al subir la imagen");
    }

    const event = await Event.findOne({ where: { id: req.params.id } });

    if (!event) {
      deleteFile(req.nameFile)
      res.status(404);
      throw new Error("El evento al que intentas acceder no existe");
    }
    
    deleteFile(event.img)
    event.img = req.nameFile;
    await event.save();

    response(res, null, "La imagen fue actualizada con exito!");
  } catch (error) {
    next(error);
  }
}

function deleteFile(imgName) {
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
  uploadFile,
  updateFile,
};
