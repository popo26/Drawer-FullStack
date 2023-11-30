import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { Icon } from "@iconify/react";
import "../css/FileDrop.css";

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

function FileDrop({ files, setFiles, tempFiles, setTempFiles }) {
  // const [tempFiles, setTempFiles] = useState([]);

  //   const [files, setFiles] = useState([]);
  //   const { getRootProps, getInputProps } = useDropzone({
  //     accept: {
  //       "image/*": [],
  //     },

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
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      });
      let newTempFilesState = [...tempFiles.concat(newFiles)];
      let newFilesState = [...tempFiles.concat(newFiles)];

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

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })} className="baseStyle">
        <input {...getInputProps()} />
        <Icon icon="ic:outline-attachment" color="rgb(192,192,192,0.6)" width="40" />
        <aside style={thumbsContainer}>{thumbs}</aside>
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
