getVowelUnitTermination = function(x) {
    var vowelUnitTermination = 'yuq';
    var infixToAddIfConsonant = 'ni';
    return /[aeiouAEIOU]/.test(x) ? vowelUnitTermination : infixToAddIfConsonant + vowelUnitTermination;
};

var app = new Vue({
    el: '#app',
    data: {
        message: 'Qichwapi yupaykuna!',
        inputNumber: '',

        qichwaNumbers: [
            {
                qichwaName: 'Ecuador Kichwa',
                numberAsText: 'Ingrese un númetro válido',
                numbers: {
                    0: 'nima/illak', 1: 'shuk', 2: 'ishkay', 3: 'kimsa', 4: 'chusku', 5: 'pichka', 6: 'sukta', 7: 'kanchis',
                    8: 'pusak', 9: 'iskun', 10: 'chunka', 100: 'patsak', 1000: 'waranka', 1000000: 'hunu'
                },
                units: { 1: '', 2: 'waranka', 3: 'hunu', 4: 'waranka hunu' },
                getVowelUnitTermination: function(x) { return ''; }
            },
            {
                qichwaName: 'Ankash Kichwa',
                numberAsText: 'Ingrese un númetro válido',
                numbers: {
                    0: 'chusaq', 1: 'huk', 2: 'ishkay', 3: 'kima', 4: 'chusku', 5: 'pitsqa', 6: 'huqta', 7: 'qanchis',
                    8: 'puwaq', 9: 'isqun', 10: 'chunka', 100: 'pachak', 1000: 'waranqa', 1000000: 'hunu'
                },
                units: { 1: '', 2: 'waranqa', 3: 'unu', 4: 'waranqa unu' },
                getVowelUnitTermination: function(x) { return ''; }
            },
            {
                qichwaName: 'Ayakuchu-chanka',
                numberAsText: 'Ingrese un númetro válido',
                numbers: {
                    0: 'chusaq/nima', 1: 'huk', 2: 'iskay', 3: 'kimsa', 4: 'tawa', 5: 'pichqa', 6: 'suqta', 7: 'qanchis',
                    8: 'pusaq', 9: 'isqun', 10: 'chunka', 100: 'pachak', 1000: 'waranqa', 1000000: 'hunu'
                },
                units: { 1: '', 2: 'waranqa', 3: 'hunu', 4: 'waranqa hunu' },
                getVowelUnitTermination: getVowelUnitTermination
            },
            {
                qichwaName: 'Qusqu',
                numberAsText: 'Ingrese un númetro válido',
                numbers: {
                    0: 'ch\'usaq', 1: 'huk', 2: 'iŝkay', 3: 'kimsa', 4: 'tawa', 5: 'pichqa', 6: 'suqta', 7: 'qanchis',
                    8: 'pusaq', 9: 'isqun', 10: 'chunka', 100: 'pachak', 1000: 'waranqa', 1000000: 'hunu'
                },
                units: { 1: '', 2: 'waranqa', 3: 'hunu', 4: 'waranqa hunu' },
                getVowelUnitTermination: getVowelUnitTermination
            },
            {
                qichwaName: 'Wanka',
                numberAsText: 'Ingrese un númetro válido',
                numbers: {
                    0: 'chusaq', 1: 'huk', 2: 'ishkay', 3: 'kimsa', 4: 'tawa', 5: 'pichqa', 6: 'suqta', 7: 'qanćhis',
                    8: 'pusaq', 9: 'isqun', 10: 'ćhunka', 100: 'paćhak', 1000: 'walanqa', 1000000: 'hunu'
                },
                units: { 1: '', 2: 'walanqa', 3: 'hunu', 4: 'walanqa hunu' },
                getVowelUnitTermination: getVowelUnitTermination
            }
        ]
    },
    watch: {
        inputNumber: function (newNumber, oldNumber) {
            var _this = this;
            this.qichwaNumbers.forEach(function (qichwaNumber) {
                if(newNumber.length === 0 || !Number.isInteger(newNumber)){
                    qichwaNumber.numberAsText = 'Ingrese un númetro válido';
                }
                else{
                    var absNumber = Math.abs(newNumber);
                    if(qichwaNumber.numbers[absNumber]){
                        qichwaNumber.numberAsText = qichwaNumber.numbers[absNumber];
                    } else {
                        qichwaNumber.numberAsText = _this.getNumberAsText(absNumber, qichwaNumber);
                    }
                }
            })
        }
    },
    methods: {
        getNumberAsText: function (number, numberData) {
            var _this = this;
            var buildNumbersAsGroups = function (numberStr) {
                var reversedNumber = numberStr.split("").reverse().join("");
                var chunks = [];
                for (var i = 0, charsLength = reversedNumber.length; i < charsLength; i += 3) {
                    chunks.unshift(reversedNumber.substring(i, i + 3).split("").reverse().join(""));
                }
                return chunks;
            };

            var getGroupNumberAsText = function (number, orderUnit) {
                var finalText = '';
                var numberToProcess = number;
                var isSingleDigitNumber = number < 10;

                do{
                    if(numberToProcess === 0) continue;
                    var numberStr = numberToProcess.toString();
                    var numberLength = numberStr.length;
                    var tenPower = Math.pow(10, numberLength - 1);
                    var quotient = Math.floor(numberToProcess / tenPower);
                    var remainder = numberToProcess % tenPower;
                    if(!isSingleDigitNumber){
                        if(quotient !== 1 || tenPower === 1){
                            finalText += (' ' + numberData.numbers[quotient]);
                        }
                        if(remainder === 0 && tenPower === 1){
                            finalText += numberData.getVowelUnitTermination(finalText.charAt(finalText.length -1));
                        }else{
                            finalText += ' ' + numberData.numbers[tenPower];
                        }
                    }else {
                        if(orderUnit === 1){
                            finalText += (' ' + numberData.numbers[quotient]);
                            finalText += numberData.getVowelUnitTermination(finalText.charAt(finalText.length -1));
                        }else{
                            if(numberToProcess !== 1){
                                finalText += (' ' + numberData.numbers[quotient]);
                            }
                        }
                    }
                    numberToProcess = remainder;
                } while(numberToProcess !== 0);
                return finalText + ' ' + numberData.units[orderUnit];
            };
            var numberGroups = buildNumbersAsGroups(number.toString());
            var finalText = '';
            numberGroups.forEach(function (item, i) {
                var number = parseInt(item);
                finalText += number === 0 ? '' : getGroupNumberAsText(parseInt(item), numberGroups.length - i);
            });
            return finalText;
        }
    }
});