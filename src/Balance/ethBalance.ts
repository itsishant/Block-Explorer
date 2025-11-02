import dotenv from "dotenv";
dotenv.config();

const RPC_SERVER = process.env.RPC_SERVER as unknown as string;

const getEthBalance = async (address: string) => {

    const response = await fetch(RPC_SERVER, {
        method: "POST",
        body: JSON.stringify({
              jsonrpc: "2.0",
 method: "eth_getBalance",
      params: [address, "latest"],
        })
    });
    
    const data = await response.json();
    const balanceWei = BigInt(data.result || "0x0");
  const balanceEth = Number(balanceWei) / 1e18;
  return balanceEth;

}

export {
    getEthBalance
}
