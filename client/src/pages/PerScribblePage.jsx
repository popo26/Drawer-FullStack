import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { useEffect, useState, useRef } from "react";
import FileDrop from "../components/FileDrop";
import { useDataContext } from "../context/DataContext";
import { useSelectedScribbleContext } from "../context/SelectedScribbleContext";

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

// export default function PerScribblePage({ data, files, setFiles }) {
export default function PerScribblePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [screenshots, setSecreenshots] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const { drawers, scribbles, setScribbles } = useDataContext();
  const [selectedScribbleId, setSelectedScribbleId] =
    useSelectedScribbleContext();
  const body = useRef(screenshots);

  //console.log("state", id)
  const selectedScribble = scribbles.filter(
    (item) => item._id == sessionStorage.getItem("selectedScribble")
  );

  //Need to have scribble content onload so that decodeHtml function can be used
  useEffect(() => {
    setSelectedScribbleId(id);
    setScribbles(JSON.parse(sessionStorage.getItem("scribblesData")));
    setSecreenshots(selectedScribble[0].content);
    return () => setSecreenshots([]);
  }, []);

  //console.log("scribbles", JSON.parse(sessionStorage.getItem("scribblesData")))

  const test = JSON.parse(sessionStorage.getItem("scribblesData"));
  let scribbleData;

  //console.log("test", test)

  for (let x in test) {
    //console.log("test[x]._d", test[x]['_id'])
    if (test[x]._id == id) {
      //console.log("result", test[x])
      scribbleData = test[x];
    }
  }

  // console.log("selectedScribbleId", selectedScribbleId);
  // console.log("ID", id);
  // console.log("scribbleData", scribbleData);

  const deleteScribble = (id) => {
    fetch(`http://localhost:8080/api/scribbles/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      // .then(() => {
      //   const updatedScribbles = scribbles.filter((item) => item._id != id);
      //   setScribbles(updatedScribbles);
      // })
      .catch((error) => console.error(error.message));
  };

  const handleDelete = (id) => {
    confirm(`Are you sure to delete this scribble? -ID:${id}`);
    deleteScribble(id);
    const scribbleToBeDeleted = scribbles.filter((item) => item._id == id);
    scribbleToBeDeleted[0].stray == true ? navigate("/stray") : navigate("/");
    navigate(0);
  };

  const deleteAttachment = (id, blob) => {
    const selectedScribble = scribbles.filter((item) => item._id == id);
    const newAttachments = selectedScribble[0].files.filter(
      (item) => item.preview != blob
    );
    // setFiles(newAttachments)
    // console.log("fffiles", files)
    let filesInfo = [];
    for (let x of newAttachments) {
      const perFile = {};
      perFile["path"] = x.path;
      perFile["name"] = x.name;
      perFile["preview"] = x.preview;
      perFile["size"] = x.size;
      perFile["type"] = x.type;
      filesInfo.push(perFile);
    }
    let dataPost = {
      // userId: 1,
      // title: selectedScribble[0].title,
      // type: "scribble",
      // content: selectedScribble[0].content,
      // stray: selectedScribble[0].stray,
      // level: selectedScribble[0].level,
      attachment:
        filesInfo.length === 0 ? false : selectedScribble[0].attachment,
      files: filesInfo,
    };
    fetch(`http://localhost:8080/api/scribbles/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error.message));
  };

  const handleDeleteAttachment = (e, blob) => {
    //e.stopPropagation();
    // console.log("current files", files);
    const currentAttachemnts = scribbles.filter((item) => item._id == id).files;
    // const newAttachments = currentAttachments.filter((item) => item.preview != blob);
    // setFiles(newFiles);
    console.log(
      "Delete clicked",
      scribbles.filter((item) => item._id == id)[0].files
    );
    deleteAttachment(id, blob);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  //   const renderedAttachments = data["scribbles"]
  //     .find((item) => item.id == id)
  //     .files.map((x) => x.preview);

  //   const thumbs = data["scribbles"]
  //     .find((item) => item.id == id)
  //     .files.map((file) => (
  //       <div style={thumb} key={file.preview}>
  //         <div style={thumbInner}>
  //           <img
  //             src={file.preview}
  //             style={img}
  //             // Revoke data uri after image is loaded
  //             // onLoad={() => {
  //             //   URL.revokeObjectURL(file.preview);
  //             // }}
  //           />
  //         </div>
  //         <div className="remove-div">
  //         <button
  //           className="remove-btn"
  //           onClick={(e) => handleDeleteAttachment(e, file.preview)}
  //         >
  //           X
  //         </button>
  //       </div>
  //       </div>
  //     ));

  const thumbs = () => {
    return scribbles

      .find((item) => item._id == id)
      .files.map((file) => (
        <div style={thumb} key={file.preview}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              // Revoke data uri after image is loaded
              // onLoad={() => {
              //   URL.revokeObjectURL(file.preview);
              // }}
            />
          </div>
          <div className="remove-div">
            <button
              className="remove-btn"
              onClick={(e) => handleDeleteAttachment(e, file.preview)}
            >
              X
            </button>
          </div>
        </div>
      ));
  };

  const updateContent = () => {
    const scribbleContentToBeUpdated = scribbles.filter(
      (item) => item._id == id
    );

    //setSecreenshots(body.current.innerHTML);
    console.log("CURRENT in update fx", body.current.innerHTML);

    const newContent = body.current.innerHTML;
    console.log("newContent", newContent);
    setSecreenshots(newContent);
    console.log("CURRENT newCOntent", newContent);

    let dataPost = {
      content: newContent,
      files: selectedScribble[0].files,
    };
    fetch(`http://localhost:8080/api/scribbles/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error.message));
  };

  const update = () => {
    updateContent();
    setIsEditable(false);
    //workaround to update state
    navigate("/stray");
    navigate(0);
  };

  //console.log("fffilesPerScribble", files)

  // useEffect(() => {
  //     const selectedScribble = data['scribbles'].filter(item=>item.id ==id)
  //    console.log(files)
  //    setFiles(
  //     files.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

  //   useEffect(() => {
  //       // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //       return () => data["scribbles"]
  //       .find((item) => item.id == id)
  //       .files.forEach((file) => URL.revokeObjectURL(file.preview));
  //     }, []);

  //+++++++++Experiment Screenshot===========================================================================
  // const selectedScribble = data["scribbles"].filter((item) => item.id == id);
  // const c = selectedScribble[0].content;
  // console.log("OBJ", selectedScribble[0].content);
  // if (c.includes("data:image")) {
  //   console.log("yes", c.indexOf("data:image"));
  //   const img = document.createElement("img");
  //   img.src = c;
  //   document.body.appendChild(img);
  //   console.log(img)
  //   c.replace(img)
  // }

  //+++++++++Experiment Screenshot ORIGINAL===========================================================================
  //   //html string
  // const selectedScribble = scribbles.filter(
  //   (item) => item._id == sessionStorage.getItem("selectedScribble")
  // );

  console.log("ref body", body.current.innerHTML);
  const htmlStr = selectedScribble[0].content;

  // function decodeHtml(html) {
  //   if (document.getElementById("content")) {
  //     body.current = document.getElementById("content");
  //     body.current.innerHTML = html;
  //     console.log("current value", body.current.innerHTML);
  //     return body.current.value;
  //   }
  // }

  function decodeHtml(html) {
    if (document.getElementById("content")) {
      var txt = document.getElementById("content");
      txt.innerHTML = html;
      return txt.value;
    }
  }

  const decodedHTML = decodeHtml(htmlStr);
  console.log("attachment", selectedScribble[0].attachment);

  // //Need to have scribble content onload so that decodeHtml function can be used
  // useEffect(() => {
  //   setSecreenshots(selectedScribble[0].content);
  //   return () => setSecreenshots([]);
  // }, []);

  return (
    <div>
      <div>Per Scribble Page - ID {id}</div>

      <div>
        <h2>
          {selectedScribble._id}, {selectedScribble.title}
        </h2>

        {/* <section id="content">{decodedHTML}</section> */}
        <section
          id="content"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          ref={body}
        >
          {decodedHTML}
        </section>

        {/* <aside>{renderedAttachments}</aside> */}
        {selectedScribble[0].attachment && (
          <aside style={thumbsContainer}>{thumbs()}</aside>
        )}
      </div>
      <div>
        <Icon
          icon="icon-park-outline:back"
          color="black"
          width="30"
          onClick={() => navigate(-1)}
        />
        {!isEditable ? (
          <Icon icon="uiw:edit" color="black" width="30" onClick={handleEdit} />
        ) : (
          <Icon
            icon="material-symbols:update"
            color="red"
            width="30"
            onClick={update}
          />
        )}

        <Icon
          icon="ion:trash-outline"
          color="black"
          width="30"
          onClick={() => handleDelete(scribbleData._id)}
        />

        <Icon
          icon="mingcute:drawer-line"
          color="black"
          width="30"
          height="30"
          onClick={() => navigate("/sort", { state: { id: id } })}
        />
        {/* <FileDrop files={files} setFiles={setFiles} /> */}
      </div>
    </div>
  );
}
