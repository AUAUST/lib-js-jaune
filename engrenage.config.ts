import { defineConfig } from "@auaust/engrenage/config";
import {
  adapters,
  constants,
  declarations,
  entry,
  enums,
  errors,
  fixtures,
  index,
  operations,
  ports,
  role,
  testsetup,
  types,
  utils,
} from "@auaust/engrenage/roles";

const classes = role({
  name: "classes",
  purpose: "Classes, one per module.",
  exports: "named-match",
  effects: "confined",
  public: true,
  collected: true,
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

export default defineConfig({
  preset: "library",
  visibility: "private",
  src: {
    baseline: "2026-11",
    roles: [
      index(),
      entry(),
      declarations(),
      constants({
        public: true,
        collected: true,
        subpath: false,
        effects: "confined",
      }),
      types({ public: true, collected: true }),
      utils({ public: true, collected: true }),
      classes,
      ports({ collected: true }),
      adapters({ effects: "confined", collected: true }),
    ],
  },
  tests: {
    roles: [...roles, fixtures(), testsetup()],
    mirror: true,
  },
  scripts: {
    roles,
  },
  tooling: {
    roles,
  },
  agents: {
    preferred: ["claude"],
    attribution: false,
  },
});
