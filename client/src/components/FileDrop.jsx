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
function FileDrop({ tempFiles, setTempFiles, baseImage, setBaseImage }) {
  const { files, setFiles, loadingFiles } = useFileContext();
  //  const [baseImage, setBaseImage] = useState("")
  // const [tempFiles, setTempFiles] = useState([]);

  //   const [files, setFiles] = useState([]);
  //   const { getRootProps, getInputProps } = useDropzone({
  //     accept: {
  //       "image/*": [],
  //     },

  //console.log("Props in FileDrop:",setBaseImage);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      //   "image/*": ["png", "jpg"],
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      //const newFiles = [...tempFiles];
      // setTempFiles([...newFiles, acceptedFiles]);

    

      const newFiles = acceptedFiles.map((file) => {
        console.log("URL", URL.createObjectURL(file));
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      });
      let newTempFilesState = [...tempFiles.concat(newFiles)];
      let newFilesState = [...tempFiles.concat(newFiles)];
      // let newFilesState = [...files.concat(newFiles)];

      setTempFiles(newTempFilesState);
      setFiles(newFilesState);
      //ORIGINAL
      //   setFiles(
      //     acceptedFiles.map((file) =>
      //       Object.assign(file, {
      //         preview: URL.createObjectURL(file),
      //       })
      //     )
      //   );
    },
  });

  const handleDelete = (e, blob) => {
    e.stopPropagation();
    //console.log("current files", files);
    const newFiles = files.filter((item) => item.preview != blob);
    setFiles(newFiles);
    setTempFiles(newFiles);
  };
  //console.log("acceptedFiles", acceptedFiles);

  //console.log("fffilesFIleDrop", files);

  //tempFiles so that after added to DB it disappear from attachment field. files for throughout App
  const thumbs = tempFiles.map((file) => (
    <div style={thumb} key={file.preview}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          //   onLoad={() => {
          //     URL.revokeObjectURL(file.preview);
          //   }}
        />
      </div>
      <div className="remove-div">
        <button
          className="remove-btn"
          onClick={(e) => handleDelete(e, file.preview)}
        >
          X
        </button>
      </div>
    </div>
  ));

  //   useEffect(() => {
  //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, []);

  const uploadImage = async (e) => {
    console.log(e.target.files);
    const files = e.target.files[0];
    const base64 = await convertBase64(files);
    //console.log(base64);
    setBaseImage(base64);
    sessionStorage.setItem("image", JSON.stringify(base64));
    return base64;
  };

  const convertBase64 = (file) => {
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
      <div {...getRootProps({ className: "dropzone" })} className="baseStyle">
        <input {...getInputProps()} />
        <Icon
          icon="ic:outline-attachment"
          color="rgb(192,192,192,0.6)"
          width="40"
        />
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>

<div style={{marginTop:"20px"}}>
      <input type="file" onChange={(e) => uploadImage(e)}></input>
      <img src={baseImage} width="100px" />
      </div>
    </section>
  );
}

////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function FileDrop(props) {
//   const { getRootProps, acceptedFiles } = useDropzone();
//   const files = acceptedFiles.map((file) => (
//     <li key={file.path}>{file.path} <button>X</button></li>
//   ));

//   return (
//     <section className="container">
//       <div {...getRootProps({})} >
//         {/* <div {...getRootProps({className: 'dropzone'})}> */}
//         <div className='baseStyle'>
//         <Icon icon="ic:outline-attachment" color="lightpink" width="36" />
//         {/* <p>Drop files here</p> */}
//         <aside>
//         <ul>{files}</ul>
//       </aside>
//         </div>
//       </div>

//     </section>
//   );
// }

export default FileDrop;

/////////////////////////ORIGINAL SEMI/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// import { useState, useEffect, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import Dropzone from "react-dropzone";
// import { Icon } from "@iconify/react";
// import "../css/FileDrop.css";
// //import { useFileContext } from "../context/FileContext";

// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

// const img = {
//   display: "block",
//   width: "auto",
//   height: "100%",
// };

// //////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // function FileDrop({ files, setFiles, tempFiles, setTempFiles }) {
//   function FileDrop({  tempFiles, setTempFiles }) {

//     // const {files, setFiles, loadingFiles} = useFileContext();

//   // const [tempFiles, setTempFiles] = useState([]);

//   //   const [files, setFiles] = useState([]);
//   //   const { getRootProps, getInputProps } = useDropzone({
//   //     accept: {
//   //       "image/*": [],
//   //     },

//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
//     accept: {
//       //   "image/*": ["png", "jpg"],
//       "image/jpg": [],
//       "image/jpeg": [],
//       "image/png": [],
//     },
//     onDrop: (acceptedFiles) => {
//       //const newFiles = [...tempFiles];
//       // setTempFiles([...newFiles, acceptedFiles]);

//       const newFiles = acceptedFiles.map((file) => {
//         return {
//           file,
//           preview: URL.createObjectURL(file),
//         };
//       });
//       let newTempFilesState = [...tempFiles.concat(newFiles)];
//       let newFilesState = [...tempFiles.concat(newFiles)];
//       // let newFilesState = [...files.concat(newFiles)];

//       setTempFiles(newTempFilesState);
//       setFiles(newFilesState);
//       //ORIGINAL
//       //   setFiles(
//       //     acceptedFiles.map((file) =>
//       //       Object.assign(file, {
//       //         preview: URL.createObjectURL(file),
//       //       })
//       //     )
//       //   );
//     },
//   });

//   const handleDelete = (e, blob) => {
//     e.stopPropagation();
//     //console.log("current files", files);
//     const newFiles = files.filter((item) => item.preview != blob);
//     setFiles(newFiles);
//     setTempFiles(newFiles);
//   };
//   //console.log("acceptedFiles", acceptedFiles);

//   //console.log("fffilesFIleDrop", files);

//   //tempFiles so that after added to DB it disappear from attachment field. files for throughout App
//   const thumbs = tempFiles.map((file) => (
//     <div style={thumb} key={file.preview}>
//       <div style={thumbInner}>
//         <img
//           src={file.preview}
//           style={img}
//           // Revoke data uri after image is loaded
//           //   onLoad={() => {
//           //     URL.revokeObjectURL(file.preview);
//           //   }}
//         />
//       </div>
//       <div className="remove-div">
//         <button
//           className="remove-btn"
//           onClick={(e) => handleDelete(e, file.preview)}
//         >
//           X
//         </button>
//       </div>
//     </div>
//   ));

//   //   useEffect(() => {
//   //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//   //     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
//   //   }, []);

//   return (
//     <section className="container">
//       <div {...getRootProps({ className: "dropzone" })} className="baseStyle">
//         <input {...getInputProps()} />
//         <Icon icon="ic:outline-attachment" color="rgb(192,192,192,0.6)" width="40" />
//         <aside style={thumbsContainer}>{thumbs}</aside>
//       </div>
//     </section>
//   );
// }

// ////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // function FileDrop(props) {
// //   const { getRootProps, acceptedFiles } = useDropzone();
// //   const files = acceptedFiles.map((file) => (
// //     <li key={file.path}>{file.path} <button>X</button></li>
// //   ));

// //   return (
// //     <section className="container">
// //       <div {...getRootProps({})} >
// //         {/* <div {...getRootProps({className: 'dropzone'})}> */}
// //         <div className='baseStyle'>
// //         <Icon icon="ic:outline-attachment" color="lightpink" width="36" />
// //         {/* <p>Drop files here</p> */}
// //         <aside>
// //         <ul>{files}</ul>
// //       </aside>
// //         </div>
// //       </div>

// //     </section>
// //   );
// // }

// export default FileDrop;
