const crypto = require ('crypto');
const IV_SIZE = 16;

module.exports.AES = {
    encode(plainText, keyString){
        try{
            let iv = crypto.randomBytes(IV_SIZE);
            let cipher = crypto.createCipheriv('aes-256-cbc', keyString, iv);
            let encrypted = cipher.update(plainText);

            encrypted = Buffer.concat([encrypted, cipher.final()]);

            return iv.toString('hex') + ':' + encrypted.toString('hex');
        }catch(e){
            return new Error(e).message;
        }
    },

    decode(combinedString, keyString){
        try {
            let textParts = combinedString.split(':');
            let iv = Buffer.from(textParts[0], 'hex');
            let encryptedText = Buffer.from(textParts[1], 'hex');
            let decipher = crypto.createDecipheriv('aes-256-cbc', keyString, iv);

            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            
            return decrypted.toString();
        } catch (e) {
            return new Error(e).message;
        }
    }
}