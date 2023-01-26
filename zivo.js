const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const Discord = require("discord.js")
const fetch = require('node-fetch');
const app = express();
const client = new Discord.Client();
const prefix = '+' //PREFİXİNİZİ GİRİNİZ.

client.on("ready", async () => {
client.user.setActivity(`+yardım`, { type: "PLAYING" });
  console.log("`");
});

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const De = Linkler.map(Revenge => Revenge.url)
De.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.MessageEmbed()
    .setColor("#3498db")
    .setDescription(`
    
   ❌ **Proje Sistemimizde Zaten Bulunuyor ** 

    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const success = new Discord.MessageEmbed()
    .setColor('#3498db')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    
    **✅ Yazdığınız Proje Başarıyla Uptime Sistemimize Eklendi.**
    `)
    .addField('```+linkler```','Komutunu Kullanarak Ekledigin Linkleri Görebilirsin!')//
    .setTimestamp()
    message.channel.send(success)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const dijitaluptime = new Discord.MessageEmbed()
  .setColor("#3498db")
  .setDescription(`

  **❌ Hey Uptime Edeceğim URL Girmelisin! **

> +ekle (Glitch Live Linki)
  `)
.setImage("https://media.discordapp.net/attachments/1020759447771025511/1039284641846263838/1667855123262.png")
  .setThumbnail(message.author.avatarURL)
  message.channel.send(dijitaluptime)
  })
  }



  if(Split[0] == prefix+'say') {
  const say = new Discord.MessageEmbed()
  .setColor("#3498db")
  .setThumbnail(message.author.avatarURL)
  .setDescription(`
  
<a:YklenmeGif:1039285627897774081> ** Şuanda  \`${db.get('Proje')}\` URL'yi 7/24 Aktif Tutuyor. **

<a:YklenmeGif:1039285627897774081> **  Bu Linklerden Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tane Senin URl'ni Uptime ediyor!**
`)
  message.channel.send(say)
  }

  if(Split[0] == prefix+'yardım') {
  const pxd = new Discord.MessageEmbed()
  .setColor("#3498db")
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setImage("https://media.discordapp.net/attachments/1020759447771025511/1039284641846263838/1667855123262.png")
  .setDescription(`


`)
  .addField('** Uptime **',`
- **+ekle (glitch live linki)** = Botunuzu 7/24 Aktif Tutar.
- **+linkler** = 7/24 Tuttuğum linklerini gösterir.
- **+say** = Tüm Uptime edilmiş bot sayısını gösterir.
`)
  .addField('----------------------------------------------------',`
[Destek Sunucusu](https://discord.gg/8yH2PqChTX)`)
  message.channel.send(pxd)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setColor("#4f5574").setDescription(`\❌ **Hiç link eklememişsin. Üzdün Beni Dostum Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.MessageEmbed().setColor("#3498db").setDescription(`- **7/24 Aktfi Tuttuğum botlarınızın linklerini daha güvenli olduğunda DM üzerinden gönderdim ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.MessageEmbed().setColor("#3498db").setImage("https://media.discordapp.net/attachments/1020759447771025511/1039284641846263838/1667855123262.png").setDescription(`- ** Uptime Ettigin Linklerin:** \n\n\``+Linkleri.join('\n')+`\`

 [Destek Sunucusu](https://discord.gg/8yH2PqChTX)`).setThumbnail(message.author.avatarURL))
    }


   //ZivoCode
})




client.on('ready', () => {
client.user.setActivity(`+ekle (Live Link)`, { type: 'PLAYING' })
client.user.setStatus('dnd')
  
  //client.user.setStatus('online') -> çevrimiçi -> 
  //client.user.setStatus('dnd') -> rahatsız etmeyin -> 
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["483273124511744007"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}

client.on('message', message => {
  const zivoreklamliste = ['.glitch.me/','.glitch.me','.repl.co','.repl.co/']
  if(zivoreklamliste.some(zivo => message.content.includes(zivo))){
    // Link Atarsa Mesajı Silelim
    message.delete()

    // Uyaralım
    const keslan = new Discord.MessageEmbed()
    .setDescription(`- **Projeniz 3 4 dakika içinde eklenicektir :) ${message.author}**
Lütfen spam ATMAYINIZ`  )
    .setColor("#3498db")
    message.channel.send(keslan) .then(msg => msg.delete({ timeout: 9000}));
  }
})

//tokenininizi giriniz.
client.login(process.env.token);




//ZivoCode 









///yepisssyeni





client.on("message", async msg => {
  
const prefix = "+"
msg.channel.messages.fetch({limit: 30})
const dcskelime = [client.user.id, client.user.username, "<@"+client.user.id+">"]; 
if (dcskelime.some(dcss => msg.content.includes(dcss))) {
msg.reply("Prefixim: "+prefix) 
}})  

client.on("message", async message => {
  if (message.author.id === client.user.id) return;
  if (message.guild) return;
  client.channels.cache.get("1039275830339174440").send(
    new Discord.MessageEmbed()
      .setTitle("Yeni Talep")
      .setFooter("DM TALEP SİSTEMİ")
      .setDescription(`**Talep Gönderen:\n\n\`${message.author.tag}\`  |  \`${message.author.id}\`**`)
      .setTimestamp()
      .setThumbnail(client.user.avatarURL)
      .addField("Gelen Talep Mesajı", message.content)
      .setColor("#3498db")
  );
  message.author.send("");
});
