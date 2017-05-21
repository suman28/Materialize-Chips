$.ajax({
        dataType: "json",
        url: "../data/data.json"
    })
    .done(function (data) {
        var items = data.records;
        for (var i in items) {
            if (items.hasOwnProperty(i)) {
                items[i].value = i;
            }
        }

        var mydata = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('NAME'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: $.map(items, function (val, key) {
                return {
                    value: val.value,
                    NAME: val.NAME,
                    TBNAME: val.TBNAME
                };
            })
        });
        mydata.initialize();

        var elt = $('input');
        elt.materialtags({
            //itemValue: 'value',
            itemValue: function (item) {
                return item.value;
            },
            itemText: 'NAME',
            tagClass: function (item) {
                if (item.TBNAME === 'systemkeywords') {
                    return 'chip chip_blue';
                } else if (item.TBNAME === 'employee') {
                    return 'chip chip_green';
                } else if (item.TBNAME === 'empdata') {
                    return 'chip chip_maroon';
                } else {
                    return 'chip chip_yellow';
                }
            },
            typeaheadjs: {
                name: 'mydata',
                displayKey: 'NAME',
                source: mydata.ttAdapter()
            }
        });

        $('input').on('beforeItemAdd', function (event) {
            // event.item: contains the item
            // event.cancel: set to true to prevent the item getting added
            if (event.item.TBNAME === 'systemkeywords') {
                console.log(event.item);
                var _chip = document.getElementsByClassName('chip');
            }
        });

        $('input').on('itemAdded', function (event) {
            // event.item: contains the item
            //$('input').materialtags('refresh');
            if (event.item.TBNAME === 'systemkeywords') {
                console.log(event.item);
            }
        });
        $('input').on('beforeItemRemove', function (event) {
            // event.item: contains the item
            // event.cancel: set to true to prevent the item getting removed
             var tag = event.item;
            console.log(event.cancel);
        });
        $('input').on('itemRemoved', function (event) {
            // event.item: contains the item
        });

    });