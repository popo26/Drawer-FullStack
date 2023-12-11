import { useState, useCallback, useRef, useEffect } from "react";
import MyButton from "../components/MyButton";
import "../css/ScribblePage.css";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import FileDrop from "../components/FileDrop";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useFileContext } from "../context/FileContext";

export default function ScribblePage() {
  // export default function ScribblePage({baseImage, setBaseImage}) {
  // export default function ScribblePage({
  //   files,
  //   setFiles,
  // })
  const navigate = useNavigate();
  const { drawers, scribbles, setScribbles, loading } = useDataContext();
  const [scribbleContent, setScribbleContent] = useState("");
  const [scribbleTitle, setScribbleTitle] = useState("");
  const [tempFiles, setTempFiles] = useState([]);
  const [content, setContent] = useState("Enter");
  const body = useRef(content);
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  // const [files, setFiles] = useFileContext();
  const { files, setFiles, loadingFiles, setLoadingFiles } = useFileContext();

  // const [baseImage, setBaseImage] = useState("");
  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [baseImage3, setBaseImage3] = useState("");


  //const [image64, setImage64] = useState([])

  //console.log("FILES", files);

  //experiment 10Dec
  // useEffect(() => {
  //   if (!loading) {
  //     let fileArray = [];
  //     for (let x in scribbles) {
  //       if (scribbles[x]["files"]) {
  //         fileArray.push(scribbles[x]["files"]);
  //       }
  //     }
  //     setFiles(fileArray);
  //   }
  // }, []);

  //experiment11Dec
  // const convertFileToBase64 = (file) =>
  //    new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file.preview);

  //     reader.onload = () =>
  //       resolve({
  //         fileName: file["file"].name,
  //         base64: reader.result,
  //       });
  //     reader.onerror = reject;
  //     console.log(result_base64)

  //   }
  //   );


  const convertFileToBase64 = (file) => {
    const blob = new Blob([JSON.stringify(file, null, 2)], {
      type: "application/json",
    });

    console.log("blob", blob);

    var reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
      // setFiles((prevValues)=>[...prevValues,JSON.parse(sessionStorage.getItem("images"))])
      // sessionStorage.setItem("images", JSON.stringify(base64data))
      // return base64data;
    };
    // return new Promise((resolve, reject) => {
    //   const fileReader = new FileReader();
    //   if (file){
    //     fileReader.readAsDataURL(file);
    //     fileReader.onload = () => {
    //       resolve(fileReader.result);
    //     };
    //   }

    //   fileReader.onerror = (error) => {
    //     reject(error);
    //   };
    // });
  };

  // async function convertFileToBase64(file) {
  //   let result_base64 = await new Promise((resolve) => {
  //     let fileReader = new FileReader();
  //     fileReader.onload = () =>
  //       // resolve({
  //       //   fileName: file["file"].name,
  //       //   base64: fileReader.result,
  //       // });
  //       // fileReader.readAsDataURL(file.preview);
  //       (fileReader.onload = () => resolve(fileReader.result));
  //     fileReader.readAsDataURL(file);
  //   });

  //   console.log("RESLT is..", result_base64); // aGV5IHRoZXJl...
  //   return result_base64;
  // }

  // async function convertFileToBase64(file) {
  //   let result_base64 = await new Promise((resolve) => {
  //     let fileReader = new FileReader();
  //     fileReader.onload = () => resolve(fileReader.result);
  //     fileReader.readAsDataURL(file);
  //   });

  //   console.log(result_base64); // aGV5IHRoZXJl...
  //   return result_base64;
  // }


  const createNewScribble = (e) => {
    body.current = document.querySelector(".screenshot").innerHTML;
    //console.log("Current body", body.current);
    setContent(body.current);
    const attachmentBool = files.length < 1 ? false : true;
    //files default extraction include only path and preview so add more info here
    //console.log("You are inside the Fetch function");
    console.log("files", files);

    let filesInfo = [];
    //console.log("FILES ...", files[0].preview);
    //console.log("Funciton", convertFileToBase64(files[0].preview));
    for (let x in files) {
      console.log("Function", files[x].preview);
      // const r =  convertFileToBase64(files[x].preview);
      // console.log("R", r);
      convertFileToBase64(files[x].preview)

      const perFile = {};
      perFile["path"] = files[x]["file"].path;
      perFile["name"] = files[x]["file"].name;
      // perFile["preview"] = convertFileToBase64(files[x].preview);
      // perFile["preview"] = files[x].preview;
      perFile["preview"] = files[x].preview;


      perFile["size"] = files[x]["file"].size;
      perFile["format"] = files[x]["file"].type;
      //perFile['test'] = sessionStorage.getItem("image");
      filesInfo.push(perFile);
    }

    // console.log("FILES ...", files)
    // for (let x of files) {
    //   console.log("X", x["file"]);
    //   const perFile = {};
    //   perFile["path"] = x["file"].path;
    //   perFile["name"] = x["file"].name;
    //   // perFile["preview"] = x.preview;
    //   perFile["preview"] = convertFileToBase64(x.preview);

    //   perFile["size"] = x["file"].size;
    //   perFile["format"] = x["file"].type;
    //   filesInfo.push(perFile);
    // }

    let dataPost = {
      userId: 1,
      title: scribbleTitle ? scribbleTitle : "Untitled",
      type: "scribble",
      content: body.current,
      stray: true,
      level: 1,
      attachment: attachmentBool,
      files: filesInfo,
    };
    fetch("http://localhost:8080/api/scribbles/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then((json) => {
        //setFiles((prevItems) => [...prevItems, json.data["files"]]);
        //sessionStorage.setItem("files", JSON.stringify(files))
      })
      .catch((error) => console.error(error.message));
  };

  const handleScribbleChange = (e) => {
    setScribbleContent(e.target.value);
  };

  const handleTitleChange = (value) => {
    setScribbleTitle(value);
    setSelectedScribbleId(scribbles.length + 1);
  };

  const handleSubmitScribble = (e) => {
    createNewScribble(e);
    setTempFiles([]);
    setScribbleTitle("");
    setContent("");
    body.current = "";
    navigate("/stray");
  };

  // const deleteAttachment = (blob) => {
  //   fetch(`http://localhost:3000/scribbles/${id}`, {
  //     method: "DELETE",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify(dataPost),
  //   })
  //     .then((response) => console.log(response.json()))
  //     .catch((error) => console.error(error.message));
  // };

  // const handleDelete = (blob) => {
  //   alert(`Are you sure to delete? -ID:${blob}`);
  //   deleteAttachment(blob);
  // };

  // const handleDeleteAttachment = (passedBlob) => {
  //   deleteAttachment(passedBlob);
  // };

  const detectContent = () => {
    if (document.querySelector(".screenshot")) {
      document
        .querySelector(".screenshot")
        .addEventListener("input", function (e) {
          let imageArray = [];
          console.log(document.querySelector(".screenshot").innerHTML);
          const parent = document.querySelector(".screenshot");
          console.log(typeof body.current);
          if (parent.getElementsByTagName("img")) {
            console.log("________________FOUND");
          } else {
            console.log("NOOOOOOOOOOOOOOOOOOOO");
          }
          console.log("imageArray", imageArray);
          // setContent("");
        });
    }
  };

  detectContent();

  //console.log("BOdy", body);

  // //Experiment Screenshot+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // const [imageDataURL, setImageDataURL] = useState(null);

  // const onPaste = (event) => {
  //     const clipboardData = event.clipboardData || window.clipboardData;
  //     const items = clipboardData.items;

  //     for (let i = 0; i < items.length; i++) {
  //         if (items[i].type.indexOf('image') !== -1) {
  //             const imageFile = items[i].getAsFile();
  //             processImage(imageFile);
  //         }
  //     }
  // };

  // const processImage = (imageFile) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //         setImageDataURL(event.target.result);
  //     };
  //     reader.readAsDataURL(imageFile);
  // };
  // //Experiment Screenshot++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div className="ScribblePage">
      <InputField
        htmlFor="Title"
        type="text"
        name="scribble-title"
        placeholder="Title"
        value={scribbleTitle}
        id="scribble-title"
        // Change the name - handleNewDrawerChange
        handleNewDrawerChange={handleTitleChange}
      />

      <br />
      {/* Experiment++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* <div className="span-div">
        <span
          className="input"
          role="textbox"
          contentEditable
          onClick={handleContentChange2}
          ref={body}
          suppressContentEditableWarning={true}
        >
          {content}
        </span>
      </div> */}
      {/* Experiment++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* <div className="textarea-wrap">
        <textarea
          autoFocus
          value={scribbleContent}
          onChange={handleScribbleChange}
          rows="20"
          cols="100"
        >
          Scribble here
        </textarea>
      </div> */}
      <div
        contentEditable="true"
        className="screenshot"
        ref={body}
        suppressContentEditableWarning={true}
        onClick={() => setContent("")}
      >
        {content}
      </div>
      <br />

      <FileDrop
        files={files}
        setFiles={setFiles}
        tempFiles={tempFiles}
        setTempFiles={setTempFiles}
        // baseImage={baseImage}
        // setBaseImage={setBaseImage}
        baseImage1={baseImage1}
        setBaseImage1={setBaseImage1}
        baseImage2={baseImage2}
        setBaseImage2={setBaseImage2}
        baseImage3={baseImage3}
        setBaseImage3={setBaseImage3}
      />

      <br />
      <Button onClick={(e) => handleSubmitScribble(e)} variant="dark">
        Just Save
      </Button>
      {/* <button
        onClick={() => {
          // body.current = document.querySelector(".input").innerText;
          // setContent(body.current);
          // console.log("CURRENT HERE", body.current)
          handleSubmitScribble();
        }}
      >
        Just Save
      </button> */}
      {/* <div> */}
      <span>or</span>
      <Icon
        icon="mingcute:drawer-line"
        color="black"
        width="30"
        height="30"
        onClick={() => {
          createNewScribble();
          navigate("/sort", { state: { id: selectedScribbleId } });
        }}
      />
      {/* </div> */}

      <div>
        {" "}
        <Icon
          className="back-btn"
          icon="icon-park-outline:back"
          color="black"
          width="50"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Experiment Screenshot++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {/* <div className='container'>
                    <h3 className='title'>React js Copy Paste Image Clipboard</h3>
                    <div
                        className='paste-container'
                        ref={(ref) => {
                            if (ref) {
                                ref.addEventListener('paste', onPaste);
                            }
                        }}
                    >
                        Click here and use Control-V to paste the image.
                    </div>
                    <br />
                    {imageDataURL && <img src={imageDataURL} alt="Pasted Image" className='pasted-image' />}
                </div> */}
      {/* Experiment++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
    </div>
  );
}
