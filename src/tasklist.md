diff message objects to be interpreted by clients
    text
        live chat function
    vote
        push to votepool
        and display to voter (the person who voted)
    change
        push to changepool
        display to all clients
    event
        finish a round
        finish a job
        dnflakjhgrgboaisjrbl
    request
        get chat history

message handler
    validate diff message types
        text: no validation
        vote: digital signature of voter
        change: digital signature of creator
        event: server validation, winning change, and voters