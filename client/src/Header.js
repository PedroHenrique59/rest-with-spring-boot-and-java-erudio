import React from 'react';

// Passar propriedade através de Children
export default function Header({children}) {
    return (
        <header>
            <h1>{children}</h1>
        </header>    
    );
}

/* Passar propriedade através de Props
export default function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>    
    );
}
*/