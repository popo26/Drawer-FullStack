import { Icon } from "@iconify/react";

export default {
  //+++++++++++++Function --- Scribbles in the selected drawer+++++++++++++++
  findScribbles: () => {
    //console.log("Obj ID", sessionStorage.getItem("selectedDrawer"));
    const scribbles = JSON.parse(sessionStorage.getItem("scribblesData"));
    let scribbleArray = [];
    for (let x of scribbles) {
      if (
        x["drawerId"] &&
        x.stray === false &&
        x["drawerId"] == sessionStorage.getItem("selectedDrawer")
      ) {
        scribbleArray.push(x);
        console.log("scribbleArray", scribbleArray);
      }
    }
    const result = scribbleArray.map((scrb) => (
      <p key={scrb._id} className={"sort-preview-scribbles scrb-indent" + 1}>
        <span>
          <Icon icon="tabler:scribble" color="black" />
        </span>{" "}
        {scrb.title}
      </p>
    ));
    return result.length > 0 ? (
      result
    ) : (
      <p className="empty-drawer">No scribble exists.</p>
    );
  },

  //+++++++++++Function --- Sub-drawers in the selected drawer+++++++++++++++
  findSubDrawers: () => {
    const drawers = JSON.parse(sessionStorage.getItem("drawersData"));
    let subDrawersArray = [];
    for (let x in drawers) {
      if (
        drawers[x]["drawerId"] &&
        drawers[x]["drawerId"] == sessionStorage.getItem("selectedDrawer")
      ) {
        subDrawersArray.push(drawers[x]);
      }
    }
    return subDrawersArray.map((sub) => (
      <p key={sub._id} className={"sort-preview-sub-drawers indent-" + 1}>
        <span>
          <Icon icon="mingcute:drawer-line" color="black" />
        </span>{" "}
        {sub.name}
      </p>
    ));
  },
};
