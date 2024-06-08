#!/usr/bin/env node

import { CreateGetNameProject } from "#modules/.create-get-name-project.js";
import { updateDependencies } from "#modules/.check-new-updates.js";

(async function () {
  const result = await updateDependencies();
  if (result) await CreateGetNameProject();
  return 0;
})();
