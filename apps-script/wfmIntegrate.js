function getProjectFromIntegrate(projNo, studio) {
  if (!projNo || !studio)
    throw new Error("No project number or studio in URL parameters");
  //get dashboard data
  const ss = SpreadsheetApp.openById(
    "1kA5WnWXgAfqjTPYoyDZtkTs5ABagPwZ-_LN_WJQGiO0"
  ).getSheetByName("Integrate");
  let data = ss.getDataRange().getValues();
  let projData = data.find((row) => row[0] === projNo && row[4] === studio);
  if (projData) {
    let projNo = projData[0];
    let projStudio = projData[4];
    let currentPhase = projData[6];
    let pqpRow = projData[24]; //row number of this project in pqp sheet
    let pqpDotColor = projData[44]; //pqp dashboard dot color
    let pqpSteps = []; //data of pqp to show for each phase step
    //projData[18] is column S (PQP), if true = design review not required
    let isPqpNotRequired = projData[18];
    let pqpProjectLink =
      "https://docs.google.com/forms/d/e/1FAIpQLSe1CJjAvDz4sGYNwH2PeOLDEHOxMZ4HGZqnRwuPYG2pi60PBA/viewform"; //blank pqp project form
    if (pqpRow && currentPhase) {
      //update the values if pqp has record
      ({ pqpSteps, pqpDotColor, pqpProjectLink } = PQP(pqpRow, currentPhase));
    }
    let drDotColor = projData[43];
    let drSteps = [];
    let isReviewNotRequired = false;
    let drPortalLink;
    if (currentPhase) {
      //update the values if currentPhase has record
      ({ drSteps, isReviewNotRequired, drPortalLink, drDotColor } =
        DesignReview(projNo, projStudio, currentPhase));
    } else {
      drDotColor = "grey"; //no current phase
    }

    let projObj = {
      projNo,
      projName: projData[1],
      projStudio,
      projStatus: projData[5],
      currentPhase,
      projManager: projData[7],

      pqpDotColor,
      pqpSteps,
      pqpProjectLink,
      isPqpNotRequired,

      drDotColor,
      drPortalLink,
      drSteps,
      isReviewNotRequired,
    };
    return projObj;
  } else {
    throw new Error("No project data found.");
  }
}
