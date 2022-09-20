const wdio = require('webdriverio');

const assert = require('assert');

const find = require('appium-flutter-finder');




const osSpecificOps = process.env.APPIUM_OS === 'android' ? {

    platformName: 'Android',

    deviceName: 'emulator-5554',

    app: __dirname + 'build/app/outputs/flutter-apk/app-debug.apk',

} : process.env.APPIUM_OS === 'ios' ? {

    platformName: 'iOS',

    platformVersion: '12.2',

    deviceName: 'iPhone X',

    noReset: true,

    app: __dirname + '/../ios/Runner.zip',




} : {};




const opts = {

    port: 4723,

    capabilities: {

        ...osSpecificOps,

        automationName: 'Flutter'

    }

};




(async () => {

    console.log('Initial app testing')

    const driver = await wdio.remote(opts);

    assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');

    await driver.execute('flutter:clearTimeline');

    await driver.execute('flutter:forceGC');




    //Enter login page

    await driver.execute('flutter:waitFor', find.byValueKey('loginBtn'));

    await driver.elementSendKeys(find.byValueKey('emailTxt'), 'xyz@gmail.com')

    await driver.elementSendKeys(find.byValueKey('passwordTxt'), '123456')

    await driver.elementClick(find.byValueKey('loginBtn'));




    //Enter home page

    await driver.execute('flutter:waitFor', find.byValueKey('homeGreetinglabel'));

    assert.strictEqual(await driver.getElementText(find.byValueKey('homeGreetinglabel')), 'Welcome to Home Page');




    //Enter Page1

    await driver.elementClick(find.byValueKey('page1Btn'));

    await driver.execute('flutter:waitFor', find.byValueKey('page1GreetingLabel'));

    assert.strictEqual(await driver.getElementText(find.byValueKey('page1Greetinglabel')), 'Page1');

    await driver.elementClick(find.byValueKey('page1BackBtn'));




    //Enter Page2

    await driver.elementClick(find.byValueKey('page2Btn'));

    await driver.execute('flutter:waitFor', find.byValueKey('page2GreetingaLbel'));

    assert.strictEqual(await driver.getElementText(find.byValueKey('page2GreetingLabel')), 'Page2');

    await driver.switchContext('NATIVE_APP');

    await driver.back();

    await driver.switchContext('FLUTTER');




    //Logout application

    await driver.elementClick(find.byValueKey('logoutBtn'));

    driver.deleteSession();

})();
