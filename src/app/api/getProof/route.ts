import { NextResponse } from 'next/server'
import { encodePacked, keccak256 } from "viem"
import { MerkleTree } from "merkletreejs"

import addresses from "./addresses.json"

export const runtime = 'edge'

const generateMerkleTree = () => {
  const leaves = addresses.map((address) =>
    keccak256(encodePacked(["address"], [address as `0x${string}`]))
  );
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return tree;
};

// const tree = generateMerkleTree();
// const root = tree.getRoot().toString("hex");

// console.log("root: ", root);

// console.log(tree.verify(proof, leaf, root));

export async function POST(request: Request) {
  const { address } = await (request.json() as Promise<{ address: `0x${string}` }>)
  const tree = generateMerkleTree()
  const leaf = keccak256(encodePacked(["address"], [address]));
  const proof = tree.getHexProof(leaf);

  return NextResponse.json({ proof })
}
