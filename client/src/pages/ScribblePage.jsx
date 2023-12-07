import { useState, useCallback, useRef } from "react";
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


export default function ScribblePage({
  files,
  setFiles,
}) {
  const navigate = useNavigate();
  const {drawers, scribbles, setScribbles} = useDataContext();
  const [scribbleContent, setScribbleContent] = useState("");
  const [scribbleTitle, setScribbleTitle] = useState("");
  const [tempFiles, setTempFiles] = useState([]);
  const [content, setContent] = useState("_");
  const body = useRef(content);
  const [selectedScribbleId, setSelectedScribbleId] = useSelectedScribbleContext();

  const createNewScribble = () => {
    body.current = document.querySelector(".screenshot").innerHTML;
    setContent(body.current);
    const attachmentBool = files.length < 1 ? false : true;
    //files default extraction include only path and preview so add more info here
    console.log("You are inside the Fetch function");
    console.log("files", files);

    let filesInfo = [];
    for (let x of files) {
      const perFile = {};
      perFile["path"] = x.path;
      perFile["name"] = x.name;
      perFile["preview"] = x.preview;
      perFile["size"] = x.size;
      perFile["type"] = x.type;
      filesInfo.push(perFile);
    }
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
      .then((json)=>setScribbles((prevItems)=>[...prevItems, json.data]))
      .catch((error) => console.error(error.message));
  };

  const handleScribbleChange = (e) => {
    setScribbleContent(e.target.value);
  };

  const handleTitleChange = (value) => {
    setScribbleTitle(value);
    setSelectedScribbleId(scribbles.length + 1);
  };

  const handleSubmitScribble = () => {
    createNewScribble();
    setTempFiles([]);
    setScribbleTitle("")
    setContent("")
    body.current = "";
    navigate("/stray")
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

  console.log("BOdy", body);

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
      >
        {content}
      </div>
      <br />

      <FileDrop
        files={files}
        setFiles={setFiles}
        tempFiles={tempFiles}
        setTempFiles={setTempFiles}
      />

      <br />
      <Button onClick={handleSubmitScribble} variant="dark">
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
