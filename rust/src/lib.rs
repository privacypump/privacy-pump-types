use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ProposalAction {
    TransferSol,
    ProtectedWithdrawal,
    UpdateSettings,
    SignerSetChange,
}

#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProposalEnvelopeV1 {
    pub schema_version: u8,
    pub vault: String,
    pub proposal_index: String,
    pub action: ProposalAction,
    pub payload_hash: String,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn preserves_explicit_version() {
        let value = ProposalEnvelopeV1 {
            schema_version: 1,
            vault: "ExampleVault".into(),
            proposal_index: "7".into(),
            action: ProposalAction::UpdateSettings,
            payload_hash: "00".repeat(32),
        };
        assert_eq!(value.schema_version, 1);
    }
}
