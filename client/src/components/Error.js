import React from 'react';

const Error = ({ error }) => {
    if(!error) return null

    return (
        <article class="message is-danger">
            <div class="message-body">
                {error}
            </div>
        </article>
    );
};

export default Error;