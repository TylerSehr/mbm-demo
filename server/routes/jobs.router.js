const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const Job = require('../classes/Job.class')

let testJob1 = Job.createJob('test-project', 'ed', 'this project is a test', 5, 'starterfile', 'my-username', 50, ['rock', 'not rock']);
let testJob2 = Job.createJob('test-project2', 'ed', 'flib', 5, 'farterstyle', 'my-username', 50, ['rock', 'not not rock']);
let testJob3 = Job.createJob('test-project3', 'ed', 'flob', 5, 'thats a problem for future homer', 'my-username', 50, ['not rock', 'rock not?']);

// even for the demo, should routinely back up these jobs to the db
// should node-cron this so that it backs up every few minutes.
let activeJobs = []

activeJobs.push(testJob1, testJob2, testJob3)



router.get('/get-all', (req, res) => {
    let jobPreviews = []
    activeJobs.forEach(job=> jobPreviews.push(job.PreviewOfJob))
    console.log(jobPreviews);
    
    res.send(jobPreviews)
});

router.post('/new-job', (req, res)=>{
    // take data and create new job and add it to the active jobs array
    res.send(200)
})




router.post('/', (req, res) => {

});

module.exports = router;