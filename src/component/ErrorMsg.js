import React from 'react';

function ErrorMsg({ msg }) {
    return (
        <div class="alert alert-danger" role="alert">
            { msg }
        </div>
  );
}

export default ErrorMsg;
