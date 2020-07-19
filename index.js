//const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });

require("dotenv").config()
const token = process.env.BOT_TOKEN;
const Discord = require("discord.js")

const bot = new Discord.Client();


var users = lecturaTXT();

bot.on('ready', () =>{
    console.log('Esta online perros!');
})

bot.on('message', msg=>{
    if(msg.content.includes("!")){
        if(msg.content === "!dale"){ //Esto lo quitaria o hauria algo diferente
            msg.reply('No digas pito');     
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 100000 });        
            coll.on('collect',msg =>{
                if(msg.content === "pito"){
                    msg.channel.send('Marrano');
                }
            })
        }else if(msg.content === '!bar'){ //Retocar el tema de productos sea un diccionario o un objeto que te devuelva la foto
            var productos = ["Coca-cola","Coca-cola light","Coca-cola Zero","Fanta Naranja", "Fanta Limon","Sprite","Schweppes","Estrella Damm","Voll Damm"];
            msg.reply("Que quieres guapetón?");      
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 5000 });
            coll.on('collect',msg =>{
                switch(msg.content){ //Quizas un switch sea tope semado, pero algo es algo bro, quizas no lo parece, pero le estoy metiendo ganas a intentar que este trasto funcione
                    case productos[0]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/Cocacola.png"]});
                        break;
                    case productos[1]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/Cocalight.jpg"]});
                        break;
                    case productos[2]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/cocacola-zero.png"]});
                        break;
                    case productos[3]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/Fanta-naranja.png"]});
                        break;
                    case productos[4]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/fanta-limon.jpg"]});
                        break;
                    case productos[5]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/sprite.png"]});
                        break;
                    case productos[6]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/schweppes.png"]});
                        break;
                    case productos[7]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/estrella-damm.png"]});
                        break;
                    case productos[8]:
                        msg.channel.send("Aquí tienes: ",{files: ["Bebidas/voll-damm.png"]});
                        break;
                    default:
                        msg.reply("De eso no tenemos precioso.");
                        break;
                }
                
                var bebida = String(msg.content);
                var user = String(msg.author.username);
                if(user in users){
                    var user_dict = users[user];
                    if(bebida in users[user]){
                        user_dict[bebida] += 1;
                    }else{
                        user_dict[bebida] = 1;
                    }
                }else{
                    users[user] = {};
                    var user_dict = users[user];
                    user_dict[bebida] = 1;
                }
                
                escrituraArchivo(user,users[user][bebida],msg);
            });
            
        }else if(msg.content === "!help"){ //Ir actualizando WIP
            msg.member.send("Esto són los comandos actuales: \n!dale \n!bar \n!foto \n!carta \n!gif \n!mememan ");
        }else if(msg.content === "!foto"){ //Ahora sabemos que puede tener links de fotos y ya sirve, si se borra la foto de internet, se tendra que cambiar
            var fotos = ["roger.jpg","alex.jpg","mario.jpg","ferranpelo.jpeg","lamapada.jpeg","polpene.jpeg","polangel.jpeg", "NilCalbo.jpeg","arnau-fumao.jpg"];
            msg.channel.send("Aquí tienes tu foto: \n", {files: ["Fotos/"+fotos[(Math.random() * (fotos.length)) << 0]]}); //Para imagenes se tiene que poner el [], sino peta, si quieres ponerlas, ponlas en la carpeta fotos, asi mas facil de acceder ;)
        }else if(msg.content === "!gif"){
            var gifs = ["notfunny.gif","joseph.gif"]
            msg.channel.send("Aquí tienes tu gif: \n",{files: ["Gifs/"+gifs[(Math.random() * (gifs.length)) << 0]]} )
        }else if(msg.content === "!carta"){msg.channel.send("Esto es lo que tenemos: Coca-cola, Coca-cola light, Coca-cola Zero, Fanta Naranja, Fanta Limon, Sprite, Schweppes, Estrella Damm y Voll Damm.");}
        else if(msg.content === "!mememan"){
            const folder = 'Mememan';
            const fs = require('fs');
            var memes = [];
            fs.readdirSync(folder).forEach(file => {
                memes.push(file);
            });
            msg.channel.send("Que meme quieres? (envia !cuales para saber que memes hay o envia !random para enviar uno aleatorio)");
            const coll = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
            coll.on('collect',msg =>{
                if(memes.includes(msg.content)){msg.channel.send({files: ["Mememan/"+msg.content]});}
                else if(msg.content === "!cuales"){msg.member.send(memes);
                    msg.member.send("Copia el meme que quieras enviar al servidor");}
                else if(msg.content === "!random"){msg.channel.send({files: ["Mememan/"+memes[(Math.random()*memes.length) << 0]]});}
                else{msg.channel.send("Ese meme no lo tenemos, lo siento");}
            });
        }else if(msg.author.bot){ return;} //Evita que el bot se responda a si mismo con leer un solo !
        else if(msg.mentions){return;}
        else{msg.reply("lo siento, no es un comando válido, gilipollas");}
    }
})

function escrituraArchivo(user,numero,msg){
    var fs = require("fs");
    try{
        if(fs.existsSync("Users/"+user+".txt")){var file = fs.readFileSync("Users/"+user+".txt", "utf8");
        }else{
            console.log("Nuevo usuario usando el bar");
        }
    }catch(err){console.log(err)}
    fs.writeFile("Users/"+user+".txt", msg.content + ":" + numero, function (err){
        if(err) return console.log(err);
    });
    //Por el momento, la escritura de archivo no esta 100% bien hecha, pero la idea es guardar cada usuario en un archivo diferente, y que cada vez que pida
    //el archivo se actualize con lo que ha pedido
}
function lecturaTXT(){
    const fs = require('fs');
    var users = {};

    fs.readdirSync("Users/").forEach(file => {
        
        var actualFile = fs.readFileSync("Users/"+file,{encoding : 'utf8', flag: 'r'});
        var data = actualFile.split("\r\n");
        var arrayData = [];
        data.forEach(element => {
            var secondData = element.split(":");
            arrayData.push(secondData);
        });
        var user = file.split(".");
        if(!(user[0] in users)){users[user[0]] = {};}
        //console.log(users);
        arrayData.forEach(key =>{
            //console.log(key);
            users[user[0]][key[0]] = parseInt(key[1],'10');
            //console.log(users);
        });
    });



    return users;
}
bot.login(token);