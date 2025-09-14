const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

// Configuration
const CONFIG = {
  API_BASE_URL: "https://flavorfable.com", // Use relative URLs when running locally
  UPLOAD_ENDPOINT: "/api/upload",
  RECIPE_ENDPOINT: "/api/recipe",
  DEFAULT_CATEGORY: "recipes",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

async function uploadImage(imagePath, category = CONFIG.DEFAULT_CATEGORY) {
  const retryOperation = async (operation, maxRetries = CONFIG.MAX_RETRIES) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        log(
          `Attempt ${attempt} failed, retrying in ${CONFIG.RETRY_DELAY}ms...`,
          "warning"
        );
        await delay(CONFIG.RETRY_DELAY * attempt);
      }
    }
  };

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

    log(`Uploading image: ${fileName}`, "info");

    const response = await fetch(
      `${CONFIG.API_BASE_URL}${CONFIG.UPLOAD_ENDPOINT}`,
      {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed (${response.status}): ${errorText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(`Upload failed: ${result.error || "Unknown error"}`);
    }

    log(`✅ Image uploaded successfully: ${result.filename}`, "success");
    return result;
  });
}

uploadImage("C:/Users/DELL P/Pictures/Screenshots/Screenshot (1).png");
