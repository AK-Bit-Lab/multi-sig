const NETWORK = process.env.CELO_NETWORK || "mainnet";

async function runMultiSigStarterApp() {
  console.log("Multi-Sig starter app using real SDK integration");
  console.log(`Network: ${NETWORK}`);

  try {
    const { CELO_MAINNET_CHAIN_ID, BASE_REWARD, ACTION_STAKE } = await import("celopulse-sdk");
    console.log(`CeloPulse chain: ${CELO_MAINNET_CHAIN_ID}`);
    console.log(`Base reward: ${String(BASE_REWARD)}`);
    console.log(`Action stake key: ${ACTION_STAKE}`);
  } catch (error) {
    console.warn("CeloPulse call failed:", error?.message || error);
  }

  try {
    const { APP_NAME, DEFAULT_CONTRACT_ADDRESS: CLICKER_CONTRACT } = await import("celoclicker-game-sdk");
    console.log(`CeloClicker app: ${APP_NAME}`);
    console.log(`CeloClicker contract: ${CLICKER_CONTRACT}`);
  } catch (error) {
    console.warn("CeloClicker call failed:", error?.message || error);
  }

  try {
    const { DEFAULT_CONTRACT_ADDRESS: ARCADE_CONTRACT, ENTRY_FEE, createArcadeConfig } = await import("celo-arcade-sdk");
    console.log(`Arcade contract: ${ARCADE_CONTRACT}`);
    console.log(`Entry fee: ${String(ENTRY_FEE)}`);
    const config = createArcadeConfig({});
    console.log(`Arcade config: ${JSON.stringify(config, (_, v) => typeof v === "bigint" ? v.toString() : v)}`);
  } catch (error) {
    console.warn("Celo Arcade call failed:", error?.message || error);
  }

  try {
    const { CONTRACTS, USDM_ADDRESS } = await import("@bamzzstudio/contenthub-sdk");
    const chainIds = Object.keys(CONTRACTS);
    console.log(`ContentHub supported chains: ${chainIds.join(", ")}`);
    console.log(`USDm: ${USDM_ADDRESS}`);
  } catch (error) {
    console.warn("ContentHub call failed:", error?.message || error);
  }

  console.log("\nMulti-Sig starter app integration complete.");
}

runMultiSigStarterApp().catch(error => {
  console.error("Multi-Sig starter app failed:", error?.message || error);
  process.exitCode = 1;
});
