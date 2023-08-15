const { readFile } = require("fs").promises;
const HTMLValidate = require("html-validate");

const validateHtml = async () => {
  const filePath = "index.html"; // Ruta al archivo HTML a probar
  const htmlContent = await readFile(filePath, "utf-8");

  const config = HTMLValidate.getConfig({
    extends: ["html-validate:recommended"]
  });
  
  const htmlValidator = new HTMLValidate(config);
  const validationResult = htmlValidator.validateString(htmlContent);
  
  if (validationResult.length === 0) {
    console.log("El HTML es válido.");
    process.exit(0);
  } else {
    console.error("El HTML contiene errores:");
    console.error(validationResult.map(error => `- ${error.message}`).join("\n"));
    process.exit(1);
  }
};

validateHtml();
