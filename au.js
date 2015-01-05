function $x (xpath) {
  return element(by.xpath(xpath));
}

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
        var amount = element(by.xpath('//*[@id="innerBox"]/div[6]/div[2]/div[2]'));
        amount.getText().then(console.log);
      });
    }
    readInformationIfAny();
  });

});
