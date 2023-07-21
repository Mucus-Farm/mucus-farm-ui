import { MerkleTree } from "merkletreejs";
import { keccak256 } from "viem";

export const getBasisPointsMultiplier = (decimal: number | string) => {
  const decimalLength = decimal.toString().split('.')[1]?.length || 0

  return 10 ** (decimalLength > 1 ? decimalLength - 1 : 0)
}

export const computeMerkleRoot = () => {
  const addresses: `0x${string}`[] = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001",
    "0x0000000000000000000000000000000000000002",
    "0x0000000000000000000000000000000000000003",
  ];

  const leaves = addresses.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return merkleTree.getRoot().toString("hex");
}

export const computeMerkleProof = (address: `0x${string}`) => {
  const addresses: `0x${string}`[] = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001",
    "0x0000000000000000000000000000000000000002",
    "0x0000000000000000000000000000000000000003",
  ];

  const leaves = addresses.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return merkleTree.getProof(keccak256(address));
}

