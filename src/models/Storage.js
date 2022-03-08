const AwsSdk = require("./AwsSdk");
const aws = require("aws-sdk");
const {
  DEFAULT_AVATAR,
  DEFAULT_SPECIAL_ANNOUNCEMENT,
} = require("../constants/defaultImages");
class Storage extends AwsSdk {
  constructor(file) {
    super();
    this.s3 = new aws.S3({
      accessKeyId: this.AWS_KEY,
      secretAccessKey: this.AWS_SECRET_KEY,
    });

    this.file = file;
  }

  upload(bucketName, fileName, file) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    };

    // Uploading files to the bucket
    this.s3.upload(params, (err, data) => {
      if (err) throw err;
      return data.Location;
    });
  }

  async uploadAvatar() {
    if (!this.file) return DEFAULT_AVATAR;

    const params = {
      Bucket: "links-container/user-avatar",
      Key: this.getFileName(),
      Body: this.file.buffer,
    };
    const { Location } = await this.s3.upload(params).promise();

    return Location;
  }

  async uploadSpecialAnnouncementImage() {
    //
    if (!this.file) return DEFAULT_SPECIAL_ANNOUNCEMENT;

    const params = {
      Bucket: "links-container/user-avatar",
      Key: this.getFileName(),
      Body: this.file.buffer,
    };

    const { Location } = await this.s3.upload(params).promise();

    return Location;
  }

  getFileName() {
    const fileType = this.file.originalname.split(".").slice(-1)[0];
    return `${Date.now()}.${fileType}`;
  }
}

module.exports = Storage;
