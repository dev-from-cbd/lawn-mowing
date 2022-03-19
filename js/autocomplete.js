$( function() {
    var validOptions = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        previousValue = "";

        $('#state').autocomplete({
            autoFocus: true,
            source: validOptions
        }).keyup(function() {
            var isValid = false;
            for (i in validOptions) {
                if (validOptions[i].toLowerCase().match(this.value.toLowerCase())) {
                    isValid = true;
                }
            }
            if (!isValid) {
                this.value = previousValue
            } else {
                previousValue = this.value;
            }
    });
  } );