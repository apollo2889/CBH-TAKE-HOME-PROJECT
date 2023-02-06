const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal hash for any object which doesn't have partitionKey proprety as input", () => {
    const trivialKey = deterministicPartitionKey({test: '1234'});
    let hash = crypto.createHash("sha3-512").update('{"test":"1234"}').digest("hex");
    expect(trivialKey).toBe(hash);
  });
  it("Returns the literal '1234' when given partitionKey as 1234 in input", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "1234" });
    expect(trivialKey).toBe("1234");
  });
});
