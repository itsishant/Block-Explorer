import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { HeaderComponent } from "./components/header";
import { Copy, CopyCheck } from "lucide-react";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";

const App = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [copy, setCopy] = useState(false);
  const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });

  const handleSubmit = async () => {
    const phrase = generateMnemonic();
    setMnemonic(phrase);

    const path = "m/44'/501'/0'/0'";
    const seed = await mnemonicToSeed(phrase);
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    const publicKey = bs58.encode(keypair.publicKey);
    const privateKey = bs58.encode(keypair.secretKey.slice(0, 32));
    setKeys({ publicKey, privateKey });
  };

  return (
    <div className="bg-black flex flex-col items-center min-h-screen">
      <div className="w-full fixed top-0 left-0 z-10">
        <HeaderComponent />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-20">
        <div className="w-full flex items-center gap-4 max-w-sm fixed top-48 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 py-3 px-4 rounded-md font-semibold text-black hover:bg-blue-400 transition"
          >
            Generate Key Pairs
          </button>
          <button
            onClick={() => {
              if (mnemonic) {
                navigator.clipboard.writeText(mnemonic);
                setCopy(true);
                setTimeout(() => setCopy(false), 2000);
              }
            }}
            className="hover:cursor-pointer"
          >
            {copy ? (
              <CopyCheck className="text-white" />
            ) : (
              <Copy className="text-white hover:text-neutral-300" />
            )}
          </button>
        </div>

        {mnemonic && (
          <div className="w-full max-w-2xl mt-32">
            <div className="grid grid-cols-4 gap-3">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-center"
                >
                  <div className="text-gray-400 text-xs mb-1">{index + 1}</div>
                  <div className="text-white font-medium">{word}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Public Key:</h3>
              <p className="text-green-400 break-all text-sm">
                {keys.publicKey}
              </p>

              <p>
                hel
              </p>
              <h3 className="text-white font-semibold mt-4 mb-2">
                Private Key:
              </h3>
              <p className="text-red-400 break-all text-sm">
                {keys.privateKey}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
