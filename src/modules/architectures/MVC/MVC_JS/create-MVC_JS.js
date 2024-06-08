import fs from "fs";
import path from "path";
import global from "#variables/.variables-global.js";
import {
  app_mjs,
  controller_mjs,
  index_ejs,
  model_mjs,
  package_json,
  package_lock_json,
  route_mjs,
  style_css,
} from "#architectureMVCJS/.infos-MVC_JS.js";

export const createMVCJS = async () => {
  const success = generateFolders();
  if (!success) {
    console.error("Failed to create folders.");
    return;
  }
  generatePackages();
  generateSrcApp();
  generateController();
  generateModel();
  generateStyle();
  generateRoutes();
  generateIndex();
};

const generateFolders = () => {
  const folders = [
    global.projectName,
    path.join(global.projectName, "src"),
    path.join(global.projectName, "__tests__"),
    path.join(global.projectName, "src/config"),
    path.join(global.projectName, "src/controllers"),
    path.join(global.projectName, "src/models"),
    path.join(global.projectName, "src/public"),
    path.join(global.projectName, "src/public/imgs"),
    path.join(global.projectName, "src/public/styles"),
    path.join(global.projectName, "src/routes"),
    path.join(global.projectName, "src/views"),
  ];

  try {
    for (const folder of folders) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
    }
    return true;
  } catch (error) {
    console.error("Error creating folders:", error);
    return false;
  }
};

const generatePackages = () => {
  const packageContents = {
    "package.json": package_json,
    "package-lock.json": package_lock_json,
  };

  for (const [filename, content] of Object.entries(packageContents)) {
    const filePath = path.join(global.projectName, filename);
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};

const generateSrcApp = () => {
  const appContent = {
    "app.mjs": app_mjs,
  };

  for (const [filename, content] of Object.entries(appContent)) {
    const filePath = path.join(global.projectName, "src", filename);
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};

const generateController = () => {
  const controllerContent = {
    "controller.mjs": controller_mjs,
  };

  for (const [filename, content] of Object.entries(controllerContent)) {
    const filePath = path.join(
      global.projectName,
      "src",
      "controllers",
      filename
    );
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};

const generateModel = () => {
  const modelContent = {
    "model.mjs": model_mjs,
  };

  for (const [filename, content] of Object.entries(modelContent)) {
    const filePath = path.join(global.projectName, "src", "models", filename);
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};

const generateStyle = () => {
  const styleContent = {
    "style.css": style_css,
  };

  for (const [filename, content] of Object.entries(styleContent)) {
    const filePath = path.join(
      global.projectName,
      "src",
      "public",
      "styles",
      filename
    );
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};

const generateRoutes = () => {
  const routeContent = {
    "route.mjs": route_mjs,
  };

  for (const [filename, content] of Object.entries(routeContent)) {
    const filePath = path.join(global.projectName, "src", "routes", filename);
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};

const generateIndex = () => {
  const indexContent = {
    "index.ejs": index_ejs,
  };

  for (const [filename, content] of Object.entries(indexContent)) {
    const filePath = path.join(global.projectName, "src", "views", filename);
    try {
      fs.writeFileSync(filePath, content, "utf8");
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }
};
