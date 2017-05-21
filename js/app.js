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
                    NAME: val.NAME,
                    value: val.value
                }
            })
        });
        mydata.initialize();

        var elt = $('input');
        elt.materialtags({
            itemValue: 'value',
            itemText: 'NAME',
            typeaheadjs: {
                name: 'mydata',
                displayKey: 'NAME',
                source: mydata.ttAdapter()
            }
        });
        /* $('input').on('change', function (event) {
             var _chip = document.getElementsByClassName('chip');

             var $element = $(event.target),
                 $container = $element.closest('.example');

             if (!$element.data('materialtags')) {
                 return;
             }

             console.log(_chip);
             if (_chip[0]) {
                 _chip[0].style.background = 'red';
             }

             var val = $element.val();
             if (val === null) {
                 val = "null";
             }
             $('code', $('pre.val', $container)).html(($.isArray(val) ? JSON.stringify(val) : "\"" +
                 val.replace('"', '\\"') + "\""));
             $('code', $('pre.items', $container)).html(JSON.stringify($element.materialtags('items')));

         }).trigger('change');*/
    });