module.exports = {
    nickCmdErrorSyntax: "Sintassi comando errata, usare /nick <nuovo nome> per cambiare nickname.\n",
    welcome : (uuid) => { return "Benvenuto in TelnetChat! Il tuo id è " + uuid  + "\nPer impostare un nickname, usa il comando /nick <nome>\n"},
    writeMsg: (from, msg) => { return "(" + from + ") ha scrito: " + msg + "\n"},
    changedNickname: (identifier, nickName) => { return identifier + " è conosciuto adesso come " + nickName   +"\n"},
    joinedRoom: (identifier) => {
        return identifier + " è appena entrato\n";
    },
    abandonedRoom: (identifier) => {
        return identifier + " è appena uscito dalla stanza\n";
    }
}
