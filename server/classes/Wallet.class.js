
import SHA256 from 'sha256'
import ChainUtil from '../chain-util'

const INITIAL_BALANCE = 500;

class Wallet{
    constructor(name){
        this.balance = INITIAL_BALANCE;
        this.publicKey = SHA256(name)
        this.keyPair = ChainUtil.genKeyPair();
        this.name = name
    }

    sign(dataHash){
        return this.keyPair.sign(dataHash)
    }
}

export default Wallet;