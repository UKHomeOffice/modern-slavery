'use strict';

module.exports = {
  // used as part of the regex in the isRecognised()
  getExtensionsString: (extensionsList) => {
    let extensionString;
    extensionsList.forEach(ext => {
      if (extensionString) {
        extensionString = `${extensionString}|${ext}`;
      } else {
        extensionString = ext;
      }
    });

    return extensionString;
  },

  isRecognised: (email, extensionString) => {
    const regex = `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(${extensionString})`;
    const result = Boolean(email.match(regex));
    return result;
  }
};
