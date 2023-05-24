function doGet(e) {
  const studio = e.parameter.studio;
  const projNo = e.parameter.projNo;
  let tmp = HtmlService.createTemplateFromFile("index");
  tmp.studio = studio;
  tmp.projNo = projNo;
  return tmp
    .evaluate()
    .setTitle("dwp | Project")
    .addMetaTag("viewport", "width-device-width, initial-scale=1.0");
}
