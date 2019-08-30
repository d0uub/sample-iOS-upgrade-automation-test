const webdriverio = require('webdriverio');
const plantuml = require('node-plantuml');
const fs = require('fs');
const sharp = require('sharp');
const looksSame = require('looks-Same');
const assert = require('chai').assert;


// const devices = ["iPhone XR", "iPhone 6s"]
const devices = ["iPhone X"]
const osVersions = ['11.4','12.1']
// const osVersions = ['11.4']
for (let device of devices) {
  for (let os of osVersions) {
    let iosOptions = {
      capabilities: {
        platformName: 'iOS',
        automationName: 'XCUITest',
        deviceName: device,
        platformVersion: os,
        noReset: true,
        fullReset: false,
        app: '/Users/roy/Desktop/juber.app'
      },
      host: 'localhost',
      port: 4723,
      logLevel: 'info'
    }

    describe(`${device} ${os}`, () => {
      let client;
      let uml = "test.puml";
      let imgCount = 0;
      let recorder;

      before(async () => {
        let d = new Date();
        fs.unlinkSync(uml);
        fs.appendFileSync(uml, "@startuml\n")
        fs.appendFileSync(uml, `title ${device} ${os} - ${d}\n`)
        imgCount = 0;
      })

      after(async () => {
        fs.appendFileSync(uml, "@enduml\n")
        var gen = plantuml.generate(uml, { format: 'png' })
        await gen.out.pipe(fs.createWriteStream(`${device}-${os}.png`));
        // fs.unlinkSync(uml);
      })

      beforeEach(async () => {
        client = await webdriverio.remote(iosOptions);
      });

      afterEach(async () => {
        await client.deleteSession();
      });

      it('Login', async () => {
        fs.appendFileSync(uml, `(*)`)
        await saveScreenshot();
        await (await client.$('~Login')).click();
        await (await client.$('~Connect with Phone number')).waitForEnabled();
        await saveScreenshot();
        await (await client.$('~LOG IN')).click();
        await (await client.$('~pickup')).waitForDisplayed();
        await saveScreenshot();
        await (await client.$('~pickup')).click();
        await (await client.$('~BOOK NOW')).waitForDisplayed();
        await saveScreenshot();
        await (await client.$('~BOOK NOW')).click();
        await (await client.$('~JAGUAR SILBER')).waitForDisplayed();
        await saveScreenshot();
      });

      it('Setting', async () => {
        fs.appendFileSync(uml, `3`)
        await (await client.$('~Login')).click();
        await (await client.$('~LOG IN')).waitForDisplayed();
        await (await client.$('~LOG IN')).click();
        await (await client.$('~15 avatar 1 circle 2')).waitForDisplayed();
        await (await client.$('~15 avatar 1 circle 2')).click();
        await (await client.$('~Dennis Warner')).waitForDisplayed();
        await saveScreenshot('-down->');
      })

      it('Sign Up', async () => {
        // await (await client.$('~First name')).setValue("Chan");
        fs.appendFileSync(uml, `1`)
        await (await client.$('~Signup')).click();
        await (await client.$('~SIGN UP')).waitForDisplayed();
        await saveScreenshot('-up->');
        await (await client.$('~SIGN UP')).click();
        await (await client.$('~NEXT')).waitForDisplayed();
        await saveScreenshot();
      });

      async function saveScreenshot(direction) {
        fileName = `${device}-${os}-${++imgCount}`
        await client.saveScreenshot(`${fileName}.png`);
        await sharp(`${fileName}.png`).resize({ height: 480 }).toFile(`${fileName}-resized.png`)
        fs.appendFileSync(uml, ` ${direction || "->"} "<img:${fileName}-resized.png>" as ${imgCount}\n`)
      }
    });
  }
}

