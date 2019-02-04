// this will create abridged job objects that will be available immediately on all clients.

// this object will have the title, description, and a short sample of the song to preview.

// this object will also have a list of peers who currently have the Job downloaded.

// once u open up a dedicated page for that song, you will join another peer to peer network specifically for the song.

// this will download the complete Job object automatically

// opening up the dedicated page will also sign your ip to the list of peers on the abridged Job object for your songs

// following the project will permanently sign your ip to the list of peers

class PreviewOfJob {
    constructor(job){ //this is a full job object, here we strip the components we want and make a new object with them.
        this.projectName = job.projectName;
        this.description = job.params.description;
        this.owner = job.owner;
        this.demo = job.state;
        this.peers = []
        this.tags = job.params.tags
    }
}

module.exports = PreviewOfJob;