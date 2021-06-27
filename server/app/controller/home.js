'use strict';

const fse = require('fs-extra');
const path = require('path');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async check() {
    const { ext, hash } = this.ctx.request.body;
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    console.log(filePath);
    let uploaded = false;
    let uploadedList = [];
    if (fse.readFileSync(filePath)) {
      uploaded = true;
    } else {
      uploadedList = await this.getUploadedList(this.config.UPLOAD_DIR, hash);
    }
    this.ctx.body = {
      code: 0,
      uploaded,
      uploadedList,
    };
  }

  async getUploadedList(dirPath) {
    return fse.existsSync(dirPath)
      ? (await fse.readdir(dirPath)).filter(name => name[0] === '.')
      : [];
  }
}

module.exports = HomeController;
