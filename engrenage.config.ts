import { defineConfig } from "@auaust/engrenage/config";
import {
  adapters,
  constants,
  createRolePreset,
  declarations,
  entry,
  enums,
  errors,
  fixtures,
  index,
  ports,
  testsetup,
  types,
  utils,
} from "@auaust/engrenage/roles";

const operations = createRolePreset({
  name: "operations",
  exports: "named-match",
});

const roles = [
  index(),
  constants(),
  declarations(),
  types(),
  utils(),
  errors(),
  enums(),
  ports(),
  adapters(),
  operations(),
];

const sourceRoles = [...roles, entry()];

export default defineConfig({
  preset: "library",
  visibility: "private",
  src: { baseline: "2026-11", roles: sourceRoles },
  tests: { roles: [...roles, fixtures(), testsetup()] },
  scripts: { roles },
  tooling: { roles },
  agents: { preferred: ["claude"], attribution: false },
});
