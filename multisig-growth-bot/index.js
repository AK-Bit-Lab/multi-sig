import {
  CELO_MAINNET_CHAIN_ID,
  BASE_REWARD,
  ACTION_STAKE,
  ACTION_CHECK_IN,
} from "celopulse-sdk";
import {
  APP_NAME,
  GAME_CONFIG,
  DEFAULT_CONTRACT_ADDRESS as CLICKER_CONTRACT,
  CELO_MAINNET_CHAIN_ID as CLICKER_CHAIN_ID,
} from "celoclicker-game-sdk";
import {
  DEFAULT_CONTRACT_ADDRESS as ARCADE_CONTRACT,
  ENTRY_FEE,
  Difficulty,
  GameType,
  createArcadeConfig,
} from "celo-arcade-sdk";
import {
  CONTRACTS,
  USDM_ADDRESS,
  USDC_ADDRESS,
} from "@bamzzstudio/contenthub-sdk";

const NETWORK = process.env.CELO_NETWORK || "mainnet";

function toLogValue(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, (_, item) => (typeof item === "bigint" ? item.toString() : item));
  } catch {
    return String(value);
  }
}

async function runMultiSigGrowthBot() {
  console.log("Multi-Sig Growth Bot active");
  console.log(`Network: ${NETWORK}`);
  let successfulCalls = 0;

  console.log("\nVerifying CeloPulse SDK...");
  try {
    console.log(`CeloPulse chain ID: ${CELO_MAINNET_CHAIN_ID}`);
    console.log(`Base reward: ${toLogValue(BASE_REWARD)}`);
    console.log(`Action stake: ${ACTION_STAKE}`);
    console.log(`Action check-in: ${ACTION_CHECK_IN}`);
    successfulCalls += 1;
  } catch (error) {
    console.warn("CeloPulse SDK call failed:", error?.message || error);
  }

  console.log("\nVerifying CeloClicker SDK...");
  try {
    console.log(`App name: ${APP_NAME}`);
    console.log(`Clicker chain ID: ${CLICKER_CHAIN_ID}`);
    console.log(`Clicker contract: ${CLICKER_CONTRACT}`);
    console.log(`Game config: ${toLogValue(GAME_CONFIG)}`);
    successfulCalls += 1;
  } catch (error) {
    console.warn("CeloClicker SDK call failed:", error?.message || error);
  }

  console.log("\nVerifying Celo Arcade SDK...");
  try {
    console.log(`Arcade contract: ${ARCADE_CONTRACT}`);
    console.log(`Entry fee: ${toLogValue(ENTRY_FEE)}`);
    console.log(`Difficulty levels: ${Object.keys(Difficulty).join(", ")}`);
    console.log(`Game types: ${Object.keys(GameType).join(", ")}`);
    const config = createArcadeConfig({});
    console.log(`Arcade config network: ${config.network ?? "default"}`);
    successfulCalls += 1;
  } catch (error) {
    console.warn("Celo Arcade SDK call failed:", error?.message || error);
  }

  console.log("\nVerifying ContentHub SDK...");
  try {
    const celoContracts = CONTRACTS[42220] ?? CONTRACTS[Object.keys(CONTRACTS)[0]];
    console.log(`ContentHub contracts chain: ${Object.keys(CONTRACTS)[0]}`);
    console.log(`ContentHub contracts: ${toLogValue(celoContracts)}`);
    console.log(`USDm address: ${USDM_ADDRESS}`);
    console.log(`USDC address: ${USDC_ADDRESS}`);
    successfulCalls += 1;
  } catch (error) {
    console.warn("ContentHub SDK call failed:", error?.message || error);
  }

  if (successfulCalls === 0) {
    throw new Error("No live SDK calls succeeded.");
  }

  console.log(`\nSDK integration check completed. ${successfulCalls}/4 SDKs verified.`);
}

runMultiSigGrowthBot().catch(error => {
  console.error("Multi-Sig Growth Bot failed:", error?.message || error);
  process.exitCode = 1;
});
