/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-05-29 16:05:01
 * @description: 用于CD过程发apk附件给QA和开发人员
 */

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const util = require('util');
const config = require('./email-config');

const npmPackageName = process.env.npm_package_name || 'app';
const envName = process.argv.splice(2)[0] || '测试'; // 环境
console.log(npmPackageName, envName);
const mail_opts = {
  host: 'smtp.mxhichina.com',
  port: 465,
  auth: {
    user: 'developer@1ziton.com',
    pass: 'Aa147258'
  }
};

const transport = mailer.createTransport(smtpTransport(mail_opts));

/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(data, cb) {
  transport.sendMail(data, function(err, data) {
    if (err) {
      // 写为日志
      console.error(err);
      return;
    }
    if (typeof cb === 'function') {
      cb(data);
    }
  });
}

/**
 * 发送错误通知邮件
 * @param {String} who 接收人的邮件地址
 */
function sendErrorMail(message) {
  var from = util.format('%s <%s>', 'email-demo', mail_opts.auth.user);
  var to = config.reveiveEmail[1];
  var subject = '签到失败咯！！！';
  var html = '<p>错误原因：</p>' + '<p>' + message + '</p>';
  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
}

/**
 * 附件方式
 */
function sendAttachments() {
  var from = util.format('%s <%s>', `[Gitlab CI] ${npmPackageName} 自动打包`, mail_opts.auth.user);
  var reveiveEmails = config.reveiveEmail;
  var subject = `${npmPackageName}【${envName}】 构建打包成功！`;
  var html = `<p>CI构建成功，附件是 <strong>${npmPackageName}</strong> Android 安装包，环境为【${envName}】。</p>`;
  for (let to of reveiveEmails) {
    sendMail(
      {
        from: from,
        to: to,
        subject: subject,
        html: html,
        attachments: [
          {
            filename: `${npmPackageName}-${envName}.apk`,
            path: './android/app/build/outputs/apk/release/app-release.apk',
            contentType: 'application/vnd.android.package-archive'
          }
        ]
      },
      function(data) {
        console.log(`发送成功 ${to}`);
      }
    );
  }
}

sendAttachments();

module.exports = { sendErrorMail, sendAttachments };
