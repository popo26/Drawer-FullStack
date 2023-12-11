import { createContext, useState, useContext, useEffect } from "react";

const FileContext = createContext("");

export const FileProvider = (props) => {
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  //added
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/scribbles", {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setLoadingFiles(false)
  //       let currentFiles = [];
  //       for (let x in json) {
  //         json[x]["files"] && currentFiles.push(json[x]["files"]);
  //       }
  //       setFiles(currentFiles);
  //     });
  // }, []);

  useEffect(() => {
    const currentFiles = JSON.parse(sessionStorage.getItem("files"));
    console.log("current files CONTEXT", currentFiles);
    if (currentFiles) {
      setFiles(currentFiles);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  return (
    // <FileContext.Provider value={[files, setFiles]}>
    <FileContext.Provider
      value={{ files, setFiles, loadingFiles, setLoadingFiles }}
    >
      {props.children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};

//ORIGINAL
// import { createContext, useState, useContext, useEffect } from "react";

// const FileContext = createContext("");

// export const FileProvider = (props) => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const currentFiles = JSON.parse(sessionStorage.getItem("files"));
//     if (currentFiles) {
//       setFiles(currentFiles);
//     }
//   }, []);

//   useEffect(() => {
//     sessionStorage.setItem("files", JSON.stringify());
//   }, [files]);

//   return (
//     <FileContext.Provider value={[files, setFiles]}>
//       {props.children}
//     </FileContext.Provider>
//   );
// };

// export const useFileContext = () => {
//   return useContext(FileContext);
// };
