#!/usr/bin/env node

const path = require('node:path')
const ci = require('miniprogram-ci')
const yargs = require('yargs')
const { formatBytes } = require('../build/helper/format')
const projectConfig = require('../project.config.json')

const setting = ({ privateKeyPath, appVersion, appDesc, robot }) => {
  console.table({ privateKeyPath, appVersion, appDesc, robot })
  const project = new ci.Project({
    projectPath: path.resolve(projectConfig.miniprogramRoot),
    privateKeyPath,
    appid: projectConfig.appid,
    type: projectConfig.compileType,
  })

  return {
    project,
    version: appVersion,
    desc: appDesc,
    robot,
    setting: {
      es6: false,
      minifyJS: false,
      minifyWXSS: false,
      minifyWXML: true,
      codeProtect: true,
    },
    onProgressUpdate() {},
  }
}

const run = (executor) => (argv) =>
  executor(setting(argv))
    .then(({ subPackageInfo }) => console.table(subPackageInfo.map((i) => ({ ...i, size: formatBytes(i.size) }))))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })

yargs
  .scriptName('weapp-ci')
  .usage('$0 <cmd> [args]')
  .command('upload', '上传小程序', {}, run(ci.upload))
  .command('preview', '预览小程序', {}, run(ci.preview))
  .option('private-key', { describe: '小程序私钥' })
  .option('private-key-path', { describe: '小程序私钥路径' })
  .option('app-version', {
    describe: '小程序上传版本号',
    default: `${projectConfig.projectname}.${projectConfig.env}`,
  })
  .option('app-desc', {
    describe: '小程序上传备注信息',
    default: `${projectConfig.projectname} on ${projectConfig.env}`,
  })
  .option('robot', { type: 'number', describe: '指定使用哪一个 ci 机器人，可选值：1 ~ 30', default: 1 })
  .check((argv) => {
    if (argv.privateKey || argv.privateKeyPath) return true
    throw new Error('缺失必要参数，至少填写其中一项: private-key, private-key-path')
  })
  .help('h').argv
