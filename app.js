require('dotenv').config();
const express=require('express');
const app=express();


const MailParser = require('mailparser').simpleParser;


// const clientRouter=require('./router/clientRouter')

// app.use("/client",clientRouter);

//======================================

const Imap = require('imap');
// const { MailParser } = require('mailparser');
const { inspect } = require('util');

// تكوين الخادم ومعلومات البريد الإلكتروني (باستخدام Gmail)
const imap = new Imap({
  user: 'abdullah68782325@gmail.com',
  password: 'vlym gxgh vqut hbme',
  host: 'imap.tinder.com',
  port: 993,
  tls: true, 
  tlsOptions: {
    rejectUnauthorized: false // تجاهل التحقق من صحة الشهادة
  }
  });

// ربط مع الخادم
imap.once('ready', () => {
  imap.openBox('INBOX', true, (err, box) => {
    if (err) throw err;

    imap.search(['UNSEEN'], (err, results) => {
      var counter=1;
      if (err) throw err;
      const fetch = imap.fetch(results, { bodies: '' });
      fetch.on('message', (msg) => {
        // console.log("messsage is : ",msg);
        msg.on('body', (stream) => {
          let buffer = '';
          stream.on('data', (chunk) => {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', () => { 

            console.log('Received message: ',counter);
            counter++;
            // يمكنك هنا إضافة المزيد من المنطق، مثل التحقق من محتوى الرسالة والتفاعل معها
            // MailParser(buffer, (err, parsed) => {
            //   if (err) {
            //       console.error('Error parsing email:', err);
            //       return;
            //   }
          
              // Display the parsed email object
              // console.log(parsed.textAsHtml); 
          });
        });
      });
    });
 
    // استمع للرسائل الواردة
    imap.on('mail', (numNewMsgs) => {
      console.log(`You've got ${numNewMsgs} new message(s)`);

      // قراءة الرسائل الجديدة ومعالجتها
      imap.search(['UNSEEN'], (err, results) => {
        var counter=1;
        if (err) throw err;
        const fetch = imap.fetch(results, { bodies: '' });
        fetch.on('message', (msg) => {
          // console.log("messsage is : ",msg);
          msg.on('body', (stream) => {
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', () => {

              console.log('Received message: ',counter);
              counter++;
              // يمكنك هنا إضافة المزيد من المنطق، مثل التحقق من محتوى الرسالة والتفاعل معها
            });
          });
        });
      });
    });

    console.log('Listening for new emails...');
  });
})
// });

// إعادة الاستماع لأخطاء الاتصال
imap.once('error', err => {
  console.error(err); 
});

// بدء الاتصال بالخادم
imap.connect();


//========================================
app.listen(process.env.PORT||3000,()=>{
    console.log(` server start and listen to port ${process.env.PORT}`); 
}) 

