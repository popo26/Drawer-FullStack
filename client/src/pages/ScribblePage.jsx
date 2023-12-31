import { useState, useRef, useEffect } from "react";
import "../css/ScribblePage.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import FileDrop from "../components/FileDrop";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";
import { useFileContext } from "../context/FileContext";
import { useUserContext } from "../context/UserContext";

export default function ScribblePage() {
  const navigate = useNavigate();
  const { drawers, scribbles, setScribbles, loading } = useDataContext();
  const [scribbleContent, setScribbleContent] = useState("");
  const [scribbleTitle, setScribbleTitle] = useState("");
  const [tempFiles, setTempFiles] = useState([]);
  const [content, setContent] = useState("Scribble & Screenshot here ..");
  const body = useRef(content);
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  const { files, setFiles, loadingFiles, setLoadingFiles } = useFileContext();
  const { user } = useUserContext();
  const [baseImage, setBaseImage] = useState("");

  let timerID = useRef(null);

  const tooltipJustSave = <Tooltip id="tooltip">Just Save</Tooltip>;
  const tooltipSort = <Tooltip id="tooltip">Sort</Tooltip>;

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const convertFileToBase64 = (file) => {
    const blob = new Blob([JSON.stringify(file, null, 2)], {
      type: "application/json",
    });

    var reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      //console.log(base64data);
    };
  };

  const createNewScribble = () => {
    body.current = document.querySelector(".screenshot").innerHTML;
    //console.log("Current body", body.current);
    setContent(body.current);
    const attachmentBool = files.length < 1 ? false : true;
    //files default extraction include only path and preview so add more info here
    console.log("files", files);

    let filesInfo = [];
    for (let x in files) {
      convertFileToBase64(files[x].preview);

      const perFile = {};
      perFile["path"] = files[x]["file"].path;
      perFile["name"] = files[x]["file"].name;
      perFile["preview"] = files[x].preview;
      perFile["size"] = files[x]["file"].size;
      perFile["format"] = files[x]["file"].type;
      filesInfo.push(perFile);
    }

    const contentDetails =
      content != "Scribble & Screenshot here .." ? body.current : "No scribble";

    let dataPost = {
      userId: user._id,
      title: scribbleTitle ? scribbleTitle : "Untitled",
      type: "scribble",
      content: contentDetails,
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
        setSelectedScribbleId(json.data._id);
        // console.log("selected Scribble ID setting complete");
        // console.log("JSON", json);
      })
      .catch((error) => console.error(error.message));
  };

  const handleScribbleChange = (e) => {
    setScribbleContent(e.target.value);
  };

  const handleTitleChange = (value) => {
    setScribbleTitle(value);
  };

  const handleSubmitScribble = (e) => {
    createNewScribble(e);

    setTempFiles([]);
    setScribbleTitle("");
    setContent("");
    body.current = "";
    navigate("/stray");
    navigate(0);
  };

  const detectContent = () => {
    if (document.querySelector(".screenshot")) {
      document
        .querySelector(".screenshot")
        .addEventListener("input", function (e) {
          let imageArray = [];
          //console.log(document.querySelector(".screenshot").innerHTML);
          const parent = document.querySelector(".screenshot");
          //console.log(typeof body.current);
          if (parent.getElementsByTagName("img")) {
            console.log("________________FOUND");
          } else {
            console.log("NOOOOOOOOOOOOOOOOOOOO");
          }
          //console.log("imageArray", imageArray);
        });
    }
  };

  detectContent();

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
        baseImage={baseImage}
        setBaseImage={setBaseImage}
      />

      <br />

      <div className="buttons-div">
        <OverlayTrigger placement="bottom" overlay={tooltipJustSave}>
          <Button onClick={() => handleSubmitScribble()} variant="dark">
            <Icon icon="ic:round-save-alt" width="24" />
          </Button>
        </OverlayTrigger>
        <span className="or">or</span>
        <OverlayTrigger placement="bottom" overlay={tooltipSort}>
          <Button variant="dark">
            <Icon
              icon="mingcute:drawer-line"
              color="white"
              width="24"
              onClick={() => {
                createNewScribble();
                //Because of the async function above, selectedScribble ID doesn't get updated in time.
                //This is still workaround as the error page still shows up in the halfway.
                timerID = setTimeout(() => {
                  navigate("/sort");
                  navigate(0);
                }, 1000);
              }}
            />
          </Button>
        </OverlayTrigger>
      </div>
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
    </div>
  );
}
