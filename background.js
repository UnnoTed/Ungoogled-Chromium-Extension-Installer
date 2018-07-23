chrome.contextMenus.create({
  "title": "Install extension",
  "documentUrlPatterns": ["https://chrome.google.com/webstore/detail/*"],
  "onclick": function installExtension() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const result = confirm("Do you really want to install this extension?");

      if (result) {
        const version = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
        let extension_id = tabs[0].url.split("/")[6];

        // removes query
        const q = extension_id.indexOf("?");
        if (q !== -1) {
          extension_id = extension_id.substr(0, q);
        }

        const url = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${version}&x=id%3D${extension_id}%26installsource%3Dondemand%26uc`;
        window.open(url, "_blank");
      }
    });
  }
});
