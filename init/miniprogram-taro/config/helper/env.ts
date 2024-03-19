import * as path from 'path'
import * as dotenv from 'dotenv'

const cwd = process.cwd()

const envConfig = (paths = "./") => ({
  ...dotenv.config({
    path: path.resolve(cwd, paths, './.env'), // 配置文件路径
    encoding: 'utf8', // 编码方式，默认utf8
  }).parsed,
  ...dotenv.config({
    path: path.resolve(cwd, paths, `./.env.${process.env.ENV ?? 'dev'}`), // 配置文件路径
    encoding: 'utf8', // 编码方式，默认utf8
  }).parsed,
})

export default envConfig
