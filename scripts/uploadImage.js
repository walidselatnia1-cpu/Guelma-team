const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");

// Configuration
const CONFIG = {
  API_BASE_URL: "http://localhost:3000", // Use relative URLs when running locally
  UPLOAD_ENDPOINT: "/api/upload",
  RECIPE_ENDPOINT: "/api/recipe",
  DEFAULT_CATEGORY: "recipes",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return types[ext] || "application/octet-stream";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryOperation(operation, maxRetries = CONFIG.MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      await delay(CONFIG.RETRY_DELAY * attempt);
    }
  }
}

async function uploadImage(imagePath, category = CONFIG.DEFAULT_CATEGORY) {
  return retryOperation(async () => {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    const form = new FormData();
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);

    form.append("file", imageBuffer, {
      filename: fileName,
      contentType: getContentType(fileName),
    });

    if (category) {
      form.append("category", category);
    }

    console.log(`Uploading image: ${fileName}`, "info");

    const response = await axios.post(
      `${CONFIG.API_BASE_URL}${CONFIG.UPLOAD_ENDPOINT}`,
      form,
      {
        headers: form.getHeaders(),
      }
    );
    // Axios puts response data in response.data
    response.ok = response.status >= 200 && response.status < 300;
    response.json = async () => response.data;
    response.text = async () => JSON.stringify(response.data);

    return await response.data;
  });
}

async function test() {
  const data = await uploadImage("2.jpg");
  console.log(data);
}

test(); //data.url is path of image
