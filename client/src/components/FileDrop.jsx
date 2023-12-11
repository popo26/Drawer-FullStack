import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { Icon } from "@iconify/react";
import "../css/FileDrop.css";
import { useFileContext } from "../context/FileContext";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

//////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// function FileDrop({ files, setFiles, tempFiles, setTempFiles }) {
// function FileDrop({ tempFiles, setTempFiles }) {
// function FileDrop({ tempFiles, setTempFiles, baseImage, setBaseImage }) {
function FileDrop({
  tempFiles,
  setTempFiles,
  baseImage1,
  setBaseImage1,
  baseImage2,
  setBaseImage2,
  baseImage3,
  setBaseImage3,
}) {
  const { files, setFiles, loadingFiles } = useFileContext();

  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const [isLoading3, setIsLoading3] = useState(true);

  //  const [baseImage, setBaseImage] = useState("")
  // const [tempFiles, setTempFiles] = useState([]);

  //   const [files, setFiles] = useState([]);
  //   const { getRootProps, getInputProps } = useDropzone({
  //     accept: {
  //       "image/*": [],
  //     },

  //console.log("Props in FileDrop:",setBaseImage);

  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
  //   accept: {
  //     //   "image/*": ["png", "jpg"],
  //     "image/jpg": [],
  //     "image/jpeg": [],
  //     "image/png": [],
  //   },
  //   onDrop: (acceptedFiles) => {
  //     //const newFiles = [...tempFiles];
  //     // setTempFiles([...newFiles, acceptedFiles]);

  //     const newFiles = acceptedFiles.map((file) => {
  //       console.log("URL", URL.createObjectURL(file));
  //       return {
  //         file,
  //         preview: URL.createObjectURL(file),
  //       };
  //     });
  //     let newTempFilesState = [...tempFiles.concat(newFiles)];
  //     let newFilesState = [...tempFiles.concat(newFiles)];
  //     // let newFilesState = [...files.concat(newFiles)];

  //     setTempFiles(newTempFilesState);
  //     setFiles(newFilesState);
  //     //ORIGINAL
  //     //   setFiles(
  //     //     acceptedFiles.map((file) =>
  //     //       Object.assign(file, {
  //     //         preview: URL.createObjectURL(file),
  //     //       })
  //     //     )
  //     //   );
  //   },
  // });

  // const handleDelete = (e, blob) => {
  //   e.stopPropagation();
  //   //console.log("current files", files);
  //   const newFiles = files.filter((item) => item.preview != blob);
  //   setFiles(newFiles);
  //   setTempFiles(newFiles);
  // };
  // //console.log("acceptedFiles", acceptedFiles);

  // //console.log("fffilesFIleDrop", files);

  // //tempFiles so that after added to DB it disappear from attachment field. files for throughout App
  // const thumbs = tempFiles.map((file) => (
  //   <div style={thumb} key={file.preview}>
  //     <div style={thumbInner}>
  //       <img
  //         src={file.preview}
  //         style={img}
  //         // Revoke data uri after image is loaded
  //         //   onLoad={() => {
  //         //     URL.revokeObjectURL(file.preview);
  //         //   }}
  //       />
  //     </div>
  //     <div className="remove-div">
  //       <button
  //         className="remove-btn"
  //         onClick={(e) => handleDelete(e, file.preview)}
  //       >
  //         X
  //       </button>
  //     </div>
  //   </div>
  // ));

  const uploadImage1 = async (e) => {
    console.log(e.target.files);
    const files = e.target.files[0];
    const base64 = await convertBase641(files);
    //console.log(base64);
    setBaseImage1(base64);
    sessionStorage.setItem("image1", JSON.stringify(base64));
    return base64;
  };

  const uploadImage2 = async (e) => {
    console.log(e.target.files);
    const files = e.target.files[0];
    const base64 = await convertBase642(files);
    //console.log(base64);
    setBaseImage2(base64);
    sessionStorage.setItem("image2", JSON.stringify(base64));

    return base64;
  };

  const uploadImage3 = async (e) => {
    console.log(e.target.files);
    const files = e.target.files[0];
    const base64 = await convertBase643(files);
    //console.log(base64);
    setBaseImage3(base64);
    sessionStorage.setItem("image3", JSON.stringify(base64));
    return base64;
  };

  // const uploadImage = async (e) => {
  //   console.log(e.target.files);
  //   const files = e.target.files[0];
  //   const base64 = await convertBase64(files);
  //   //console.log(base64);
  //   setBaseImage(base64);
  //   sessionStorage.setItem("image", JSON.stringify(base64));
  //   return base64;
  // };

  const convertBase641 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertBase642 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertBase643 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <section className="container">
      {/* <div {...getRootProps({ className: "dropzone" })} className="baseStyle">
        <input {...getInputProps()} />
        <Icon
          icon="ic:outline-attachment"
          color="rgb(192,192,192,0.6)"
          width="40"
        />
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div> */}

      {/* <input type="file" onChange={(e) => uploadImage(e)}></input> */}
      {/* <img src={baseImage} height="200px" /> */}

      <input type="file" onChange={(e) => uploadImage1(e)}></input>
      <img src={baseImage1} height="100px" />
      <br />
      <input type="file" onChange={(e) => uploadImage2(e)}></input>
      <img src={baseImage2} height="100px" />
      <br />

      <input type="file" onChange={(e) => uploadImage3(e)}></input>
      <img src={baseImage3} height="100px" />
    </section>
  );
}

export default FileDrop;
