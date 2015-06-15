'use strict';

// Documents service used to upload directly to s3
angular.module('core').service('Documents', ['$http', '$q',
  function ($http, $q) {

    return {
      sign: function (file_name, file_type) {
        return $http.get('/s3', {
            params: {file_name: file_name, file_type: file_type}
          }).success(function (response) {
            console.log('success', response);
          }).error(function (res) {
            console.log('fuck, error', res);
          });
      },
      upload: function (file, signed_request) {

        return $http.put(signed_request, file, {
          withCredentials: true,
          headers: {
            'x-amz-acl': 'public-read',
            'Content-Type': undefined
          },
        }).success(function (response) {
          return response;
        });
      },
      uploadToS3: function (file) {
        var self = this;
        return this.sign(file.name, file.type).then(function (res) {
          var data = res.data;
          return self.upload(file, data.signed_request);
        });
      }
    };
  }]);