/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { copySync } from "fs-extra";
import { generate } from "@commerce-apps/raml-toolkit";
import { registerHelpers, registerPartials, setupApis } from "./scripts/utils";

const API_DIRECTORY =
  process.env.COMMERCE_SDK_INPUT_DIR || `${__dirname}/apis`;
const OUTPUT_DIRECTORY = `${__dirname}/renderedTemplates`;
const STATIC_DIRECTORY = `${__dirname}/static`;

registerHelpers();
registerPartials();

console.log(`Creating SDK for ${API_DIRECTORY}`);

copySync(STATIC_DIRECTORY, OUTPUT_DIRECTORY);

setupApis(API_DIRECTORY, OUTPUT_DIRECTORY).then((apis: generate.ApiMetadata) =>
  apis.render()
);
