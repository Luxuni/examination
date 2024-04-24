class Snowflake {
  epoch: number;
  workerIdBits: number;
  sequenceBits: number;
  workerIdShift: number;
  timestampLeftShift: number;
  sequenceMask: number;
  lastTimestamp: number;
  workerId: number;
  sequence: number;

  constructor(workerId = 1, sequence = 0) {
    this.epoch = 1577836800000; // 自定义起始时间戳，例如2020-01-01
    this.workerIdBits = 5; // 工作机器ID位数
    this.sequenceBits = 12; // 序列号位数
    this.workerIdShift = this.sequenceBits; // 工作机器ID左移位数
    this.timestampLeftShift = this.workerIdBits + this.sequenceBits; // 时间戳左移位数
    this.sequenceMask = -1 ^ (-1 << this.sequenceBits); // 序列号掩码
    this.lastTimestamp = -1; // 上次生成ID的时间戳
    this.workerId = workerId;
    this.sequence = sequence;
  }

  nextId() {
    let timestamp = Date.now();
    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & this.sequenceMask;
      if (this.sequence === 0) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = Date.now();
        }
      }
    } else {
      this.sequence = 0;
    }
    this.lastTimestamp = timestamp;
    const shiftedTimestamp =
      (timestamp - this.epoch) << this.timestampLeftShift;
    const shiftedWorkerId = this.workerId << this.workerIdShift;
    return (shiftedTimestamp | shiftedWorkerId | this.sequence) >>> 0; // 使用无符号右移确保结果为正数
  }
}

export default Snowflake;
