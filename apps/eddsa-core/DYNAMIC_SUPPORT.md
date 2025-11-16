# Dynamic (t, n) Threshold Signature Support

## Overview

The MPC library and classes are **fully dynamic** and support **any (t, n) threshold configuration** where:
- `t` (threshold) = minimum number of parties needed to sign (must be ≥ 1)
- `n` (total parties) = total number of parties in the key generation (must be ≥ t)

## Core Classes Are Fully Dynamic

### MPCClient
- **No hardcoded party counts** - all methods accept `threshold` and `shareCount` as parameters
- Works with any number of parties
- Methods are stateless and accept all necessary data as parameters

### MPCService
- **No hardcoded party counts** - works with any party ID
- Party index is generated deterministically from party ID using SHA-256 hash
- Supports any number of services

### CoordinatorService
- **No hardcoded party counts** - dynamically manages any number of parties
- Party indices are assigned based on sorted party IDs for consistent ordering
- Supports any (t, n) configuration

## Example Usage

```javascript
// Example 1: (2, 4) threshold - 4 parties, need 3 to sign
await exampleDistributed(2, 4, ['party-0', 'party-1', 'party-2']);

// Example 2: (5, 20) threshold - 20 parties, need 6 to sign
await exampleDistributed(5, 20, ['party-0', 'party-1', 'party-2', 'party-3', 'party-4', 'party-5']);

// Example 3: (1, 10) threshold - 10 parties, need 2 to sign
await exampleDistributed(1, 10, ['party-0', 'party-1']);
```

## Party ID Format

Party IDs can be any string. The example uses `party-0`, `party-1`, etc., but you can use any naming scheme:
- `alice`, `bob`, `charlie`
- `server-1`, `server-2`, `server-3`
- `node-0x1234`, `node-0x5678`

The party index (used internally) is generated deterministically from the party ID using SHA-256, ensuring consistency across sessions.

## Limitations

1. **Signing Requirement**: For threshold `t`, you need at least `t+1` signers (see `THRESHOLD_LIMITATION.md`)
2. **Party Index Range**: Party indices are generated as `u16` values (0-65535), which is sufficient for most use cases
3. **Rust Library**: The underlying Rust library supports any (t, n) configuration as long as `t < n` and signing uses at least `t+1` parties

## Testing

The library has been tested with:
- (2, 3) - 3 parties, 3 signers ✅
- (2, 4) - 4 parties, 3 signers ✅
- (2, 5) - 5 parties, 3 signers ✅
- (3, 10) - 10 parties, 4 signers ✅
- (5, 20) - 20 parties, 6 signers ✅

All configurations work correctly with no hardcoded limits.

