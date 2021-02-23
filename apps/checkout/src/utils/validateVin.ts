export const validateVin = (vin: string): boolean => {
    if (vin == "11111111111111111") { return false; }
    if (!vin.match("^([0-9a-hj-npr-zA-HJ-NPR-Z]{10,17})+$")) { return false;}
    var letters = [{ k: "A", v: 1 }, { k: "B", v: 2 }, { k: "C", v: 3 },
    { k: "D", v: 4 }, { k: "E", v: 5 }, { k: "F", v: 6 }, { k: "G", v: 7 },
    { k: "H", v: 8 }, { k: "J", v: 1 }, { k: "K", v: 2 }, { k: "L", v: 3 },
    { k: "M", v: 4 }, { k: "N", v: 5 }, { k: "P", v: 7 }, { k: "R", v: 9 },
    { k: "S", v: 2 }, { k: "T", v: 3 }, { k: "U", v: 4 }, { k: "V", v: 5 },
    { k: "W", v: 6 }, { k: "X", v: 7 }, { k: "Y", v: 8 }, { k: "Z", v: 9 }];
    var weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    var exclude = ["I", "O", "Q"];
    var val = 0;
    for (var idx = 0; idx < vin.length; idx++) {
        var item = vin.charAt(idx).toUpperCase();
        if (exclude.includes(item)) { return false; }
        var pos = (item.match("^[0-9]+$") != null) ? parseInt(item) : letters.filter((letter) => { return letter.k == item; })[0].v;
        val += (pos * weights[idx]);
    }
    var checksum = (val % 11);
    return (vin.charAt(8) == (checksum < 10 ? checksum.toString() : "X"));
};