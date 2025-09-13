import { useState , useEffect } from "react";
import { Box } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SnackBar from "../SnackBar/SnackBar.jsx";

export default function UpdateImageBox({ index, setFiles }) {
  const [file, setFile] = useState();
  const [clicked, setClicked] = useState(false);
  const [errorMsg , setErrorMsg] = useState("");
  const [previewUrl , setPreviewUrl] = useState();
  const [open , setOpen] = useState(false);

  useEffect(() => {
    const product = JSON.parse(sessionStorage.getItem("product"));
    if (!product?.images?.[index]) return;

    const imageFile = product.images[index];
    setFile(imageFile);
    setPreviewUrl(imageFile.url);

    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = imageFile;
      return updated;
    });
  }, [index , setFiles]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const maxSize = 50 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    
    if(selectedFile.size > maxSize) {
      setOpen(true);
      setErrorMsg("Image must be less than 50MB");
      return;
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setOpen(true);
      setErrorMsg("Only JPG JPEG PNG and WEBP format not allowed");
      return;
    }

    setErrorMsg("");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile))

    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = {file: selectedFile , index: index};
      return updated;
    });
  };

  const handleRemove = (e) => {
    e.preventDefault();

    setFile(null);
    setPreviewUrl(null);

    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Box component="label" onClick={handleClick} className="sm:h-32 sm:w-32 h-24 w-24 bg-gray-400 flex items-center justify-center cursor-pointer rounded-md relative">
        {
          file ? (
            previewUrl ? (
                <>
                  <img onClick={(e) => {e.preventDefault()}} src={previewUrl} alt="preview" className="object-fill h-full w-full rounded-md"/>
                  <DeleteForeverIcon onClick={handleRemove} fontSize="small" className={`absolute text-gray-600 bg-white rounded-full right-1.5 top-1.5 transition-transform duration-150 ease-in-out ${clicked ? 'scale-70' : 'scale-100'}`}/>
                </>
            ) : (
              <span className="overflow-hidden">{file.name}</span>
            )
          ) : (
            <AddOutlinedIcon
              fontSize="large"
              className={`transition-transform duration-150 ease-in-out ${clicked ? 'scale-70' : 'scale-100'}`}
            />
          )
        }
        <input hidden type="file" accept="image/*" onChange={handleChange} />
      </Box>
      {
        errorMsg && (
          <SnackBar open={open} onClose={handleClose} message={errorMsg} type={"error"}/>
        )
      }
    </>
  );
}