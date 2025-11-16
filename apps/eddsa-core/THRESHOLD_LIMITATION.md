# Threshold Signature Configuration

## Threshold Adjustment: Passing `t-1` to Rust

The JavaScript wrapper automatically adjusts the threshold value when calling Rust functions to provide a more intuitive API.

### How It Works

- **User passes threshold `t`** (must be >= 2)
- **JavaScript passes `t-1` to Rust** internally
- **Result**: Threshold `t` works with exactly `t` signers

### Why This Adjustment?

The underlying Rust library requires `signingParties.length > threshold`. By passing `t-1` to Rust:
- User's threshold `t=2` → Rust receives `1` → Works with 2 signers (2 > 1) ✓
- User's threshold `t=3` → Rust receives `2` → Works with 3 signers (3 > 2) ✓
- User's threshold `t=5` → Rust receives `4` → Works with 5 signers (5 > 4) ✓

### Requirements

1. **Threshold must be >= 2**
   - This is enforced in all classes (`MPCClient`, `CoordinatorService`, `exampleDistributed`)
   - Reason: We pass `t-1` to Rust, and `t-1` must be >= 1

2. **Number of signers must be >= threshold**
   - For threshold `t`, you need at least `t` signers
   - This is validated in `exampleDistributed` and `CoordinatorService.startSigning()`

### Examples

```javascript
// ✅ Valid: threshold=2, 2 signers
await exampleDistributed(2, 4, ['party-0', 'party-1']);

// ✅ Valid: threshold=3, 3 signers
await exampleDistributed(3, 5, ['party-0', 'party-1', 'party-2']);

// ✅ Valid: threshold=2, 3 signers (more than minimum)
await exampleDistributed(2, 4, ['party-0', 'party-1', 'party-2']);

// ❌ Invalid: threshold=1 (must be >= 2)
await exampleDistributed(1, 3, ['party-0', 'party-1']);
// Error: Threshold must be at least 2. Got 1.

// ❌ Invalid: threshold=2, only 1 signer
await exampleDistributed(2, 4, ['party-0']);
// Error: Need at least 2 signing parties for threshold=2, got 1
```

### Implementation Details

The threshold adjustment happens in `MPCClient._adjustThresholdForRust()`:
- Validates that `userThreshold >= 2`
- Returns `userThreshold - 1` for Rust calls
- Used in:
  - `distributeShares()` - Key generation VSS
  - `constructKeypair()` - Key generation construction
  - `distributeEphemeralShares()` - Ephemeral key VSS
  - `constructEphemeralKeypair()` - Ephemeral key construction

### Benefits

1. **Intuitive API**: Users think "threshold=2 means 2 signers needed" - and it works!
2. **Predictable Behavior**: No confusion about needing `t+1` signers
3. **Clear Validation**: Errors are explicit about requirements
