/**
 * Arrange design review data into object for each phase step
 * @param {string} projNo - project number
 * @param {string} studio - project studio
 * @param {string} currentPhase - project current phase
 *
 * @returns {Object[]} drSteps - data used for ProjectStepper
 *  @returns {string} drSteps[].label - phase of that step
 *  @returns {string} drSteps[].phase - shortened phase (shows in step circle)
 *  @returns {boolean} drSteps[].isAtCurrentPhase - true if step matched with current phase (shows current sign above step circle)
 *  @returns {string} drSteps[].color - for determine step circle color
 *  @returns {string} drSteps[].link - if available, shows link to form or info
 * @returns {Object} isReviewNotRequired
 *  @returns {boolean} isReviewNotRequired.value - true if the whole project design review is not required
 *  @returns {string} isReviewNotRequired.reason - reason for project review not required
 * @returns {string} drPortalLink - design review portal link of that project
 */
function DesignReview(projNo, studio, currentPhase) {
  //link for adding new booking
  const drFormLink = `https://script.google.com/a/macros/dwp.com/s/AKfycbykM4eDfBy-T9oWmmi-iZK0rmWh3VkWgb6jf7K_KoYfdaR-rPyM/exec`;
  //link to specific project design review dashboard. Works only if user had submitted at least one booking.
  let drPortalLink = `https://script.google.com/a/dwp.com/macros/s/AKfycbzgUcpIYDoYrJ5hw6zateprYX3qwVtBkvNN0shedoAFXxz-a-Oz/exec?projectno=${Utilities.base64EncodeWebSafe(
    projNo
  )}&studio=${Utilities.base64EncodeWebSafe(studio)}`;

  let drSteps = [
    {
      label: "Phase A - Design Workshop",
      phase: "A",
      isAtCurrentPhase: false,
      link: "",
      color: "",
    },
    {
      label: "Phase C1 - Masterplanning",
      phase: "C1",
      isAtCurrentPhase: false,
      link: "",
      color: "",
    },
    {
      label: "Phase C2 - Concept Design",
      phase: "C2",
      isAtCurrentPhase: false,
      link: "",
      color: "",
    },
    {
      label: "Phase C3 - Schematic Design",
      phase: "C3",
      isAtCurrentPhase: false,
      link: "",
      color: "",
    },
    {
      label: "Phase D - Design Development",
      phase: "D",
      isAtCurrentPhase: false,
      link: "",
      color: "",
    },
  ];

  //get dr data from dr sheet
  let ss = SpreadsheetApp.openById(
    "1olXjRpwA2wgGp20YeMGU7Ue-I-y4eiPYeStJuoLWniY"
  );
  //get data from all tabs
  let mainData = ss.getSheetByName("Sheet1").getDataRange().getValues();
  let addPhaseDummyData = ss
    .getSheetByName("addPhaseDummy")
    .getDataRange()
    .getValues();
  let phaseADummyData = ss
    .getSheetByName("phaseADummy")
    .getDataRange()
    .getValues();

  //filter only selected project (matching project number and studio)
  let isReviewNotRequired = { value: false, reason: "" };
  let mainProj = mainData.filter((row) => {
    if (row[0] === projNo && row[3] === studio) {
      //The reason This project does not require a design review is not blank -> project doesn't need review
      //row[59] = The reason This project does not require a design review (column BH)
      if (row[59]) {
        isReviewNotRequired = { value: true, reason: row[59] };
      }
      return true;
    }
  });

  if (mainProj.length === 0) {
    drPortalLink = ""; //no existing booking, cannot open DR portal.
  }

  //if the whole project is not required -> return blank array so it doesn't show step & isReviewNotRequired = {value: true, reason: row[59]}
  //if the whole project has no record (No matching projNo + studio and not approved) -> return blank array & isReviewNotRequired = {value: false, reason: ""}
  if (isReviewNotRequired.value) {
    return { drSteps: [], isReviewNotRequired, drDotColor: "white" };
  }

  //*******Continue below section only if project is Design Review required ********/

  let addPhaseDummyProj = addPhaseDummyData.filter(
    (row) => row[0] === projNo && row[3] === studio
  );
  let phaseADummyProj = phaseADummyData.filter(
    (row) => row[0] === projNo && row[3] === studio
  );

  //extract phase alphabet (ex. "A" or "" if no current phase) from current phase
  let currentPhaseIndex = drPhasetoNum(
    currentPhase ? currentPhase.split(" ")[1] : ""
  );

  let allDummyProj = [...addPhaseDummyProj, ...phaseADummyProj];

  for (let i = 0; i < drSteps.length; i++) {
    let drStepPhaseIndex = drPhasetoNum(drSteps[i].label.split(" ")[1]);
    //combine dummy data from addPhaseDummy and phaseADummy sheets. Counted as not required for that step
    //row[14] = Design State (col O),
    //row[15] = reason not required of that phase (only for dummy data), row[16] = submitter (only for dummy data)
    let findAllDummyMatching = allDummyProj.find(
      (row) => row[14] === drSteps[i].label
    );
    //find only if matching design state AND the review is approved
    let isBooked = { value: false, reviewEditLink: "" };
    let findMainMatching = mainProj.find((row) => {
      //row[14] = Design State (col O), row[50] = Approved (column AY)
      //if approved col is blank AND NOT not required -> booking already booked but not yet submitted record
      if (row[14] === drSteps[i].label) {
        if (!row[50] || row[50] === "No") {
          isBooked = { value: true, reviewEditLink: row[54] };
        } else if (["Yes", "Approved with comments"].includes(row[50])) {
          isBooked = { value: true, reviewEditLink: row[54] };
          return true;
        }
      }
    });

    //for that step, if the step is red or yellow => action required
    //if booked, link to edit record page
    //if not booked, link to new booking form page
    let actionRequiredLink = isBooked.value
      ? isBooked.reviewEditLink
      : drFormLink;

    //if current phase not reached design step
    //-> show grey
    if (drStepPhaseIndex > currentPhaseIndex) {
      drSteps[i].color = "grey";
      //there is existing booking + finished record
      //->show green
    } else if (findMainMatching) {
      drSteps[i].color = "green";
      drSteps[i].link = drPortalLink;
      //dummy record existed (either generated for old project or user submitted it with reason)
      //->show black
    } else if (findAllDummyMatching) {
      //show reason not required tooltip if reason (col P) != ""
      if (findAllDummyMatching[15]) {
        drSteps[i].tooltip = `Reason not required: ${findAllDummyMatching[15]}`;
      }
      drSteps[i].color = "black";
      //No matching record OR the project is not approved/ not submitted record after booking = ACTION REQUIRED
    } else {
      //if current phase = design step
      //->show yellow
      if (drStepPhaseIndex === currentPhaseIndex) drSteps[i].color = "yellow";
      //if current phase passed design step
      //->show red
      if (drStepPhaseIndex < currentPhaseIndex) drSteps[i].color = "red";
      drSteps[i].link = actionRequiredLink;
    }

    //check if the current phase step is at current phase or not by index phase (true = show current phase sign above the circle)
    if (drStepPhaseIndex === currentPhaseIndex) {
      drSteps[i].isAtCurrentPhase = true;
    } else {
      drSteps[i].isAtCurrentPhase = false;
    }
  }

  let drDotColor = "";
  if (drSteps.some((step) => step.color === "red")) {
    drDotColor = "red";
  } else if (drSteps.some((step) => step.color === "yellow")) {
    drDotColor = "yellow";
  } else {
    drDotColor = "green";
  }

  return { drSteps, isReviewNotRequired, drPortalLink, drDotColor };
}

/**
 * Convert current phase and step phase into number for comparison for design review
 * @param {string} phase - phase alphabets (fullPhase.split(" ")[1]) or "" (if no phase)
 *
 * @returns {number} phase
 */
function drPhasetoNum(phase) {
  if (phase == "" || phase.length > 2) {
    phase = null;
  } else if (phase == "A") {
    phase = 0;
  } else if (phase == "B") {
    phase = 1;
  } else if (phase == "C1") {
    phase = 2;
  } else if (phase == "C2") {
    phase = 3;
  } else if (phase == "C3") {
    phase = 4;
  } else if (
    ["D", "D1"].some(function (r) {
      return r == phase;
    })
  ) {
    phase = 5;
  } else {
    //for phase D2+
    phase = 6;
  }
  return phase;
}
