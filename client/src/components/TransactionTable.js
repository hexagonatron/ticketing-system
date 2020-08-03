import React, { useState } from 'react';

import moment from 'moment'

const TransactionTable = ({ transactions }) => {

    return (
        <table class="table is-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th><abbr title="Description">Desc</abbr></th>
                    <th>Value</th>
                    <th>Running Total</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{moment(transaction.timestamp).format("D-M-YYYY H:mm")}</td>
                        <td>{transaction.description}</td>
                        <td>{(transaction.value / 100).toFixed(2)}</td>
                        <td>{(transaction.running_total / 100).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default TransactionTable;