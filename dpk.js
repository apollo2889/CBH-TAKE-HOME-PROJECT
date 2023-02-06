const crypto = require("crypto");
const sha3Hash = crypto.createHash("sha3-512");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  try {
    // Code refactoring: we can check event first since candidate should be TRIVIAL_PARTITION_KEY constant when event is undefined
    if (!event) return TRIVIAL_PARTITION_KEY;
    
    console.log('event', event);
    let candidate;
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      console.log('data', data)
      candidate = sha3Hash.update(data).digest("hex");
    }

    console.log('candidate', typeof candidate);
    console.log('candidate', candidate.length);
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = sha3Hash.update(candidate).digest("hex");
    }
    return candidate;
  } catch (error) {
    // Note: normal try catch
    throw error;
  }
};