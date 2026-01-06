#!/usr/bin/env node

import { program } from "commander";
import gameState from "../src/lib/state.js";
import { showMainMenu } from "../src/lib/gameLogic.js";

program.version("1.0.0");

showMainMenu(gameState);

program.parse(process.argv);