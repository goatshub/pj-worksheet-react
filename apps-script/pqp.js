/**
 * Arrange PQP data into object for each phase step
 * @param {number} pqpRow - row number of that project in pqp sheet
 * @param {string} currentPhase - project current phase
 *
 * @returns {Object[]} pqpSteps - data used for ProjectStepper
 * @returns {string} pqpSteps[].label - phase of that step
 * @returns {string} pqpSteps[].phase - shortened phase (shows in step circle)
 * @returns {boolean} pqpSteps[].isCurrentPhase - true if step matched with current phase (shows current sign above step circle)
 * @returns {string} pqpSteps[].color - for determine step circle color
 * @returns {string} [pqpSteps[].link] - if available, shows link to form or info
 * @returns {string} pqpDotColor - dashboard color status of project
 * @returns {string} pqpProjectLink - link of main project pqp form
 */
function PQP(pqpRow, currentPhase) {
  let pqpSteps = [
    { label: "Phase A - Start up", phase: "A" },
    { label: "Phase B - Briefing", phase: "B" },
    { label: "Phase C1 - Masterplanning", phase: "C1" },
    { label: "Phase C2 - Concept Design", phase: "C2" },
    { label: "Phase C3 - Schematic Design", phase: "C3" },
    { label: "Phase D - Design Development", phase: "D" },
    { label: "Phase E1 - Tender Documentation", phase: "E1" },
    {
      label: "Phase E2 - Construction Documentation",
      phase: "E2",
    },
    { label: "Phase F - Tender", phase: "F" },
    { label: "Phase G - Construction", phase: "G1" },
    { label: "Phase G2 - Post Construction", phase: "G2" },
    { label: "Audit", phase: "" },
    { label: "Close Out", phase: "" },
  ];

  //get pqp data from pqp sheet
  let ss = SpreadsheetApp.openById(
    "1d1MKrq5Ds-QPM2LJz-hT7mHrbF-SGKiDkjnWUqmIi2s"
  ).getSheetByName("All Phases");
  //get only row of target project
  let form = ss.getRange(pqpRow, 1, 1, ss.getLastColumn()).getDisplayValues();

  //extract phase alphabet (ex. "A" or "" if no current phase) from current phase
  let indexPhase = pqpPhasetoNum(
    currentPhase ? currentPhase.split(" ")[1] : ""
  );

  //**get required phases  for the project */
  var sliceneedPhase = form[0].slice(22, 25).join(", ").split(", ");
  //get required phases and push unique values into array
  var needPhase = new Array();
  var indexneedPhase = new Array();
  sliceneedPhase.forEach(function (item) {
    if (!needPhase.includes(item)) needPhase.push(item);
  });
  //convert needed phases into phase number
  needPhase.forEach(function (item) {
    try {
      var value = pqpPhasetoNum(item.split(" ")[1].replace(":", ""));
      value != null
        ? value == 10
          ? indexneedPhase.push(13)
          : indexneedPhase.push(value)
        : null;
    } catch (err) {}
  });

  //*** Check both completion date and completion authority for each phase */
  //recorded Completion Date
  var phases = [
    form[0][33], //phase A
    form[0][54], //phase B
    form[0][71],
    form[0][88],
    form[0][127],
    form[0][184],
    form[0][211],
    form[0][227],
    form[0][253],
    form[0][318],
    form[0][338],
    form[0][390],
    form[0][403],
  ];
  //recorded Completion Authority
  var autho = [
    form[0][34], //phase A
    form[0][55], //phase B
    form[0][73],
    form[0][90],
    form[0][129],
    form[0][186],
    form[0][213],
    form[0][229],
    form[0][255],
    form[0][320],
    form[0][340],
    "-",
    "-",
  ];
  //recorded form
  var link = [
    form[0][0], //recorded form for the whole project
    form[0][25], //recorded form phase A
    form[0][35], //recorded form phase B
    form[0][56],
    form[0][74],
    form[0][91],
    form[0][130],
    form[0][187],
    form[0][214],
    form[0][230],
    form[0][256],
    form[0][321],
    form[0][341],
    form[0][391],
  ];
  var newform = [
    "https://docs.google.com/forms/d/e/1FAIpQLSf-WVl1ewyAIX2Lp8Jrvmjk7oVlkVdhGv5Ze2wG6HfFNfz_xQ/viewform", //blank phase A form
    "https://docs.google.com/forms/d/e/1FAIpQLScrh659AfOXJel0Sng-AAQRH65iSbtJ6JjVgdzqNdaLYrxCRg/viewform", //blank phase B form
    "https://docs.google.com/forms/d/e/1FAIpQLSeIIUMbslV7CjWuJHi_-jGHYGpWSNsBiLO31bBz7_8C9oYLwA/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLScjOh8jTcV9oPb5Vm7Ru-S9ksEBr2b_skXH8-LYFZsDldg8pA/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSdSh2cJLH8XoucogJSi6Z2hj5LsK7u1NmRoplNIKpnCyntTDg/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSeSeRYZM6J27REv-ikfv_SQXMObeyJvdt4jBgx0F5_dXjZYoA/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSczofL87m2_KrvvbeQTqQ9fO3Jn_7uiSIQ18C_nRuy7XpSUpg/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSdNc618T-y6xXf3zRPQlKRCPX0IT7sUhOhNeSB3mM4WJFTjIA/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSdbeX9VWSi2YmfaWzdyxqiL0UmurDRWXyHzb5de58zn3LeYLA/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSeENuCzC_hxldeX_uQp6T17l3uHJlq6Yn3-4uu9cAg4tFmLkg/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSfiRccQkazaWAIkTrx1jWRq_oDGG4jJiFfvn77Zi93EBIQvag/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSd76pCVGz-KnxefsnpUYnPqbQo2ibaaT7BJBmmiuESL2dkJmQ/viewform",
    "https://docs.google.com/forms/d/e/1FAIpQLSe1CJjAvDz4sGYNwH2PeOLDEHOxMZ4HGZqnRwuPYG2pi60PBA/viewform",
  ];

  //loop all phases in pqpSteps
  for (let i = 0; i < pqpSteps.length; i++) {
    //check both completion date and authority
    if (phases[i] && autho[i]) {
      //-> green if both are filled and is a required phase
      if (
        indexneedPhase.some(function (item) {
          return i == item;
        })
      ) {
        pqpSteps[i].color = "green";
      }
      //-> black if it is not required phase
      else {
        pqpSteps[i].color = "black";
      }
      //authority and phase not filled
    } else {
      //phase is before current phase
      if (i < indexPhase) {
        if (
          indexneedPhase.some(function (item) {
            return i == item;
          }) == true
        ) {
          pqpSteps[i].color = "red";
        } else {
          pqpSteps[i].color = "black";
        }
        //phase is at current phase
      } else if (i == indexPhase) {
        pqpSteps[i].color = "yellow";
        //phase after current phase
      } else {
        pqpSteps[i].color = "grey";
      }
    }
    //check if the current phase step is at current phase or not by index phase (true = show current phase sign above the circle)
    if (i == indexPhase) {
      pqpSteps[i].isAtCurrentPhase = true;
    } else {
      pqpSteps[i].isAtCurrentPhase = false;
    }
    //check if current step has existing form link or not, if not -> blank form link of that phase.
    pqpSteps[i].link =
      link[Number(i) + 1] === "" ? newform[i] : link[Number(i) + 1];
  }

  //** Get pqp color status on dashboard */
  let pqpDotColor = "";
  if (
    pqpSteps.some(function (step) {
      return step.color.includes("red");
    }) == true
  ) {
    pqpDotColor = "red";
  } else if (
    pqpSteps.some(function (step) {
      return step.color.includes("yellow");
    }) == true
  ) {
    pqpDotColor = "yellow";
  } else {
    pqpDotColor = "green";
  }

  return { pqpSteps, pqpDotColor, pqpProjectLink: link[0] };
}

/**
 * Convert current phase and step phase into number for comparison for pqp
 * @param {string} phase - phase alphabets (fullPhase.split(" ")[1]) or "" (if no phase)
 *
 * @returns {number} phase
 */
function pqpPhasetoNum(phase) {
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
    ["D", "D1", "D2"].some(function (r) {
      return r == phase;
    })
  ) {
    phase = 5;
  } else if (phase == "E1") {
    phase = 6;
  } else if (phase == "E2") {
    phase = 7;
  } else if (phase == "F") {
    phase = 8;
  } else if (phase == "G1" || phase == "G") {
    phase = 9;
  } else {
    //G2 +
    phase = 10;
  }
  return phase;
}
