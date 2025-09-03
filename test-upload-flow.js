// Simple test to upload     const uploadResponse = await fetch(
      "http://localhost:3000/api/recipe/upload",
      {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
      }
    );

    console.log("Upload Status:", uploadResponse.status);
    const uploadResult = await uploadResponse.json();
    console.log("Upload Response:", JSON.stringify(uploadResult, null, 2));

    if (uploadResult.success && uploadResult.url) {
      console.log("\\n🔍 Testing image access...");
      const imageUrl = `http://localhost:3000${uploadResult.url}`;
      console.log("Image URL:", imageUrl);fy it can be accessed
const FormData = require("form-data");

async function testUpload() {
  try {
    // Create a simple test image (1x1 red pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
      0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0x1d, 0x01, 0x01, 0x00, 0x00, 0xff,
      0xff, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xe5, 0x27, 0xde, 0xfc, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);

    const form = new FormData();
    form.append("file", testImageBuffer, {
      filename: "test-image.png",
      contentType: "image/png",
    });
    form.append("category", "recipes");
    form.append("recipeId", "test-123");

    console.log("🚀 Uploading test image...");

    const uploadResponse = await fetch(
      "http://localhost:3001/api/recipe/upload",
      {
        method: "POST",
        body: form,
        headers: form.getHeaders(),
      }
    );

    console.log("Upload Status:", uploadResponse.status);
    const uploadResult = await uploadResponse.json();
    console.log("Upload Response:", JSON.stringify(uploadResult, null, 2));

    if (uploadResult.success && uploadResult.url) {
      console.log("\\n🔍 Testing image access...");
      const imageUrl = `http://localhost:3001${uploadResult.url}`;
      console.log("Image URL:", imageUrl);

      const imageResponse = await fetch(imageUrl);
      console.log("Image Status:", imageResponse.status);
      console.log(
        "Image Content-Type:",
        imageResponse.headers.get("content-type")
      );

      if (imageResponse.status === 200) {
        console.log("✅ Success! Image uploaded and accessible");
      } else {
        console.log("❌ Image not accessible");
      }
    } else {
      console.log("❌ Upload failed");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testUpload();
}

module.exports = { testUpload };
