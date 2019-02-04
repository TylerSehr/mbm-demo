// import { ChangePool, VotePool } from './ChangePool.class'
// import { REWARD_ALLOCATION } from '../config'
// //import Transaction from './Transaction.class'
// import PreviewOfJob from './PreviewOfJob.class'

const { ChangePool, VotePool } = require('./ChangePool.class')
const PreviewOfJob = require('./PreviewOfJob.class')


class Job{
    constructor(params, projectName, owner){
        this.timestamp = Date.now();
        this.projectName = projectName; // this is the name of the project 
        this.owner = owner; // this is the name of the account that owns the project, perhaps full profile data including pfp
        this.params = params;
        this.roundNumber = 0;
        this.state = params.starterFile
        this.finishedRounds = [];
        this.currentRound = new Round(this.params, this.state);
        this.status = 'active';
        this.PreviewOfJob = '';
        //we must add some way of tracking peers on this job so we can websockets it.
        //maybe i should just do this on ethereum 
    }

    static createJob(projectName, owner, description, rewardPerRound, starterFile, name, paymentAmount, tags){
        const projectParams = new Params(description, rewardPerRound, starterFile, name, paymentAmount, tags);
        const newJob = new Job(projectParams, projectName, owner);
        newJob.PreviewOfJob = new PreviewOfJob(newJob)
        return newJob;
    }

    static beginNewRound(job){
        job.currentRound = new Round(job.params, job.state)
    }

    static finishRound(job){
        //here we will determine that the round is actually over and then we will push the changepool contents into a round object
        //and push that object to the rounds array as well as determine which change will become the subject of the next round
        Round.endRound(job)
        job.state = job.currentRound.winner.change.file
        job.finishedRounds.push(job.currentRound)
        job.roundNumber++
        job.PreviewOfJob.demo = job.state
        if (job.roundNumber < job.params.totalRounds) {
            Job.beginNewRound(job)
        }
        else if (job.roundNumber >= job.params.totalRounds) {
            Job.finishJob(job)
        }
    }

    static finishJob(job){
        console.log('the job finished!!!');
        job.status = 'complete'
        //figure out what the fuck to do here.
    }
}

class Round{
    constructor(params, previousWinner){
        this.id = '' //some signature or proof?
        this.startingFile = previousWinner;
        this.changePool = new ChangePool() //has ChangePool methods
        this.votePool = new VotePool()
        this.winner = null; //this.calculateWinner(this.changePool.changes) //ONLY CALCULATED WHEN WE FINISH THE ROUND!!!!
        this.rewardAmount = params.rewardPerRound
        this.payment = params.payment
        this.rewards = [] //ONLY CALCULATED WHEN WE FINISH THE ROUND
    }

    static endRound(job){
        Round.calculateWinner(job);
        //this.calculateRewards();
    }
    
    // verifyVotes(){
    //     let validVotes = []
    //     this.votePool.votes.forEach(vote=>{
    //         let isValid = 0;
    //         for (let i = 0; i < validVotes.length; i++) {
    //             if (vote.address === validVotes[i].address) {
    //                 isValid++
    //             }
    //         }
    //         if (isValid === 1) {
    //             validVotes.push(vote)
    //         }
    //     })
    //     this.votePool.votes = validVotes
    // }

    static calculateWinner(job){
        let winner = {
            change: '',
            votes: 0
        };
        //this.verifyVotes();
        
        job.currentRound.changePool.changes.forEach(change=>{
            let votes = 0;
            job.currentRound.votePool.votes.forEach(vote=>{
                if (change.name === vote.change) {
                    votes++
                }
            })
            if (votes > winner.votes) {
                winner = {
                    change,
                    votes
                }
            }
        })
        job.currentRound.winner = winner
    }

    // calculateRewards(){
    //     let rewards = []
    //     //here we divide the total reward amongst the people who contributed to the music
    //     rewards.push(Transaction.newTransaction(this.payment.wallet, this.winner.change.address, this.rewardAmount * REWARD_ALLOCATION.winningChange));

    //     let rewardPerVote = this.rewardAmount * REWARD_ALLOCATION.winningVotes / this.votePool.votes.length

    //     this.votePool.votes.forEach(vote=>{
    //         if (vote.change === this.winner.change.address) {
    //             rewards.push(Transaction.newTransaction(this.payment.wallet, vote.address, rewardPerVote))
    //             //here the blockchain pays? likely to change
    //         }
    //         rewards.push(Transaction.newTransaction(this.payment.wallet, vote.address, rewardPerVote))
    //     })

    //     let rewardPerChange = this.rewardAmount * REWARD_ALLOCATION.losingChanges / this.changePool.changes.length

    //     this.changePool.changes.forEach(change=>{
    //         rewards.push(Transaction.newTransaction(this.payment.wallet, change.address, rewardPerChange))
    //     })
    //     this.rewards = rewards;
    // }
}

class Payment{
    constructor(name, amount){
        this.name = name;
        this.amount = amount;
    }
}

class Params{
    constructor(description, rewardPerRound, starterFile, name, paymentAmount, tags){
        this.description = description; //string of musical style  
        this.payment = this.createPayment(name, paymentAmount);
        this.rewardPerRound = rewardPerRound
        this.totalRounds = this.calculateRounds();
        this.starterFile = starterFile;
        this.tags = tags; //array of tags
    }

    createPayment(name, paymentAmount){
        return new Payment(name, paymentAmount);
    }


    calculateRounds(){
        return Math.round(this.payment.amount/this.rewardPerRound);
    }
}



module.exports = Job;