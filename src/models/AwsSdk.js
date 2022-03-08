class AwsSdk {
  constructor() {
    this.AWS_KEY = process.env.AWS_KEY;
    this.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
  }
}

module.exports = AwsSdk;
