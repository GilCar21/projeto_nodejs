"use strict";

var _tsyringe = require("tsyringe");
var _LocalStorageProvider = require("../StorageProvider/implementations/LocalStorageProvider");
var _S3StorageProvider = require("../StorageProvider/implementations/S3StorageProvider");
var _EtherealMailProvider = require("./implementations/EtherealMailProvider");
var _SESMailProvider = require("./implementations/SESMailProvider");
const mailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  ses: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
};
_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);
const diskStorage = {
  local: _LocalStorageProvider.LocalStorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};
_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.disk]);