import NanoModules from "./NanoModules.js";

const nanoModules = await NanoModules();
if (nanoModules) {
  const nanoModulesModuleContainer = document.getElementById(
    "nano_modules_modules"
  );
  if (nanoModules.length > 0) nanoModulesModuleContainer.innerHTML = "";
  for (const module of nanoModules) {
    if (module) {
      const instance = new module();
      const moduleName = instance.MODULE_NAME ? instance.MODULE_NAME : "";
      const moduleDescription = instance.MODULE_DESCRIPTION
        ? instance.MODULE_DESCRIPTION
        : "";
      const moduleVersion = instance.MODULE_VERSION
        ? instance.MODULE_VERSION
        : "";
      let moduleOutput = "";
      if (instance.MODULE_MAIN && typeof instance.MODULE_MAIN === "function") {
        moduleOutput = await instance.MODULE_MAIN();
      }
      const template = buildTemplate(
        moduleName,
        moduleDescription,
        moduleVersion,
        moduleOutput
      );
      nanoModulesModuleContainer.innerHTML += template;
    }
  }
}

function buildTemplate(name, description, version, output) {
  return `<div class="nano_modules_module">
      <div class="nano_module_name">${name} (${version})</div>
      <div class="nano_module_description">${description}</div>
      <div class="nano_module_output">${output}</div>
  </div>`;
}
