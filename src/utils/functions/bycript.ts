import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function encrypt(plainText, encryptionSalt) : Promise<string>{
    
    const saltRounds = parseInt(encryptionSalt || process.env.SALT)
    const salt = await bcryptjs.genSalt(saltRounds);
    const result = await bcryptjs.hash(plainText, salt);

    return result;
}

export async function decrypt(plainText, hash) : Promise<boolean>{
    
    const result = await bcryptjs.compare(plainText, hash);

    return result ? true : false;

}