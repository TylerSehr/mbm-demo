class ChangePool{
    constructor(){
        this.changes = [];
    }

    static createChange(file, name, job){
        ChangePool.submitNewChange(new Change(file, name), job)
    }

    static submitNewChange(change, job){
        const doesChangeAlreadyExist = ChangePool.findChange(change, job)
        if (doesChangeAlreadyExist !== -1) {
            console.log('you\'ve already submitted a change');
            ChangePool.updateChange(change, job)
        }
        else{
            job.currentRound.changePool.changes.push(change)
        }
    }

    static updateChange(updatedChange, job){
        job.currentRound.changePool.changes[ job.currentRound.changePool.changes.findIndex(change=>change.name === updatedChange.name) ] = updatedChange;
    }
  
    static findChange(changeToSearch, job){ //search is a change object
        // console.log(job.currentRound.changePool.changes.findIndex(change=>change.name===changeToSearch.name));
        return job.currentRound.changePool.changes.findIndex(change=>change.name===changeToSearch.name);
    }

}

class Change{
    constructor(file, name){
        this.timestamp = Date.now();
        this.file = file;
        this.name = name;
    }
}

class VotePool{
    constructor(){
        this.votes = []
    }

    static createVote(name, change, job){
        VotePool.submitNewVote(new Vote(name, change), job)
    }

    static submitNewVote(vote, job){
        const doesVoteAlreadyExist = VotePool.findVote(vote, job)
        if (doesVoteAlreadyExist !== -1) {
            console.log('you\'ve already submitted a vote');
            VotePool.updateVote(vote, job)
        }
        else{
            job.currentRound.votePool.votes.push(vote)
        }
    }

    static updateVote(updatedVote, job){
        job.currentRound.votePool.votes[job.currentRound.votePool.votes.indexOf(updatedVote.name)] = updatedVote;
    }

    static findVote(voteToSearch, job){ //search is a change object
        return job.currentRound.votePool.votes.indexOf(voteToSearch.name);
    }
}

class Vote{
    constructor(name, change){
        this.name = name
        this.change = change.name;
    }
}

module.exports =  {ChangePool, Change, VotePool, Vote}