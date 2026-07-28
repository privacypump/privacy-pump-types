export type Hex32 = string;
export type U64String = string;

export type ProposalAction =
  | "transfer_sol"
  | "protected_withdrawal"
  | "update_settings"
  | "signer_set_change";

export type ProposalEnvelopeV1 = {
  schemaVersion: 1;
  vault: string;
  proposalIndex: U64String;
  action: ProposalAction;
  payloadHash: Hex32;
};

export type AuthorizationReceiptV1 = {
  schemaVersion: 1;
  vault: string;
  proposal: string;
  signerRoot: Hex32;
  signerSetVersion: number;
  actionDomain: number;
  nullifierHash: Hex32;
  payloadHash: Hex32;
  status: "created" | "pending" | "verified" | "failed" | "consumed";
};

export function isHex32(value: string): value is Hex32 {
  return /^[0-9a-f]{64}$/.test(value);
}

export function assertProposalEnvelope(value: ProposalEnvelopeV1): void {
  if (value.schemaVersion !== 1)
    throw new Error("unsupported proposal schema version");
  if (!/^(0|[1-9][0-9]*)$/.test(value.proposalIndex))
    throw new Error("invalid proposal index");
  if (!isHex32(value.payloadHash)) throw new Error("invalid payload hash");
}
