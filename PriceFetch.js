const ethers = require("ethers");
const {
  factoryAddress,
  routerAddress,
  fromAddress,
  toAddress,
} = require("./AddressList");
const {
  erc20,
  factoryABI,
  pairABI,
  routerABI,
  erc20ABI,
} = require("./AbiInfo");

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.binance.org/"
);

const factoryInstance = new ethers.Contract(
  factoryAddress,
  factoryABI,
  provider
);

const routerInstance = new ethers.Contract(routerAddress, routerABI, provider);

const priceFetch = async (amount) => {
  //get contract
  const token1 = new ethers.Contract(fromAddress, erc20ABI, provider);
  const token2 = new ethers.Contract(toAddress, erc20ABI, provider);

  // find decimal
  const decimal1 = await token1.decimals();
  const decimal2 = await token2.decimals();

  // Now we check
  const amountIn = ethers.utils.parseUnits(amount, decimal1).toString();
  const amountOut = await routerInstance.getAmountsOut(amountIn, [
    fromAddress,
    toAddress,
  ]);

  // convert it in human output
  const humanOutput = ethers.utils.formatUnits(
    amountOut[1].toString(),
    decimal2
  );
  console.log("This the number of WBNB: ", humanOutput);
};
humanFormat = "100";
priceFetch(humanFormat);
