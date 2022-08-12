module.exports = function check(str, bracketsConfig) {
    const brackets = str.split('');
    const startTokens = bracketsConfig.map(i => i[0]);

    let result = true;
    let same = {};
    const tokens = [];
    for (let token of brackets) {
        if (startTokens.includes(token) && same[token] !== true) {
            tokens.push(token);
            const isSame = bracketsConfig.some(i => i[0] === token && i[1] === token);
            if (isSame) {
                same[token] = true;
            }
        } else {
            const start = tokens.pop();
            const close = token;

            const isExist = bracketsConfig.some(i => i[0] === start && i[1] === close);
            if (!isExist) {
                result = false;
                break;
            }

            if (same[token] === true) {
                delete same[token];
            }
        }
    }

    return result && tokens.length === 0;
}
