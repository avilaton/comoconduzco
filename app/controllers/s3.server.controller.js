'use strict';

/**
 * Module dependencies.
 */
var aws = require('aws-sdk'),
  config = require('../../config/config');

/**
 * Sign upload to S3s
 */
exports.sign = function(req, res) {
  aws.config.update({
    accessKeyId: config.aws.clientID,
    secretAccessKey: config.aws.clientSecret
  });
  var s3 = new aws.S3();
  var s3_params = {
      Bucket: config.aws.documentsBucket,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
          console.log(err);
      }
      else{
          var return_data = {
              signed_request: data,
              url: 'https://'+config.aws.documentsBucket+'.s3.amazonaws.com/'+req.query.file_name
          };
          res.write(JSON.stringify(return_data));
          res.end();
      }
  });
};