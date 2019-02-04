const Job = require('./Job.class')
const { ChangePool, VotePool } = require('./ChangePool.class')

let testJob = Job.createJob('test-project', 'ed', 'this project is a test', 5, 'starterfile', 'my-username', 50, ['rock', 'not rock']);

console.log('');
console.log(testJob);


ChangePool.createChange('not starter file 1', 'user1', testJob)
ChangePool.createChange('not starter file 2', 'user2', testJob)
ChangePool.createChange('not starter file 3', 'user3', testJob)
ChangePool.createChange('not starter file 4', 'user4', testJob)
ChangePool.createChange('not starter file', 'user1', testJob)

console.log('');
console.log(testJob.currentRound)

let job = testJob.currentRound.changePool

VotePool.createVote('user1', job.changes[0], testJob)
VotePool.createVote('user2', job.changes[0], testJob)
VotePool.createVote('user3', job.changes[1], testJob)
VotePool.createVote('user4', job.changes[1], testJob)
VotePool.createVote('user5', job.changes[0], testJob)

console.log('');
console.log(testJob.currentRound);

Job.finishRound(testJob)

console.log('');
console.log(testJob);
