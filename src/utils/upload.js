import axios from "axios";

const upload = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "biscato");

  try {
    const res = await axios.post(
      import.meta.env.VITE_UPLOAD_LINK,
      data
    );

    return res.data.secure_url;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default upload;