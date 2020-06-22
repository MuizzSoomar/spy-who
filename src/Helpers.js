
export function GenerateCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i <= length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

export function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max))
}
