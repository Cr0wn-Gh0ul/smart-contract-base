import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-truffle5";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import os from "os";
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {

    networks: {
        hardhat: {
            chainId: 1337,
            allowUnlimitedContractSize: false,
            mining: {
                auto: true,
                interval: 0,
            },
        },
    },


    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    viaIR: true,
                    optimizer: {
                        enabled: true,
                        runs: 4_294_967_295,
                    },
                    outputSelection: {
                        "*": {
                            "*": ["evm.assembly", "irOptimized"],
                        },
                    },
                },
            },
        ]
    },
    paths: {
        sources: "./contracts",
        tests: "./hardhat-test",
        cache: "./cache",
        artifacts: "./artifacts",
    },

    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    },

    gasReporter: {
        currency: "ETH",
        gasPrice: 1000000,
        excludeContracts: ["*.t.sol"],
    },
    mocha: {
        timeout: 2200000,
        jobs: os.cpus().length / 2 > 1 ? os.cpus().length / 2 : 1,
    }

};

export default config;