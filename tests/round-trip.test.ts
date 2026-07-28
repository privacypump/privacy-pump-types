import assert from "node:assert/strict";
import { test } from "node:test";
import {
  assertProposalEnvelope,
  type ProposalEnvelopeV1,
} from "../typescript/index.ts";

test("proposal envelope round trips through JSON", () => {
  const value: ProposalEnvelopeV1 = {
    schemaVersion: 1,
    vault: "TestWalletA",
    proposalIndex: "7",
    action: "update_settings",
    payloadHash: "00".repeat(32),
  };
  const decoded = JSON.parse(JSON.stringify(value)) as ProposalEnvelopeV1;
  assertProposalEnvelope(decoded);
  assert.deepEqual(decoded, value);
});

test("proposal envelope rejects malformed hashes", () => {
  assert.throws(() =>
    assertProposalEnvelope({
      schemaVersion: 1,
      vault: "ExampleVault",
      proposalIndex: "0",
      action: "transfer_sol",
      payloadHash: "not-a-hash",
    }),
  );
});
