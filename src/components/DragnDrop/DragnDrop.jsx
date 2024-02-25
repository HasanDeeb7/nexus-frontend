import { useDropzone } from "react-dropzone"; // For react-dropzone
import style from "./DragnDrop.module.css";
import { LuImagePlus } from "react-icons/lu";
const DragAndDrop = ({ acceptedFiles, setAcceptedFiles, image, setImage }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    setAcceptedFiles(
      Object.assign({}, file, { preview: URL.createObjectURL(file) })
    );
    setImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={style.dragnDropContainer}>
      <input {...getInputProps()} />
      {acceptedFiles ? (
        <ul onClick={() => setAcceptedFiles(null)}>
          <li key={acceptedFiles.name} style={{ listStyle: "none" }}>
            <img
              className={style.previewImg}
              src={acceptedFiles.preview}
              alt={acceptedFiles.name}
            />
            <p>{acceptedFiles.name}</p>
          </li>
        </ul>
      ) : (
        <>
          <LuImagePlus className={style.galleryIcon} />
          <p>Drag and drop your images here, or click to select files</p>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
