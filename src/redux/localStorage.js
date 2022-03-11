export const loadJwt = () => {
    try {
        const serializedJwt = localStorage.getItem('jwt');
        if(serializedJwt === null) {
            return undefined;
        }
        return JSON.parse(serializedJwt);
    }catch(err) {
        return undefined;
    }
}

export const saveJwt = (token) => {
    try {
        const serializedJwt = JSON.stringify(token);
        localStorage.setItem('jwt', serializedJwt);
    }catch(err) {
        // 
    }
}