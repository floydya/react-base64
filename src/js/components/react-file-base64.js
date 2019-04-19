/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React from 'react';

export default class FileBase64 extends React.Component {
  handleChange(e) {
    const { multiple, onDone } = this.props;

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          if (multiple) onDone(allFiles);
          else onDone(allFiles[0]);
        }

      } // reader.onload

    } // for

  }

  getProps(props) {
    let p = {};
    Object.keys(props).forEach(key => {
      if(key !== 'onDone') {
        Object.assign(p, {[key]: props[key]})
      }
    })
    return p;
  }

  render() {
    const { multiple, className } = this.props;
    return (
      <input
        type="file"
        onChange={this.handleChange.bind(this)}
        multiple={multiple}
        className={className}
        // Accept addational props e.g. style 
        {...this.getProps(this.props)}
      />
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
};
