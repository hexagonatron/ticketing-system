
const formatTransactions = (transactions) => {
    const transactionsJson = transactions.map(transaction => formatOneTransaction(transaction))

    return transactionsJson;
}

const formatOneTransaction = ({id, description, value, running_total, timestamp, userId}) => {
    const json = {
        id, 
        description, 
        value, 
        running_total, 
        timestamp, 
        userId
    }
    return json
}

module.exports = {
    formatTransactions
}