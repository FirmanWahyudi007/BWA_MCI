const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(403).send({
        message: "No file uploaded",
      });
    }
    res.status(201).send({
      message: "Succes upload image",
      data: {
        src: `/uploads/${req.file.filename}`,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = { uploadImage };
