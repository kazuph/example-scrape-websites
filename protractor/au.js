var fs = require('fs');

var lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

var outFilePath = [
  'au-', lastMonth.getFullYear(), '-', (lastMonth.getMonth() + 101).toString().substr(-2), '.tsv'
].join('');

function $x (xpath) {
  return element(by.xpath(xpath));
}

var content;

describe('au', function () {
  browser.ignoreSynchronization = true;
  browser.get('https://cs.kddi.com/support/d_login.html?page_id=tsuuwatsuushin');

  it('ログイン画面へ移動', function () {
    $('#btn_auIDLogin').click();
  });

  it('ログイン', function () {
    $('input[name="loginAliasId"]').sendKeys(browser.params.au.id);
    $('input[name="loginAuonePwd"]').sendKeys(browser.params.au.password);
    $('#btn_login').click();
  });

  it('LTE通信量合計を取得する', function () {
    function readInformationIfAny() {
      browser.getCurrentUrl().then(function (url) {
        var amount = $x('//*[@id="innerBox"]/div[6]/div[2]/div[2]');

        amount.getText().then(console.log);
        amount.getText().then(function (a) {
          content = a
        });
      });
    }
    readInformationIfAny();
  });

  it('ファイルに書き出す', function () {
    fs.writeFileSync(outFilePath, content);
    console.log('wrote: ' + outFilePath);
  });
});
